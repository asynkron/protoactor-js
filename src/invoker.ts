import {Message} from "./messages";
export interface IMessageInvoker {
    InvokeSystemMessage(message: Message): Promise<void>;
    InvokeUserMessage(message: Message): Promise<void>;
    EscalateFailure(error: any, message?: Message): void;
}