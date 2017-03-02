"use strict"

var mailbox = require('./mailbox')
var messages = require('./messages')
var ProcessRegistry = require('./processRegistry')
var LocalContext = require('./localContext')
var LocalProcess = require('./localProcess')

class Props {
    constructor() {
        this.mailboxProducer = () => mailbox.Unbounded()
    }

    WithProducer(producer) {
        this.producer = producer
        return this
    }

    Spawn(name, parent) {
        var context = new LocalContext(this.producer, parent)
        var mailbox = this.mailboxProducer()
        var dispatcher = new Dispatcher()
        var ref = new LocalProcess(mailbox)
        var pid = ProcessRegistry.TryAdd(name, ref)
        context.Self = pid
        mailbox.RegisterHandlers(context, dispatcher)
        mailbox.PostSystemMessage(messages.Started)
        mailbox.Start()
        return pid
    }
}

class Dispatcher {
    schedule(fn) {
        fn()
    }

    throughput() {
        return 1000
    }
}

module.exports = Props