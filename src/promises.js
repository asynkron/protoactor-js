"use strict"

var ProcessRegistry = require('./processRegistry')

class PromiseProcess {
    constructor() {
        this.Promise = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }

    SendUserMessage(pid, message, sender) {
        this.resolve(message)
        //this.PID.Stop()
    }

    SendSystemMessage(pid, message) {
    }
}

module.exports = PromiseProcess