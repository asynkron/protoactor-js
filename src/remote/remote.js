let grpc = require('grpc')
let messages = require('./remote_pb')
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
            let message = Serialization.Deserialize(typeName, envelope.getMessageData())
            console.log(message)
        }
    }
}

class EndpointManager {
    Receive(context) {

    }
}

class Activator {
    Receive(context) {

    }
}

class Remote {
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
}

Serialization  = {
    typeLookup: {},
    
    RegisterTypes: function(packageName, types) {
        let keys = Object.keys(types)
        for(let i=0; i<keys.length; i++) {
            let key = keys[i]
            let typeName = packageName + '.' + key
            let type = types[key]
            this.typeLookup[typeName] = type
        }
    },

    Deserialize: function(typeName, bytes) {
        let parser = this.typeLookup[typeName]
        let o = parser.deserializeBinary(bytes)
        return o
    }
}
Serialization.RegisterTypes('remote', messages)

let remote = new Remote()
module.exports = remote

// test
remote.Start('localhost', 12000)