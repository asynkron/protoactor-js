"use strict"

var Queue = require("./queue")
var Queue2 = require("./queue2")

class Mailbox {

    constructor(systemMessageQueue, userMessageQueue) {
        this.systemMessageQueue = systemMessageQueue
        this.userMessageQueue = userMessageQueue
        this.running = false
    }

    postUserMessage(message) {
        //console.log('user message posted', message)
        this.userMessageQueue.enqueue(message)
        this.processMessages()
    }

    postSystemMessage(message) {
        //console.log('system message posted', message)
        this.systemMessageQueue.enqueue(message)
        this.processMessages()
    }

    registerHandlers(invoker, dispatcher) {
        this.invoker = invoker
        this.dispatcher = dispatcher
    }

    async processMessages() {
        if (this.running) return

        if (!this.userMessageQueue.isEmpty()) {
            this.schedule()
        }
    }

    schedule() {
        //console.log('mailbox scheduled')
        this.running = true;
        this.dispatcher.schedule(this.run.bind(this));
    }

    async run() {
        for (var i = 0; i < this.dispatcher.throughput(); i++) {
            var msg
            msg = this.systemMessageQueue.dequeue()
            if (msg) {
                await this.invoker.invokeSystemMessage(msg)
                continue
            }
            msg = this.userMessageQueue.dequeue()
            if (msg) {
                await this.invoker.invokeUserMessage(msg)
            }
        }
        this.running = false;
        if (!this.userMessageQueue.isEmpty()) {
            this.schedule();
        }
    }
}

module.exports = {
    Unbounded: () => new Mailbox(new Queue(), new Queue())
}