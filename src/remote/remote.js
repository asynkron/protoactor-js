let grpc = require('grpc')
let pb = require('google-protobuf')
let actorMessages = require('../messages')
let remoteMessages = require('./remote_pb')
let services = require('./remote_grpc_pb')
let ProcessRegistry = require('../processRegistry')
let actor = require('../actor')
let PID = require('../pid')
let Queue = require('../queue')

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
    constructor() {
        this.connections = {}
    }

    Receive(context) {
        let msg = context.Message
        // todo - handle EndpointTerminatedEvent, RemoteTerminate, RemoteWatch, RemoteUnwatch
        if (msg instanceof RemoteDeliver) {
            let ep = this._ensureConnected(msg.Target.Address, context)
            ep.Writer.Tell(msg)
        }
    }

    _ensureConnected(address, context) {
        let ep = this.connections[address]
        if (!ep) {
            let writer = this._spawnWriter(address, context)
            let watcher = this._spawnWatcher(address, context)
            ep = new Endpoint(writer, watcher)
            this.connections[address] = ep
        }
        return ep
    }

    _spawnWriter(address, context) {
        let props = actor.fromProducer(() => new EndpointWriter(address))
            .WithMailbox(() => new EndpointWriterMailbox(1000))
        let writer = actor.spawn(props)
        return writer
    }

    _spawnWatcher(address, context) {
        // todo
        return null
    }
}

class EndpointWriter {
    constructor(address) {
        this.address = address
    }

    async Receive(context) {
        let msg = context.Message
        if (msg === actorMessages.Started) {
            await this._started()
        }
        if (msg instanceof RemoteDeliverArray) {
            let messageBatch = new remoteMessages.MessageBatch()
            let envelopes = []
            let typeNameIds = {}
            let targetIds = {}
            let typeNames = []
            let targetNames = []
            for(rd in msg) {
                let targetName = rd.Target.Id
                if (targetNames.indexOf(targetName) < 0) {
                    targetIds[targetName] = targetNames.length
                    targetNames.push(targetName)
                }
                let targetId = targetIds[targetName]

                //let typeName = get type name from protobuf?
            }
            await this._sendEnvelopes(messageBatch, context)
        }
    }

    async _started() {
        this.client = new services.RemotingClient(this.address, grpc.credentials.createInsecure())
    }

    async _sendEnvelopes(messageBatch, context) {

    }
}

class RemoteDeliverArray extends Array {
}

class EndpointWriterMailbox {
    constructor(batchSize) {
        this.batchSize = batchSize
        this.systemMessageQueue = new Queue()
        this.userMessageQueue = new Queue()
    }

    async PostUserMessage(message) {
        await this.userMessageQueue.enqueue(message)
        this.processMessages()
    }

    async PostSystemMessage(message) {
        await this.systemMessageQueue.enqueue(message)
        this.processMessages()
    }

    RegisterHandlers(invoker, dispatcher) {
        this.invoker = invoker
        this.dispatcher = dispatcher
    }

    Start() {
    }
    
    async processMessages() {
        if (this.running) return

        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule()
        }
    }

    schedule() {
        this.running = true;
        this.dispatcher.Schedule(this.run.bind(this));
    }

    async run() {
        let batch = new RemoteDeliverArray()
        
        let sys = this.systemMessageQueue.dequeue()
        if (sys != undefined) {
            await this.invoker.InvokeSystemMessage(sys)
        }

        while(batch.length<this.batchSize) {
            let msg = this.userMessageQueue.dequeue()
            if (!msg)
                break
            batch.push(msg)
        }
        await this.invoker.InvokeUserMessage(batch)
        
        this.running = false;
        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule();
        }
    }
}

class Endpoint {
    constructor(writer, watcher) {
        this.Writer = writer
        this.Watcher = watcher
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
            remote.EndpointManager.Tell(env)
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