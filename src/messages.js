"use strict"

class Started {}
class Stop {}

class MessageSender{
    constructor(message, sender) {
        this.Message = message
        this.Sender = sender
    }
}

module.exports = {
    Started: new Started(),
    Stop: new Stop(),
    MessageSender: MessageSender
}