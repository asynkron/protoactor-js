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
        this.userMessageQueue.enqueue(message)
        for (var i = 0; i < this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].UserMessagePosted(message)
        }
        this.schedule()
    }

    PostSystemMessage(message: messages.Message) {
        this.systemMessageQueue.enqueue(message)
        for (var i = 0; i < this.mailboxStatistics.length; i++) {
            this.mailboxStatistics[i].SystemMessagePosted(message)
        }
        this.schedule()
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

    run() {
        let done = this.run2()

        if (!done) {
            return Promise.resolve()
        }

        this.running = false

        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule()
        } else {
            // empty...
        }

        return Promise.resolve()
    }

    schedule() {
        this.running = true;
        this.dispatcher.Schedule(this.run2.bind(this));
    }

    async runOld() {
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
                    for (var j = 0; j < this.mailboxStatistics.length; j++) {
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
                    for (var j = 0; j < this.mailboxStatistics.length; j++) {
                        this.mailboxStatistics[i].UserMessageReceived(msg)
                    }
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

    // experimental (currently slower) implementation...
    run2() {
        var msg
        try {
            msg = this.systemMessageQueue.dequeue()
            if (msg != undefined) {
                if (msg instanceof messages.SuspendMailbox) {
                    this.suspended = true
                }
                if (msg instanceof messages.ResumeMailbox) {
                    this.suspended = false
                }
                this.invoker.InvokeSystemMessage(msg)
                    .then(this.handleSuccess(msg))
                    .catch(this.handleError)
                return false
            }
            if (this.suspended) {
                return true
            }
            msg = this.userMessageQueue.dequeue()
            if (msg != undefined) {
                this.invoker.InvokeUserMessage(msg)
                    .then(this.handleSuccess(msg))
                    .catch(this.handleError)
                return false
            } else {
                return true
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
        return true
    }
    handleSuccess(msg: any) {
        return () => {
            for (var i = 0; i < this.mailboxStatistics.length; i++) {
                this.mailboxStatistics[i].SystemMessageReceived(msg)
            }
            setImmediate(this.schedule.bind(this));
        }
    }
    handleError(reason: any) {
        this.invoker.EscalateFailure(reason)
        setImmediate(this.schedule.bind(this));
    }
}

export const Unbounded = (...statistics: IStatistics[]) => new Mailbox(new Queue(), new Queue(), statistics || []);