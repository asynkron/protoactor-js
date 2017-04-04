"use strict"

var Props = require('./props')
var ProcessRegistry = require('./processRegistry')

function fromFunc(fn) {
    return fromProducer(() => new EmptyActor(fn))
}

function fromProducer(fn) {
    return new Props().WithProducer(fn)
}

function spawn(props) {
    var name = ProcessRegistry.NextId()
    return spawnNamed(props, name)
}

function spawnPrefix(props, prefix) {
    var name = prefix + ProcessRegistry.NextId()
    return spawnNamed(props, name)
}

function spawnNamed(props, name) {
    return props.Spawn(name, null)
}

class EmptyActor {
    constructor(fn) {
        this.fn = fn;
    }

    Receive(context) {
        this.fn(context)
    }
}

module.exports = {
    fromFunc: fromFunc,
    fromProducer: fromProducer,
    spawn: spawn,
    spawnPrefix: spawnPrefix,
    spawnNamed: spawnNamed,
    done: Promise.resolve()
}