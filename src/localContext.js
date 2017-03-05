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
            return this.InvokeUserMessage(message)
        }
        return Promise.resolve()
    }

    InvokeUserMessage(message) {
        return this._processMessage(message)
    }

    Respond(message) {
        this.Sender.Tell(message)
    }

    EscalateFailure(exception, message) {
        console.log(exception)
    }

    _incarnateActor() {
        this._actor = this.producer()
    }

    async _processMessage(message) {
        if (message instanceof messages.MessageSender) {
            this.Message = message.Message
            this.Sender = message.Sender
        } else {
            this.Message = message
        }
        await this._actor.Receive(this)
    }
}

module.exports = LocalContext