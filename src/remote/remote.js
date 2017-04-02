var grpc = require('grpc')
var messages = require('./remote_pb')
var services = require('./remote_grpc_pb')
var ProcessRegistry = require('../processRegistry')

class Remote {
    Start(host, port) {
        ProcessRegistry.RegisterHostResolver(pid => new RemoteProcess(pid))
        var server = new grpc.Server()
        server.addService(services.RemotingService, {
            receive: this._receive
        })
        server.bind(host+':'+port, grpc.ServerCredentials.createInsecure())
        server.start()
    }

    _receive(stream) {

    }
}

new Remote().Start("localhost", "9001")