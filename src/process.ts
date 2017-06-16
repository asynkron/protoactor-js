import { PID } from "./pid";
import { Message } from "./messages";

export interface IProcess {
    SendUserMessage(pid: PID, message: Message, sender?: PID): void;
    SendSystemMessage(pid: PID, message: Message): void;
    Stop(pid?: PID): void;
}