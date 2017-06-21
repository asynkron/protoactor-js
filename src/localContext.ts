import { Props } from "./props";
import * as messages from "./messages";
import processRegistry from "./processRegistry";
import { IStrategy, ISupervisor } from "./supervision";
import { RestartStatistics } from "./restartStatistics";
import { PID } from "./pid";
import { IActor, done } from "./actor";
import {IMessageInvoker} from "./invoker";

export interface IContext extends IMessageInvoker {
    Children: PID[];
    Message: any;
    Parent?: PID;
    Self: PID;
    Sender: PID;

    Tell(target: PID, message: any): void;
    Request(target: PID, message: any): void;
    RequestPromise(target: PID, message: any): Promise<void>;
    Respond(message: any): void;

    Spawn(props: Props): PID;
    SpawnPrefix(props: Props, prefix: string): PID;
    SpawnNamed(props: Props, name: string): PID;

    //Watch(pid: PID)
    //Unwatch(pid: PID)

    //ReceiveTimeout: number
    //SetReceiveTimeout(timeoutMs: number): void;
}

export class LocalContext implements IContext {
    private restartStatistics: RestartStatistics;
    private restarting: boolean;
    private stopping: boolean;
    private Actor: IActor;
    private _behavior: Function[] = [];
    private _receive: Function;

    public Children: PID[] = [];
    public Self: PID;
    public Message: any;
    public Sender: PID;
    
    constructor(private producer: () => IActor, private supervisorStrategy: IStrategy, public Parent?: PID) {
        this._incarnateActor()
    }

    InvokeSystemMessage(message: messages.Message) {
        if (message instanceof messages.Started) {
            return this.InvokeUserMessage(message)
        }
        if (message instanceof messages.Stop) {
            return this._handleStop()
        }
        if (message instanceof messages.Terminated) {
            return this._handleTerminated(message)
        }
        if (message instanceof messages.Failure) {
            this._handleFailure(message)
        }
        if (message instanceof messages.Restart) {
            return this._handleRestart()
        }
        return done;
    }

    InvokeUserMessage(message: messages.Message) {
        return this._processMessage(message)
    }

    Tell(target: PID, message: any): void {
        // todo: sender middleware
        target.Tell(message)
    }

    Request(target: PID, message: any): void {
        target.Request(message, this.Self)
    }

    RequestPromise(target: PID, message: any, timeoutMs?: number): Promise<void> {
        return target.RequestPromise(message, timeoutMs)
    }

    Respond(message: messages.Message) {
        return this.Sender.Tell(message)
    }

    EscalateFailure(exception: string, message?: messages.Failure) {
        global.console.log(`Failure ${exception}`, message);
        if (this.restartStatistics == undefined) {
            this.restartStatistics = new RestartStatistics()
        }
        var failure = new messages.Failure(this.Self, exception, this.restartStatistics)
        if (!this.Parent) {
            // failure.Who was prev this.Self, seemed odd?
            this.supervisorStrategy.HandleFailure(this as any as ISupervisor, failure.Who, this.restartStatistics, exception)
        } else {
            this.Self.SendSystemMessage(messages.SuspendMailbox.Instance)
            this.Parent.SendSystemMessage(failure)
        }
    }

    RestartChildren(...pids: PID[]) {
        for (var i = 0; i < pids.length; i++) {
            pids[i].SendSystemMessage(messages.Restart.Instance)
        }
    }

    StopChildren(...pids: PID[]) {
        for (var i = 0; i < pids.length; i++) {
            pids[i].SendSystemMessage(messages.Stop.Instance)
        }
    }

    ResumeChildren(...pids: PID[]) {
        for (var i = 0; i < pids.length; i++) {
            pids[i].SendSystemMessage(messages.Resume.Instance)
        }
    }

    Spawn(props: Props) {
        var name = processRegistry.NextId()
        return this.SpawnNamed(props, name)
    }

    SpawnPrefix(props: Props, prefix: string) {
        var name = prefix + processRegistry.NextId()
        return this.SpawnNamed(props, name)
    }
    
    SpawnNamed(props: Props, name: string) {
        let pid:PID = props.Spawn(this.Self.Id + '/' + name, this.Self)
        this.Children.push(pid)
        return pid
    }

    SetBehavior(receive: Function) {
        this._behavior = []
        this.PushBehavior(receive)
    }

    PushBehavior(receive: Function) {
        this._behavior.push(receive)
        this._receive = receive
    }

    PopBehavior(receive?: Function) {
        if (this._behavior.length <= 1) {
            throw "Cannot pop actor's last behavior"
        }
        this._behavior.pop()
        this._receive = this._behavior[this._behavior.length - 1]
    }

    _incarnateActor() {
        this.Actor = this.producer()
        this.SetBehavior(this.Actor.Receive.bind(this.Actor))
    }

    async _handleStop() {
        this.restarting = false
        this.stopping = true
        await this.InvokeUserMessage(messages.Stopping.Instance)
        if (this.Children && this.Children.length > 0) {
            for (var i = 0; i < this.Children.length; i++) {
                this.Children[i].Stop()
            }
        }
        await this._tryRestartOrTerminate()
    }

    async _handleTerminated(terminated: messages.Terminated) {
        this.Children.splice(this.Children.indexOf(terminated.Who), 1);
        await this.InvokeUserMessage(terminated)
        await this._tryRestartOrTerminate()
    }

    _handleFailure(failure: messages.Failure) {
        var handleFailure = this.supervisorStrategy.HandleFailure;
        handleFailure(this as any as ISupervisor, failure.Who, failure.RestartStatistics, failure.Reason);
    }

    async _handleRestart() {
        this.stopping = false
        this.restarting = true
        await this.InvokeUserMessage(messages.Restarting.Instance)
        if (this.Children && this.Children.length > 0) {
            for (var i = 0; i < this.Children.length; i++) {
                this.Children[i].Stop()
            }
        }
        await this._tryRestartOrTerminate
    }

    _tryRestartOrTerminate() {
        if (this.Children && this.Children.length > 0) {
            return
        }
        if (this.restarting) {
            return this._restart()
        }
        if (this.stopping) {
            return this._stopped()
        }
    }

    _restart() {
        this._incarnateActor()
        this.Self.SendSystemMessage(messages.ResumeMailbox.Instance)
        return this.InvokeUserMessage(messages.Started)
    }

    _stopped() {
        processRegistry.Remove(this.Self)
        return this.InvokeUserMessage(messages.Stopped.Instance)
    }

    _processMessage(message: messages.Message) {
        if (message instanceof messages.MessageSender) {
            this.Message = message.Message
            this.Sender = message.Sender
        } else {
            this.Message = message
        }
        return this._receive(this)
    }
}


