import * as mailbox from "../src/mailbox"
import * as messages from "../src/messages"
import {Dispatcher} from "../src/dispatcher"
import {IMessageInvoker} from "../src/invoker"
import {PID} from "../src/pid"

import {assert, expect, use as chaiUse} from "chai"
import * as chaiAsPromised from "chai-as-promised"
import {Awaiter} from "./util/awaiter"

class Failure {
    constructor(public error: any, public child?: PID) { }
}
class MessageWithAwaiter {
    constructor(public awaiter: Awaiter) { }
}
class MessageWithError {
    constructor(public error: ErrorWithAwaiter) { }
}
class ErrorWithAwaiter {
    constructor(public awaiter: Awaiter) { }    
}
class StubInvoker implements IMessageInvoker {
    systemMessages: any[] = []
    userMessages: any[] = []
    allMessages: any[] = []
    failures: Failure[] = []
    InvokeSystemMessage(message: any): Promise<void> {
        this.systemMessages.push(message)
        this.allMessages.push(message)
        if (message instanceof MessageWithAwaiter) {
            message.awaiter.resolve()
        }
        if (message instanceof MessageWithError) {
            throw message.error
        }
        return Promise.resolve()
    }
    InvokeUserMessage(message: any): Promise<void> {
        this.userMessages.push(message)
        this.allMessages.push(message)
        if (message instanceof MessageWithAwaiter) {
            message.awaiter.resolve()
        }
        if (message instanceof MessageWithError) {
            throw message.error
        }
        return Promise.resolve()
    }
    EscalateFailure(error: any, child?: PID): void {
        this.failures.push(new Failure(error, child))
        if (error instanceof ErrorWithAwaiter) {
            error.awaiter.resolve()
        }
    }
}

describe('mailbox processing', () => {

    it('should invoke system message', async () => {
        let mb = mailbox.Unbounded()
        let invoker = new StubInvoker()
        let dispatcher = new Dispatcher()
        mb.RegisterHandlers(invoker, dispatcher)
        let aw = new Awaiter()
        let msg = new MessageWithAwaiter(aw)

        mb.PostSystemMessage(msg)

        await aw.promise

        assert.strictEqual(invoker.systemMessages[0], msg)
    })

    it('should invoke user message', async () => {
        let mb = mailbox.Unbounded()
        let invoker = new StubInvoker()
        let dispatcher = new Dispatcher()
        mb.RegisterHandlers(invoker, dispatcher)
        let aw = new Awaiter()
        let msg = new MessageWithAwaiter(aw)

        mb.PostUserMessage(msg)

        await aw.promise

        assert.strictEqual(invoker.userMessages[0], msg)
    })

    it('should invoke system messages before user messages', async () => {
        let mb = mailbox.Unbounded()
        let invoker = new StubInvoker()
        let dispatcher = new Dispatcher()
        mb.RegisterHandlers(invoker, dispatcher)
        let aw = new Awaiter()
        let sysMsg1 = {}
        let usrMsg1 = {}
        let sysMsg2 = {}
        let usrMsg2 = new MessageWithAwaiter(aw)

        mb.PostSystemMessage(sysMsg1)
        mb.PostUserMessage(usrMsg1)
        mb.PostUserMessage(usrMsg2)
        mb.PostSystemMessage(sysMsg2)

        await aw.promise

        assert.strictEqual(invoker.allMessages[0], sysMsg1, 'Expected message 1 to be system message 1')
        assert.strictEqual(invoker.allMessages[1], sysMsg2, 'Expected message 2 to be system message 2')
        assert.strictEqual(invoker.allMessages[2], usrMsg1, 'Expected message 3 to be user message 1')
        assert.strictEqual(invoker.allMessages[3], usrMsg2, 'Expected message 4 to be user message 2')
    })

    it('should not process user messages after suspended', async () => {
        let mb = mailbox.Unbounded()
        let invoker = new StubInvoker()
        let dispatcher = new Dispatcher()
        mb.RegisterHandlers(invoker, dispatcher)
        let aw = new Awaiter()
        let msg = new MessageWithAwaiter(aw)

        mb.PostSystemMessage(messages.SuspendMailbox.Instance)
        mb.PostUserMessage(msg)

        let isResolved = await aw.isResolvedWithin(10)
        assert.isFalse(isResolved)
    })

    it('should process user messages after resumed', async () => {
        let mb = mailbox.Unbounded()
        let invoker = new StubInvoker()
        let dispatcher = new Dispatcher()
        mb.RegisterHandlers(invoker, dispatcher)
        let aw = new Awaiter()
        let msg = new MessageWithAwaiter(aw)

        mb.PostSystemMessage(messages.SuspendMailbox.Instance)
        mb.PostUserMessage(msg)
        mb.PostSystemMessage(messages.ResumeMailbox.Instance)

        let isResolved = await aw.isResolvedWithin(10)
        assert.isTrue(isResolved)
    })

    it('should escalate failure on failing system message', async () => {
        let mb = mailbox.Unbounded()
        let invoker = new StubInvoker()
        let dispatcher = new Dispatcher()
        mb.RegisterHandlers(invoker, dispatcher)
        let aw = new Awaiter()
        let err = new ErrorWithAwaiter(aw)
        let msg = new MessageWithError(err)

        mb.PostSystemMessage(msg)

        let isResolved = await aw.isResolvedWithin(10)
        assert.isTrue(isResolved)
        
        assert.equal(invoker.failures[0].error, err)
    })
})