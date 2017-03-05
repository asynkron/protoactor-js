"use strict"

var messages = require('./messages')
var ProcessRegistry = require('./processRegistry')

class LocalContext {
    constructor(producer, supervisorStrategy, parent) {
        this.producer = producer
        this.supervisorStrategy = supervisorStrategy
        this.Parent = parent
        this.Children = []
        this._incarnateActor()
    }

    InvokeSystemMessage(message) {
        if(message === messages.Started) {
            return this.InvokeUserMessage(message)
        }
        if(message === messages.Stop) {
            return this._handleStop()
        }
        if(message === messages.Terminated) {
            return this._handleTerminated(message)
        }
        if(message instanceof messages.Failure) {
            this._handleFailure(message)
        }
        if(message === messages.Restart) {
            return this._handleRestart()
        }
        return Promise.resolve()
    }

    InvokeUserMessage(message) {
        return this._processMessage(message)
    }

    Respond(message) {
        this.Sender.Tell(message)
    }

    EscalateFailure(exception, message) {
        if(this.restartStatistics == undefined) {
            this.restartStatistics = new RestartStatistics(0, null)
        }
        var failure = new messages.Failure(this.Self, exception, this.restartStatistics)
        if (this.Parent == null) {
            this.supervisorStrategy.HandleFailure(this, this.Self, this.restartStatistics, exception)
        } else {
            this.Self.SendSystemMessage(messages.SuspendMailbox)
            this.Parent.SendSystemMessage(failure)
        }
    }

    RestartChildren(...pids) {
        for(var i=0; i<pids.length; i++){
            pids[i].SendSystemMessage(messages.Restart)
        }
    }

    StopChildren(...pids) {
        for(var i=0; i<pids.length; i++){
            pids[i].SendSystemMessage(messages.Stop)
        }
    }

    ResumeChildren(...pids) {
        for(var i=0; i<pids.length; i++){
            pids[i].SendSystemMessage(messages.Resume)
        }
    }

    Spawn(props) {
        var name = ProcessRegistry.NextId()
        return this.SpawnNamed(props, name)
    }

    SpawnPrefix(props, prefix) {
        var name = prefix + ProcessRegistry.NextId()
        return this.SpawnNamed(props, name)
    }

    SpawnNamed(props, name) {
        var pid = props.Spawn(this.Self.Id+'/'+name, this.Self)
        this.Children.push(pid)
        return pid
    }

    _incarnateActor() {
        this.Actor = this.producer()
    }

    async _handleStop() {
        this.restarting = false
        this.stopping = true
        await this.InvokeUserMessage(messages.Stopping)
        if(this.Children && this.Children.length > 0) {
            for(var i=0; i<this.Children.length; i++) {
                this.Children[i].Stop()
            }
        }
        await this._tryRestartOrTerminate()
    }

    async _handleTerminated(t) {
        this.Children.Remove(msg.Who)
        await this.InvokeUserMessage(msg)
        await this._tryRestartOrTerminate()
    }

    _handleFailure(f) {
        if(this.Actor.HandleFailure) {
            this.Actor.HandleFailure(this, f.Who, f.RestartStatistics, f.Reason)
            return
        }
        this.supervisorStrategy.HandleFailure(this, f.Who, f.RestartStatistics, f.Reason)
    }

    async _handleRestart() {
        this.stopping = false
        this.restarting = true
        await this.InvokeUserMessage(messages.Restarting)
        if(this.Children && this.Children.length > 0) {
            for(var i=0; i<this.Children.length; i++) {
                this.Children[i].Stop()
            }
        }
        await this._tryRestartOrTerminate
    }

    async _tryRestartOrTerminate() {
        if(this.Children && this.Children.length > 0) {
            return
        }
        if(this.restarting) {
            await this._restart()
            return
        }
        if(this.stopping) {
            await this._stopped()
            return
        }
    }

    async _restart() {
        this._incarnateActor()
        this.Self.SendSystemMessage(messages.ResumeMailbox)
        await this.InvokeUserMessage(messages.Started)
    }

    async _stopped() {
        ProcessRegistry.Remove(this.Self)
        await this.InvokeUserMessage(messages.Stopped)
    }

    async _processMessage(message) {
        if (message instanceof messages.MessageSender) {
            this.Message = message.Message
            this.Sender = message.Sender
        } else {
            this.Message = message
        }
        await this.Actor.Receive(this)
    }
}

class RestartStatistics {
    constructor() {
        this.FailureCount = 0
        this.LastFailureTime = null
    }

    Fail() {
        this.FailureCount++
    }

    Reset() {
        this.failureCount = 0
    }

    Restart() {
        this.lastFailureTime = new Date()
    }

    IsWithinDuration(withinMs) {
        return (new Date() - this.LastFailureTime) < withinMs
    }
}

module.exports = LocalContext