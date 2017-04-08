"use strict"

class ProcessRegistry {
    constructor() {
        this.localActorRefs = {}
        this.counter = 0
        this.hostResolvers = []
        this.Address = "nonhost"
    }

    Get(pid) {
        if (pid.Address != "nonhost" && pid.Address != this.Address) {
            for(let resolver of this.hostResolvers) {
                let ref = resolver(pid)
                if (ref) {
                    return ref
                }
            }
            throw "Unknown host"
        }
        return this.localActorRefs[pid.getId()] // todo - deadletter
    }

    TryAdd(id, ref, pidCtor) {
        var pid = new pidCtor("nonhost", id, ref)
        this.localActorRefs[pid.getId()] = ref
        return pid
    }

    NextId() {
        return "$" + this.counter++
    }

    Remove(pid) {
        this.localActorRefs[pid.getId()] = undefined
    }

    RegisterHostResolver(resolver) {
        this.hostResolvers.push(resolver)
    }
}

module.exports = new ProcessRegistry()