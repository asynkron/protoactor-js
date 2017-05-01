import { PID } from "./pid";
import { Message } from "./messages";

export interface IProcess {
    SendUserMessage(pid: PID, message: Message, sender?: PID): void | Promise<Message | void>;
    SendSystemMessage(pid: PID, message: Message): void | Promise<void>;
    Stop(pid?: PID): void;
}