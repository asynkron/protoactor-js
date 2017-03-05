"use strict"

var SupervisorDirective = {
    Resume: 0,
    Restart: 1,
    Stop: 2,
    Escalate: 3 
}
var defaultDecider = (who, reason) => SupervisorDirective.Restart

class OneForOneStrategy {
    constructor(decider, maxRetries, withinMs) {
        this.decider = decider
        this.maxRetries = maxRetries
        this.withinMs = withinMs
    }

    HandleFailure(supervisor, child, restartStatistics, reason) {
        let directive = this.decider(child, reason)
        switch(directive) {
            case SupervisorDirective.Resume:
                supervisor.ResumeChildren(child)
                break
            case SupervisorDirective.Restart:
                if(this._requestRestartPermission(restartStatistics)) {
                    console.log('Restarting', child.ToShortString(), 'Reason', reason)
                    supervisor.RestartChildren(child)
                } else {
                    console.log('Stopping', child.ToShortString(), 'Reason', reason)
                    supervisor.StopChildren(child)
                }
                break
            case SupervisorDirective.Stop:
                console.log('Stopping', child.ToShortString(), 'Reason', reason)
                supervisor.StopChildren(child)
                break
            case SupervisorDirective.Escalate:
                supervisor.EscalateFailure(child, reason)
                break
        }
    }

    _requestRestartPermission(rs) {
        if (this.maxRetries == 0) {
            return false
        }
        rs.Fail()
        if(this.withinMs == 0 || rs.IsWithinDuration(this.withinMs)) {
            return rs.FailureCount <= this.maxRetries
        }
        rs.Reset()
        return true
    }
}

module.exports = {
    DefaultStrategy: new OneForOneStrategy(defaultDecider, 10, 10*1000),
    OneForOneStrategy: OneForOneStrategy,
    SupervisorDirective: SupervisorDirective
}