import { Message } from "./messages";
import { PID } from "./pid"
export interface IMessageInvoker {
    InvokeSystemMessage(message: Message): Promise<void>;
    InvokeUserMessage(message: Message): Promise<void>;
    EscalateFailure(error: any, child?: PID): void;
}