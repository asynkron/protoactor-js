import { IProcess } from "./process";
import { PromiseProcess } from "./promiseProcess";
import processRegistry from "./processRegistry";
import { Message } from "./messages";
import * as messages from "./actor_pb";
import { LocalProcess } from "./localProcess"

export class PID extends messages.actor.PID {
    private _p:IProcess|undefined;
    constructor(public Address: string, public Id: string) {
        super();
    }

    get Ref():IProcess|undefined {
        let p = this._p;
        if (p) {
            if (p instanceof LocalProcess && p.IsDead) {
                this._p = undefined;
            }
            return this._p
        } else {
            let reff = processRegistry.Get(this)
            this._p = reff
            return this._p
        }
    }

    Tell(message: Message) {
        let reff = this.Ref || processRegistry.Get(this)
        return reff.SendUserMessage(this, message)
    }

    SendSystemMessage(message: Message) {
        let reff = this.Ref || processRegistry.Get(this)
        return reff.SendSystemMessage(this, message)
    }

    RequestPromise(message: Message) {
        var p = new PromiseProcess()
        var name = processRegistry.NextId()
        this.Request(message, p.PID)
        return p.Promise;
    }

    Request(message: Message, sender: PID) {
        let reff = this.Ref || processRegistry.Get(this)
        reff.SendUserMessage(this, message, sender)
    }

    Stop() {
        let reff = this.Ref || processRegistry.Get(this)
        reff.Stop()
        processRegistry.Remove(this)
    }

    ToShortString() {
        return this.Address + '/' + this.Id;
    }
}
