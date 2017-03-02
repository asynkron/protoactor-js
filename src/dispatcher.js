"use strict"

class Dispatcher {
    constructor() {
        this.throughput = 10
    }

    Schedule(fn) {
        setTimeout(fn, 1)
    }

    GetThroughput() {
        return this.throughput
    }

    SetThroughput(t) {
        this.throughput = t
    }
}

module.exports = {
    DefaultDispatcher: Dispatcher
}