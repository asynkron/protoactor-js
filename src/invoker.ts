import { Message } from "./messages";
import { PID } from "./pid"
export interface IMessageInvoker {
    InvokeSystemMessage(message: any): Promise<void>;
    InvokeUserMessage(message: any): Promise<void>;
    EscalateFailure(error: any, child?: PID): void;
}