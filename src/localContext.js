"use strict"

var messages = require('./messages')

class LocalContext {
    constructor(producer, parent) {
        this.producer = producer
        this.parent = parent
        this._incarnateActor()
    }

    InvokeSystemMessage(message) {
        if (message === messages.Started) {
            this.InvokeUserMessage(message)
            return
        }
    }

    InvokeUserMessage(message) {
        this._processMessage(message)
    }

    _incarnateActor() {
        this._actor = this.producer()
    }

    _processMessage(message) {
        this.Message = message
        this._actor.Receive(this)
    }
}

module.exports = LocalContext