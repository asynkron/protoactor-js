import { IProcess } from "./process";
import { PromiseProcess } from "./promiseProcess";
import processRegistry from "./processRegistry";
import { Message } from "./messages";
import * as messages from "./actor_pb";
export class PID extends messages.PID {
    public static New = (address: string, id: string) => {
        var pid = new messages.PID()
        pid.Address = address
        pid.Id = id
        return pid;
    }
    private PID: PID;
    constructor(public Address: string, public Id: string, private Ref: IProcess) {
        super();
    }

    Tell(message: Message) {
        return this.Ref.SendUserMessage(this, message)
    }

    SendSystemMessage(message: Message) {
        return this.Ref.SendSystemMessage(this, message)
    }

    RequestPromise(message: Message) {
        var p = new PromiseProcess()
        var name = processRegistry.NextId()
        this.PID = processRegistry.TryAdd(name, p, PID)
        p.PID = this.PID
        this.Request(message, p.PID)
        return p.Promise;
    }

    Request(message: Message, sender: PID) {
        this.Ref.SendUserMessage(this, message, sender)
    }

    Stop() {
        this.Ref.Stop()
        processRegistry.Remove(this)
    }

    ToShortString() {
        return this.Address + '/' + this.Id;
    }
}
