import { timeAction } from "./util/timeAction";
import { Message } from "../src/messages";
import * as mailbox from "../src/mailbox";
import { IMessageInvoker } from "../src/invoker";
import { Dispatcher } from "../src/dispatcher";
import * as assert from "assert";
import "mocha";

class Invoker implements IMessageInvoker {
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
        if (this.c == 1000 * 1000) {
            var hr = process.hrtime(this.hrstart)
            var s = hr[0] + hr[1] / (1000 * 1000 * 1000)
            var t = this.c / s
            console.log('received', t / 1000, 'K msg/s')
        }
    }
}



describe('mailbox', () => {

    it('should have >100 K msg/s', () => {
        var mb = mailbox.Unbounded();
        mb.RegisterHandlers(new Invoker(), new Dispatcher());
        var mbActionTimer = timeAction(mb, 100 * 1000);
        assert(mbActionTimer(mb => mb.PostUserMessage("hello")) > 100)
    })

});