import { IQueue, Queue } from "./queue";
import { Dispatcher } from "./dispatcher";
import { IMessageInvoker } from "./invoker";
import * as messages from "./messages"
// import {Queue2} from "./queue2";
export interface IStatistics {
    UserMessagePosted(message: messages.Message): void;
    SystemMessagePosted(message: messages.Message): void;
    UserMessageReceived(message: messages.Message): void;
    SystemMessageReceived(message: messages.Message): void;
    MailboxStarted(): void;
    MailboxEmpty(): void;
}
export interface IMailbox {
    PostUserMessage(message: messages.Message): void
    PostSystemMessage(message: messages.Message): void
    RegisterHandlers(invoker: IMessageInvoker, dispatcher: Dispatcher): void;
    Start(): void;
}
export class Mailbox implements IMailbox {
    private running = false;
    private dispatcher: Dispatcher
    private invoker: IMessageInvoker
    private suspended: boolean = false
    constructor(private systemMessageQueue: IQueue,
        private userMessageQueue: IQueue,
        private mailboxStatistics: IStatistics[] = []) {
    }

    PostUserMessage(message: messages.Message) {
        for (var i = 0; i < this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].UserMessagePosted(message)
        }
        this.userMessageQueue.enqueue(message)
        this.processMessages()
    }

    PostSystemMessage(message: messages.Message) {
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
                    if (msg instanceof messages.SuspendMailbox) {
                        this.suspended = true
                    }
                    if (msg instanceof messages.ResumeMailbox) {
                        this.suspended = false
                    }
                    await this.invoker.InvokeSystemMessage(msg)
                    for (var i = 0; i < this.mailboxStatistics.length; i++) {
                        this.mailboxStatistics[i].SystemMessageReceived(msg)
                    }
                    continue
                }
                if (this.suspended) {
                    break
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
            setImmediate(this.schedule.bind(this));
        } else {
            for (var i = 0; i < this.mailboxStatistics.length; i++) {
                this.mailboxStatistics[i].MailboxEmpty()
            }
        }
        return Promise.resolve()
    }
}

export const Unbounded = (...statistics: IStatistics[]) => new Mailbox(new Queue(), new Queue(), statistics || []);