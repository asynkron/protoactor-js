class Queue2 {
    constructor() {
        this.buffer = new Array(1000)
        this.head = 0
        this.tail = 0
    }

    enqueue(o) {
        this.buffer[this.head++] = o
        if (this.head == this.buffer.length) {
            this._reconstruct()
        }
    }

    dequeue(o) {
        if (this.tail == this.head) return undefined
        var item = this.buffer[this.tail++]
        if (this.tail * 2 >= this.getLength()) {
            this._reconstruct()
        }
        return item
    }

    getLength() {
        return this.head - this.tail
    }

    isEmpty() {
        return this.getLength() == 0
    }

    _reconstruct() {
        this.buffer = this.buffer.slice(this.tail).concat(new Array(this.getLength()*2))
        this.head -= this.tail
        this.tail = 0
    }
}

module.exports = Queue2