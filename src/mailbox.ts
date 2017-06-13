import { IQueue, Queue } from "./queue";
import { Dispatcher } from "./dispatcher";
import { IMessageInvoker } from "./invoker";
import * as messages from "./messages"
// import {Queue2} from "./queue2";
export interface IStatistics {
    UserMessagePosted(message: messages.Message): void;
    SystemMessagePosted(message: messages.Message): void;
    MailboxStarted(): void;
    MailboxEmpty(): void;
}
export interface IMailbox {
    PostUserMessage(message: messages.Message): Promise<void>
    PostSystemMessage(message: messages.Message): Promise<void>
    RegisterHandlers(invoker: IMessageInvoker, dispatcher: Dispatcher): void;
    Start(): void;
}
export class Mailbox implements IMailbox {
    private running = false;
    private dispatcher: Dispatcher;
    private invoker: IMessageInvoker;
    constructor(private systemMessageQueue: IQueue,
        private userMessageQueue: IQueue,
        private mailboxStatistics: IStatistics[] = []) {

    }

    async PostUserMessage(message: messages.Message) {
        for (var i = 0; i < this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].UserMessagePosted(message)
        }
        this.userMessageQueue.enqueue(message)
        this.processMessages()
    }

    async PostSystemMessage(message: messages.Message) {
        for (var i = 0; i < this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].SystemMessagePosted(message)
        }
        this.systemMessageQueue.enqueue(message)
        this.processMessages()
    }

    RegisterHandlers(invoker: IMessageInvoker, dispatcher: Dispatcher) {
        this.invoker = invoker
        this.dispatcher = dispatcher
    }

    Start() {
        for (var i = 0; i < this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].MailboxStarted()
        }
    }

    processMessages() {
        if (this.running) return

        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule()
        }
    }

    schedule() {
        this.running = true;
        this.dispatcher.Schedule(this.run.bind(this));
    }

    async run() {
        var msg
        try {
            for (var i = 0; i < this.dispatcher.GetThroughput(); i++) {
                msg = this.systemMessageQueue.dequeue()
                if (msg != undefined) {
                    await this.invoker.InvokeSystemMessage(msg)
                    continue
                }
                msg = this.userMessageQueue.dequeue()
                if (msg != undefined) {
                    await this.invoker.InvokeUserMessage(msg)
                } else {
                    break
                }
            }
        } catch (e) {
            this.invoker.EscalateFailure(e)
        }
        this.running = false;
        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule();
        } else {
            for (var i = 0; i < this.mailboxStatistics.length; i++) {
                this.mailboxStatistics[i].MailboxEmpty()
            }
        }
    }

    // run2() {
    //     let msg = this.systemMessageQueue.dequeue()
    //     if (msg != undefined) {
    //         let p = this.invoker.InvokeSystemMessage(msg)
    //         p.then(this.run2.bind(this), this.handleError)
    //         return
    //     }
    //     msg = this.userMessageQueue.dequeue()
    //     if (msg != undefined) {
    //         let p = this.invoker.InvokeUserMessage(msg)
    //         p.then(this.run2.bind(this), this.handleError)
    //         return
    //     }
    // }

    handleError(reason: string) {
        throw "Not implemented, " + reason;
    }
}

export const Unbounded = () => new Mailbox(new Queue(), new Queue());