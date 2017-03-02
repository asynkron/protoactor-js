"use strict"

var PID = require('./pid')

class ProcessRegistry {
    constructor() {
        this.localActorRefs = {}
        this.counter = 0
    }

    Get(pid) {
        return this.localActorRefs[pid.ID]
    }

    TryAdd(id, ref) {
        var pid = new PID("local", id, ref)
        this.localActorRefs[pid.Id] = ref
        return pid
    }

    NextId() {
        return "$" + this.counter++
    }
}

module.exports = new ProcessRegistry()