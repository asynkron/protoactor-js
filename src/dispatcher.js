"use strict"

class Dispatcher {
    constructor() {
        this.throughput = 10
    }

    Schedule(fn) {
        fn()
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