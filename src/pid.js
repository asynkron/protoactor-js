"use strict"

var PromiseProcess = require('./promises')
var ProcessRegistry = require('./processRegistry')
var messages = require('./actor_pb')

messages.PID.New = function(address, id) {
    var pid = new messages.PID()
    pid.Address = address
    pid.Id = id
    return pid
}

Object.defineProperty(messages.PID.prototype, 'Id', {
    get: function() {
        return this.getId()
    },
    set: function(value) {
        this.setId(value)
    }
})

Object.defineProperty(messages.PID.prototype, 'Address', {
    get: function() {
        return this.getAddress()
    },
    set: function(value) {
        this.setAddress(value)
    }
})

Object.defineProperty(messages.PID.prototype, 'Ref', {
    get: function() {
        return ProcessRegistry.Get(this)
    }
})

messages.PID.prototype.Tell = function(message) {
    return this.Ref.SendUserMessage(this, message, null)
}

messages.PID.prototype.SendSystemMessage = function(message) {
    return this.Ref.SendSystemMessage(this, message, null)
}

messages.PID.prototype.RequestPromise = function(message) {
    var p = new PromiseProcess()
    var name  = ProcessRegistry.NextId()
    this.PID = ProcessRegistry.TryAdd(name, p, messages.PID.New)
    p.PID = this.PID
    this.Request(message, p.PID)
    return p.Promise
}

messages.PID.prototype.Request = function(message, sender) {
    this.Ref.SendUserMessage(this, message, sender)
}

messages.PID.prototype.Stop = function() {
    this.Ref.Stop()
    ProcessRegistry.Remove(this)
}

messages.PID.prototype.ToShortString = function() {
    return this.Address+'/'+this.Id
}

module.exports = messages.PID