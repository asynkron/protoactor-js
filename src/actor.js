"use strict"

var Props = require('./props')
var ProcessRegistry = require('./processRegistry')

function fromFunc(fn) {
    return new Props().WithProducer(() => new EmptyActor(fn))
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
    spawn: spawn
}