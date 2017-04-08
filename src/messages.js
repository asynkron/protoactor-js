"use strict"

let pb = require('./actor_pb.js')

class Started {}
class Stopping {}
class Restart {}
class Restarting {}

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
    Stopping: new Stopping(),
    Restart: new Restart(),
    Restarting: new Restarting(),
    
    MessageSender: MessageSender,
    Failure: Failure
}
Object.assign(module.exports, pb)