import { PID } from "./pid";
import { RestartStatistics } from "./restartStatistics";
export * from "./actor_pb.js";
export type Message = {}
export class Started { }
export class Stop { }
export class Stopping { }
export class Stopped { }

export class Restart { }
export class Restarting { }
export class Resume { }
export class Terminated {
    constructor(public Who: PID) { }
}

export class ResumeMailbox { }
export class SuspendMailbox { }

export class MessageSender {
    constructor(public Message: string, public Sender: PID) {

    }
}

export class Failure {
    constructor(public Who: PID, public Reason: string, public RestartStatistics: RestartStatistics) {

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
