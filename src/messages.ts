import { PID } from "./pid";
import { RestartStatistics } from "./restartStatistics";
export * from "./actor_pb";

export type Message = { }
export class Started { 
    static Instance: Started = new Started()
    private constructor() { }
}
export class Stop { 
    static Instance: Stop = new Stop()
    private constructor() { }
}
export class Stopping {
    static Instance: Stopping = new Stopping()
    private constructor() { }
}
export class Stopped { 
    static Instance: Stopped = new Stopped()
    private constructor() { }
}
export class Restart { 
    static Instance: Restart = new Restart()
    private constructor() { }
}
export class Restarting { 
    static Instance: Restarting = new Restarting()
    private constructor() { }
}
export class Resume { 
    static Instance: Resume = new Resume()
    private constructor() { }
}
export class Terminated {
    constructor(public Who: PID) { }
}
export class ResumeMailbox { 
    static Instance: ResumeMailbox = new ResumeMailbox()
    private constructor() { }
}
export class SuspendMailbox { 
    static Instance: SuspendMailbox = new SuspendMailbox()
    private constructor() { }
}
export class MessageSender {
    constructor(public Message: string, public Sender: PID) { }
}
export class Failure {
    constructor(public Who: PID, public Reason: string, public RestartStatistics: RestartStatistics) { }
}
