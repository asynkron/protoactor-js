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
    spawn: spawn
}