import { Props } from "./props";
import * as messages from "./messages";
import processRegistry from "./processRegistry";
import { IStrategy, ISupervisor } from "./supervision";
import { RestartStatistics } from "./restartStatistics";
import { PID } from "./pid";
import { IActor, done } from "./actor";
import {IMessageInvoker} from "./invoker";

export class LocalContext implements IMessageInvoker {
    public Children: PID[] = [];
    private restartStatistics: RestartStatistics;
    private restarting: boolean;
    private stopping: boolean;
    public Self: PID;
    private Actor: IActor;
    private _behavior: Function[] = [];
    private _receive: Function;

    Message: string | messages.Message;
    Sender: PID;
    constructor(private producer: () => IActor, private supervisorStrategy: IStrategy, private Parent?: PID) {
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

    Respond(message: messages.Message) {
        this.Sender.Tell(message)
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

    async Spawn(props: Props) {
        var name = processRegistry.NextId()
        return await this.SpawnNamed(props, name)
    }

    async SpawnPrefix(props: Props, prefix: string) {
        var name = prefix + processRegistry.NextId()
        return await this.SpawnNamed(props, name)
    }
    
    async SpawnNamed(props: Props, name: string) {
        let pid:PID = await props.Spawn(this.Self.Id + '/' + name, this.Self)
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

    async _tryRestartOrTerminate() {
        if (this.Children && this.Children.length > 0) {
            return
        }
        if (this.restarting) {
            await this._restart()
            return
        }
        if (this.stopping) {
            await this._stopped()
            return
        }
    }

    async _restart() {
        this._incarnateActor()
        this.Self.SendSystemMessage(messages.ResumeMailbox.Instance)
        await this.InvokeUserMessage(messages.Started)
    }

    async _stopped() {
        processRegistry.Remove(this.Self)
        await this.InvokeUserMessage(messages.Stopped.Instance)
    }
    async _processMessage(message: messages.Message) {
        if (message instanceof messages.MessageSender) {
            this.Message = message.Message
            this.Sender = message.Sender
        } else {
            this.Message = message
        }
        await this._receive(this)
    }
}


