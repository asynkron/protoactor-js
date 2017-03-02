"use strict"

class Started {}

class MessageSender{
    constructor(message, sender) {
        this.Message = message
        this.Sender = sender
    }
}

module.exports = {
    Started: new Started(),
    MessageSender: MessageSender
}