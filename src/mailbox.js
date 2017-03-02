"use strict"

var Queue = require("./queue")
var Queue2 = require("./queue2")

class Mailbox {

    constructor(systemMessageQueue, userMessageQueue) {
        this.systemMessageQueue = systemMessageQueue
        this.userMessageQueue = userMessageQueue
        this.running = false
    }

    PostUserMessage(message) {
        //console.log('user message posted', message)
        this.userMessageQueue.enqueue(message)
        this.processMessages()
    }

    PostSystemMessage(message) {
        //console.log('system message posted', message)
        this.systemMessageQueue.enqueue(message)
        this.processMessages()
    }

    RegisterHandlers(invoker, dispatcher) {
        this.invoker = invoker
        this.dispatcher = dispatcher
    }

    Start() {
    }

    async processMessages() {
        if (this.running) return

        if (!this.userMessageQueue.isEmpty()) {
            await this.schedule()
        }
    }

    async schedule() {
        //console.log('mailbox scheduled')
        this.running = true;
        await this.dispatcher.Schedule(this.run.bind(this));
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
        if (!this.userMessageQueue.isEmpty()) {
            await this.schedule();
        }
    }
}

module.exports = {
    Unbounded: () => new Mailbox(new Queue(), new Queue())
}