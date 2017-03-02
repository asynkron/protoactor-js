"use strict"

class LocalProcess {
    constructor(mailbox) {
        this.Mailbox = mailbox
    }

    SendUserMessage(pid, message, sender) {
        if (sender) {
            this.Mailbox.PostUserMessage(new MessageSender(message, sender))
            return
        }
        this.Mailbox.PostUserMessage(message)
    }

    SendSystemMessage(pid, message) {
        this.Mailbox.PostSystemMessage(message)
    }
}

module.exports = LocalProcess