"use strict"

var actor = require('../src/actor')
var supervision = require('../src/supervision')
var messages = require('../src/messages')

class Hello {
    constructor(who) {
        this.Who = who
    }
}
class Recoverable {}
class Fatal {}
class ParentActor {
    Receive(ctx) {
        var child
        if (!ctx.Children || ctx.Children.length == 0) {
            let props = actor.fromProducer(() => new ChildActor())
            child = ctx.Spawn(props)
        } else {
            child = ctx.Children[0]
        }
        let msg = ctx.Message
        if(msg instanceof Hello) {
            child.Tell(msg)
        }
        if(msg instanceof Recoverable) {
            child.Tell(msg)
        }
        if(msg instanceof Fatal) {
            child.Tell(msg)
        }
        return actor.done
    }
}
class ChildActor {
    Receive (ctx) {
        let msg = ctx.Message
        if (msg instanceof Hello) {
            console.log(ctx.Self.ToShortString(), 'Hello', msg.Who)
        }
        if (msg instanceof Recoverable) {
            console.log(ctx.Self.ToShortString(), 'Recoverable')
            throw msg
        }
        if (msg instanceof Fatal) {
            console.log(ctx.Self.ToShortString(), 'Fatal')
            throw msg
        }
        if (msg == messages.Started) {
            console.log(ctx.Self.ToShortString(), 'Started')
        }
        if (msg == messages.Stopping) {
            console.log(ctx.Self.ToShortString(), 'Stopping')
        }
        if (msg == messages.Stopped) {
            console.log(ctx.Self.ToShortString(), 'Stopped')
        }
        if (msg == messages.Stopping) {
            console.log(ctx.Self.ToShortString(), 'Stopping')
        }
        if (msg == messages.Restarting) {
            console.log(ctx.Self.ToShortString(), 'Restarting')
        }
    }
}

var decider = (who, reason) => {
    if (reason instanceof Recoverable)
        return supervision.SupervisorDirective.Restart;
    if (reason instanceof Fatal)
        return supervision.SupervisorDirective.Stop;
    return supervision.SupervisorDirective.Escalate;
}
var props = actor.fromProducer(() => new ParentActor())
    .WithSupervisor(new supervision.OneForOneStrategy(decider, 1, null));
var pid = actor.spawn(props)

pid.Tell(new Hello("Christian"))

pid.Tell(new Recoverable())
pid.Tell(new Fatal())