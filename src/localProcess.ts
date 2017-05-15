import { IMailbox } from "./mailbox";
import { PID } from "./pid";
import { IProcess } from "./process";
import * as messages from "./messages";

export class LocalProcess implements IProcess {
    constructor(private Mailbox: IMailbox) {

    }

    SendUserMessage(pid: PID, message: string, sender?: PID) {
        console.log("SendUserMessage, PID: " + pid.Id);
        if (sender) {
            return this.Mailbox.PostUserMessage(new messages.MessageSender(message, sender))
        }
        return this.Mailbox.PostUserMessage(message)
    }

    SendSystemMessage(pid: PID, message: messages.Message) {
        console.log("SendSystemMessage, PID: " + pid.Id);
        return this.Mailbox.PostSystemMessage(message)
    }

    Stop(pid: PID) {
        this.SendSystemMessage(pid, messages.Stop)
    }
}