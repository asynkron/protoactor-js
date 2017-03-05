"use strict"

var Queue = require("./queue")
var Queue2 = require("./queue2")

class Mailbox {

    constructor(systemMessageQueue, userMessageQueue, mailboxStatistics) {
        this.systemMessageQueue = systemMessageQueue
        this.userMessageQueue = userMessageQueue
        this.mailboxStatistics = mailboxStatistics
        this.running = false
    }

    PostUserMessage(message) {
        for(var i=0; i<this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].UserMessagePosted(message)
        }
        this.userMessageQueue.enqueue(message)
        this.processMessages()
    }

    PostSystemMessage(message) {
        for(var i=0; i<this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].SystemMessagePosted(message)
        }
        this.systemMessageQueue.enqueue(message)
        this.processMessages()
    }

    RegisterHandlers(invoker, dispatcher) {
        this.invoker = invoker
        this.dispatcher = dispatcher
    }

    Start() {
    }

    processMessages() {
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
        for (var i = 0; i < this.dispatcher.GetThroughput(); i++) {
            var msg
            msg = this.systemMessageQueue.dequeue()
            if (msg != undefined) {
                await this.invoker.InvokeSystemMessage(msg)
                continue
            }
            msg = this.userMessageQueue.dequeue()
            if (msg != undefined) {
                await this.invoker.InvokeUserMessage(msg)
            } else {
                break
            }
        }
        this.running = false;
        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule();
        } else {
            for(var i=0; i<this.mailboxStatistics.length; i++) {
                this.mailboxStatistics[i].MailboxEmpty()
            }
        }
    }
}

module.exports = {
    Unbounded: () => new Mailbox(new Queue(), new Queue())
}