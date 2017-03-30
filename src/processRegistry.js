"use strict"

class ProcessRegistry {
    constructor() {
        this.localActorRefs = {}
        this.counter = 0
    }

    Get(pid) {
        return this.localActorRefs[pid.Id]
    }

    TryAdd(id, ref, pidCtor) {
        var pid = new pidCtor("local", id, ref)
        this.localActorRefs[pid.Id] = ref
        return pid
    }

    NextId() {
        return "$" + this.counter++
    }

    Remove(pid) {
        this.localActorRefs[pid.ID] = undefined
    }
}

module.exports = new ProcessRegistry()