"use strict"

class PID {
    constructor(address, id, ref) {
        this.Address = address
        this.Id = id
        this.Ref = ref
    }

    Tell(message) {
        this.Ref.SendUserMessage(this, message, null)
    }
}

module.exports = PID