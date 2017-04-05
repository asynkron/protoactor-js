let grpc = require('grpc')
let pb = require('google-protobuf')
let actorMessages = require('../actor_pb.js')
let remoteMessages = require('./remote_pb')
let services = require('./remote_grpc_pb')
let ProcessRegistry = require('../processRegistry')
let actor = require('../actor')
let PID = require('../pid')

class EndpointReader {
    Receive(call) {
        let self = this
        call.on('data', messageBatch => {
            self._processMessageBatch(messageBatch)
        })
    }

    _processMessageBatch(messageBatch) {
        let targetNames = messageBatch.getTargetNamesList()
        let typeNames = messageBatch.getTypeNamesList()
        let envelopes = messageBatch.getEnvelopesList()
        for (let i = 0; i<envelopes.length; i++) {
            let envelope = envelopes[i]
            let targetName = targetNames[envelope.getTarget()]
            let target = PID.New(ProcessRegistry.Address, targetName)
            let sender = envelope.getSender()
            let typeName = typeNames[envelope.getTypeId()]
            let message = remote.Serialization.Deserialize(typeName, envelope.getMessageData())
            // todo - handle Terminated and SystemMessages
            target.Request(message, sender)
        }
    }
}

class EndpointManager {
    Receive(context) {
        // todo next
    }
}

class Activator {
    Receive(context) {
        let msg = context.Message
        if (msg instanceof remoteMessages.ActorPidRequest) {
            let props = remote.GetKnownKind(msg.getKind())
            let name = msg.getName()
            if (!name) {
                name = ProcessRegistry.NextId()
            }
            let pid = actor.spawnNamed(props, name)
            let response = new remoteMessages.ActorPidResponse()
            response.setPid(pid)
            context.Respond(response)
        }
    }
}

class RemoteProcess {
    constructor(pid) {
        this.pid = pid
    }

    SendUserMessage(pid, message, sender) {
        this._send(pid, message, sender)
    }

    SendSystemMessage(pid, message) {
        this._send(pid, message, null)        
    }

    _send(pid, message, sender) {
        // todo - handle watch/unwatch
        
        if (message instanceof pb.Message) {
            let env = new RemoteDeliver(pid, message, sender)
            remote.EndpointManager.Tell(message)
        } else {
            throw 'Message is not a protobuf message'
        }
    }
}

class RemoteDeliver {
    constructor(target, message, sender) {
        this.Message = message
        this.Target = target
        this.Sender = sender
    }
}

class Remote {
    constructor() {
        this.kinds = {}
        this.Serialization = new Serialization()
    }

    Start(host, port) {
        let addr = host + ':' + port
        ProcessRegistry.RegisterHostResolver(pid => new RemoteProcess(pid))
        
        let server = new grpc.Server()
        let endpointReader = new EndpointReader()
        server.addService(services.RemotingService, {
            receive: endpointReader.Receive.bind(endpointReader)
        })
        server.bind(addr, grpc.ServerCredentials.createInsecure())
        server.start()

        ProcessRegistry.Address = addr

        this.EndpointManager = actor.spawn(actor.fromProducer(() => new EndpointManager()))
        this.Activator = actor.spawnNamed(actor.fromProducer(() => new Activator()), "activator")
    }

    GetKnownKind(kind) {
        return this.kinds[kind]
    }

    RegisterKnownKind(kind, props) {
        this.kinds[kind] = props
    }
}

class Serialization {
    constructor() {
        this.typeLookup = {}
    }
    
    RegisterTypes(packageName, types) {
        let keys = Object.keys(types)
        for(let i=0; i<keys.length; i++) {
            let key = keys[i]
            let typeName = packageName + '.' + key
            let type = types[key]
            this.typeLookup[typeName] = type
        }
    }

    Deserialize(typeName, bytes) {
        let parser = this.typeLookup[typeName]
        let o = parser.deserializeBinary(bytes)
        return o
    }
}

let remote = new Remote()
remote.Serialization.RegisterTypes('remote', remoteMessages)
module.exports = remote

// test
//remote.Start('localhost', 12000)