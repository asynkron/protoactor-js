"use strict"

var mailbox = require('./mailbox')
var messages = require('./messages')
var dispatcher = require('./dispatcher')
var ProcessRegistry = require('./processRegistry')
var LocalContext = require('./localContext')
var LocalProcess = require('./localProcess')
var PID = require('./pid')

class Props {
    constructor() {
        this.mailboxProducer = () => mailbox.Unbounded()
        this.dispatcher = new dispatcher.DefaultDispatcher()
    }

    WithProducer(producer) {
        this.producer = producer
        return this
    }

    WithDispatcher(dispatcher) {
        this.dispatcher = dispatcher
    }

    Spawn(name, parent) {
        var context = new LocalContext(this.producer, parent)
        var mailbox = this.mailboxProducer()
        var dispatcher = this.dispatcher
        var ref = new LocalProcess(mailbox)
        var pid = ProcessRegistry.TryAdd(name, ref, PID)
        context.Self = pid
        mailbox.RegisterHandlers(context, dispatcher)
        mailbox.PostSystemMessage(messages.Started)
        mailbox.Start()
        return pid
    }
}


module.exports = Props