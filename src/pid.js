"use strict"

var PromiseProcess = require('./promises')
var ProcessRegistry = require('./processRegistry')

class PID {
    constructor(address, id, ref) {
        this.Address = address
        this.Id = id
        this.Ref = ref
    }

    Tell(message) {
        this.Ref.SendUserMessage(this, message, null)
    }

    SendSystemMessage(message) {
        this.Ref.SendSystemMessage(this, message, null)
    }

    RequestPromise(message) {
        var p = new PromiseProcess()
        var name  = ProcessRegistry.NextId()
        this.PID = ProcessRegistry.TryAdd(name, p, PID)
        p.PID = this.PID
        this.Request(message, p.PID)
        return p.Promise
    }

    Request(message, sender) {
        this.Ref.SendUserMessage(this, message, sender)
    }

    Stop() {
        this.Ref.Stop()
        ProcessRegistry.Remove(this)
    }

    ToShortString() {
        return this.Address+'/'+this.Id
    }
}

module.exports = PID