import { PID } from "./pid";
import { Message } from "./messages";
import { IProcess } from "./process";

export class PromiseProcess implements IProcess {
    public PID: PID;
    public Promise = new Promise<Message>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
    });

    private resolve: (value?: Message) => void;
    private reject: (value?: string) => void;

    SendUserMessage(pid: PID, message: Message, sender?: PID) {
        console.log(`PID:${pid.Id}, UserMessage:${message}, Sender:${sender && sender.ToShortString()}`)
        this.resolve(message)
        return this.Promise;
        //this.PID.Stop()
    }

    SendSystemMessage(pid: PID, message: Message) {
        console.log(`PID:${pid.Id}, SystemMessage:${message}`)
        return Promise.resolve()
    }

    Stop(pid?: PID) {
        throw "Not implemented, PID: " + (pid && pid.Id);
    }
}
