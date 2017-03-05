"use strict"

class Started {}
class Stop {}
class Stopping {}
class Restart {}
class Restarting {}
class Terminated {
    constructor(who) {
        this.Who =  who
    }
}

class ResumeMailbox {}
class SuspendMailbox {}

class MessageSender{
    constructor(message, sender) {
        this.Message = message
        this.Sender = sender
    }
}

class Failure {
    constructor(who, reason, restartStatistics) {
        this.Who = who
        this.Reason = reason
        this.RestartStatistics = restartStatistics
    }
}

module.exports = {
    Started: new Started(),
    Stop: new Stop(),
    Stopping: new Stopping(),
    Restart: new Restart(),
    Restarting: new Restarting(),
    Terminated: new Terminated(),
    MessageSender: MessageSender,
    Failure: Failure
}