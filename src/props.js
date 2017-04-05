"use strict"

var mailbox = require('./mailbox')
var messages = require('./messages')
var dispatcher = require('./dispatcher')
var supervision = require('./supervision')
var ProcessRegistry = require('./processRegistry')
var LocalContext = require('./localContext')
var LocalProcess = require('./localProcess')
var PID = require('./pid')

class Props {
    constructor() {
        this.mailboxProducer = () => mailbox.Unbounded()
        this.dispatcher = new dispatcher.DefaultDispatcher()
        this.supervisorStrategy = supervision.DefaultStrategy
        this.spawner = Props.DefaultSpawner
    }

    WithProducer(producer) {
        this.producer = producer
        return this
    }

    WithDispatcher(dispatcher) {
        this.dispatcher = dispatcher
        return this
    }

    WithSupervisor(supervisor) {
        this.supervisorStrategy = supervisor
        return this
    }

    WithSpawner(spawner) {
        this.spawner = spawner
        return this
    }

    Spawn(name, parent) {
        return this.spawner(this, name, parent)
    }

    static DefaultSpawner(props, name, parent) {
        var context = new LocalContext(props.producer, props.supervisorStrategy, parent)
        var mailbox = props.mailboxProducer()
        var dispatcher = props.dispatcher
        var ref = new LocalProcess(mailbox)
        var pid = ProcessRegistry.TryAdd(name, ref, PID.New)
        context.Self = pid
        mailbox.RegisterHandlers(context, dispatcher)
        mailbox.PostSystemMessage(messages.Started)
        mailbox.Start()
        return pid
    }
}

module.exports = Props