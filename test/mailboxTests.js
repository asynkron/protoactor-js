// test code below...
var timeAction = require("./timeAction");
var mailbox = require('../src/mailbox')
var assert = require("assert");
class Dispatcher {
    schedule(fn) {
        fn()
    }

    throughput() {
        return 1000
    }
}

class Invoker {
    constructor() {
        this.c = 0
    }

    async invokeSystemMessage(msg) {
        await Promise.resolve()
    }

    async invokeUserMessage(msg) {
        this.increment()
        await Promise.resolve()
    }

    increment() {
        if (this.c == 0) {
            this.hrstart = process.hrtime()
        }
        this.c++
        if (this.c == 1000*1000) {
            var hr = process.hrtime(this.hrstart)
            var s = hr[0] + hr[1]/(1000*1000*1000)
            var t = this.c / s
            console.log('received', t/1000, 'K msg/s')
        }
    }
}

function Sleep(timeout) {
    console.log('sleeping for', timeout)
    return new Promise(function(resolve) {
        setTimeout(resolve, timeout);
    });
}

describe('mailbox', () => {
    var mb = mailbox.Unbounded();
    mb.RegisterHandlers(new Invoker(), new Dispatcher());
    var mbActionTimer = timeAction(mb, 100 * 1000);

    it('should have 200 K msg/s', () => assert(mbActionTimer(mb => mb.PostUserMessage("hello")) > 200))
});