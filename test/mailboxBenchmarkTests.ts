import { createActionTimer } from "./util/timeAction";
import { Message } from "../src/messages";
import * as mailbox from "../src/mailbox";
import { IMessageInvoker } from "../src/invoker";
import { Dispatcher } from "../src/dispatcher";
import { Queue } from "../src/queue"
import { Queue2 } from "../src/queue2"

import * as assert from "assert";
import "mocha";

import { Awaiter } from "./util/awaiter"

class Invoker implements IMessageInvoker {

    constructor(public awaiter: Awaiter<number>) { }

    EscalateFailure(error: any): void {
        console.warn("Method not implemented." + error);
    }
    c = 0;
    hrstart: [number, number]

    async InvokeSystemMessage(msg: Message) {
        await Promise.resolve(msg)
    }

    async InvokeUserMessage(msg: Message) {
        this.increment()
        await Promise.resolve(msg)
    }
    increment() {
        if (this.c == 0) {
            this.hrstart = process.hrtime()
        }
        this.c++
        if (this.c == 100 * 1000) {
            var hr = process.hrtime(this.hrstart)
            var s = hr[0] + hr[1] / (1000 * 1000 * 1000)
            var t = this.c / s
            this.awaiter.resolve(t)
            console.log('received', t / 1000, 'K msg/s')
        }
    }
}



describe('mailbox with Queue', () => {

    it('should post at least 100,000 messages/s', async () => {
        let mb = new mailbox.Mailbox(new Queue(), new Queue())
        let aw = new Awaiter<number>()
        mb.RegisterHandlers(new Invoker(aw), new Dispatcher());
        var mbActionTimer = createActionTimer(mb, 500 * 1000);
        assert(mbActionTimer(mb => mb.PostUserMessage("hello")) > 100)
        await aw.promise
    }).timeout(5000)

});

describe('mailbox with Queue2', () => {

    it('should post at least 100,000 messages/s', async () => {
        let mb = new mailbox.Mailbox(new Queue2(), new Queue2())
        let aw = new Awaiter<number>()
        mb.RegisterHandlers(new Invoker(aw), new Dispatcher());
        var mbActionTimer = createActionTimer(mb, 500 * 1000);
        assert(mbActionTimer(mb => mb.PostUserMessage("hello")) > 100)
        await aw.promise
    }).timeout(5000)

});