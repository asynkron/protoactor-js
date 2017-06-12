import { PID } from "./pid"
import { Message } from "./messages"
import { IProcess } from "./process"

export class PromiseProcess implements IProcess {
    public PID: PID
    public Promise: Promise<any>
    private timer: any
    private resolved: boolean

    constructor(timeoutMs: number) { 
        this.Promise = new Promise<Message>((resolve, reject) => {
            this.resolve = value => {
                this.resolved = true
                resolve(value)
            };
            this.reject = reject;
            if(timeoutMs) {
                this.timer = setTimeout(() => {
                    if (!this.resolved) {
                        reject(`Requested promise timed out after ${timeoutMs} ms.`)
                    }
                }, timeoutMs)
            }
        });
    }

    private resolve: (value?: Message) => void;
    private reject: (value?: string) => void;

    SendUserMessage(pid: PID, message: Message, sender?: PID) {
        this.resolve(message)
        return this.Promise;
        //this.PID.Stop()
    }

    SendSystemMessage(pid: PID, message: Message) {
        global.console.log(`PID:${pid.Id}, SystemMessage:${message}`)
        return Promise.resolve()
    }

    Stop(pid?: PID) {
        throw "Not implemented, PID: " + (pid && pid.Id);
    }
}
