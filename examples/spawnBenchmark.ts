import * as actor from "../src/actor";
import { LocalContext } from "../src/localContext";
import { Message } from "../src/messages";
import { PID } from "../src/pid";

class Request {
    constructor(public Div: number, public Num: number, public Size: number) {
    }
}

var myProps = actor.fromProducer(() => new MyActor())

class MyActor implements actor.IActor {
    Replies = 0;
    ReplyTo: PID | null = null;
    Sum = 0;

    async Receive(context: LocalContext) {
        var message = context.Message
        if (message instanceof Request) {
            if (message.Size == 1) {
                context.Respond(message.Num)
                context.Self.Stop()
                return
            }
            this.Replies = message.Div
            this.ReplyTo = context.Sender
            for (var i = 0; i < message.Div; i++) {
                var child = actor.spawn(myProps)
                var num = message.Num + i * (message.Size / message.Div)
                var size = message.Size / message.Div
                var div = message.Div
                child.Request(new Request(div, num, size), context.Self)
            }
            return
        }
        if (typeof(message) === 'number') {
            this.Sum += Number(message)
            this.Replies--
            if (this.Replies == 0 && this.ReplyTo) {
                this.ReplyTo.Tell(this.Sum)
            }
            return
        }
    }
}

async function run() {
    var pid = actor.spawn(myProps)
    global.console.log('starting')
    var hrstart = process.hrtime();
    var response = await pid.RequestPromise(new Request(10, 0, 100 * 1000)) // should be 1M but node can't handle it - runs out of memory
    global.console.log(response)
    var hr = process.hrtime(hrstart)
    var s = hr[0] + hr[1] / (1000 * 1000 * 1000)
    global.console.log(s + ' seconds')
}

run()