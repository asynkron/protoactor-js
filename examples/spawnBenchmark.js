"use strict"

var actor = require("../src/actor")

class Request {
    constructor(div, num, size) {
        this.Div = div
        this.Num = num
        this.Size = size
    }
}

var myProps = actor.fromProducer(() => new MyActor())

class MyActor {
    constructor() {
        this.Replies = 0
        this.ReplyTo = null
        this.Sum = 0
    }

    async Receive(context) {
        var msg = context.Message
        //console.log(msg)
        if (msg instanceof Request) {
            if (msg.Size == 1) {
                context.Respond(msg.Num)
                context.Self.Stop()
                return
            }
            this.Replies = msg.Div
            this.ReplyTo = context.Sender
            for (var i=0; i<msg.Div; i++) {
                var child = actor.spawn(myProps)
                var num = msg.Num + i*(msg.Size/msg.Div)
                var size = msg.Size/msg.Div
                var div = msg.Div
                child.Request(new Request(div, num, size), context.Self)
            }
            // if (msg.Num / msg.Size % 100 == 0)
            //     console.log(msg)
            return
        }
        if (msg == Number(msg)) {
            this.Sum += msg
            this.Replies--
            if (this.Replies == 0) {
                this.ReplyTo.Tell(this.Sum)
            }
            return
        }
    }
}

async function run() {
    var pid = actor.spawn(myProps)
    console.log('starting')
    var hrstart = process.hrtime();
    var response = await pid.RequestPromise(new Request(10, 0, 100*1000)) // should be 1M but node can't handle it - runs out of memory
    console.log(response)
    var hr = process.hrtime(hrstart)
    var s = hr[0] + hr[1]/(1000*1000*1000)
    console.log(s + ' seconds')
}

run()