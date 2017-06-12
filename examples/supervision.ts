import { IActor, fromProducer, spawn, done } from "../src/actor";
import { OneForOneStrategy, IDecider, SupervisorDirective } from "../src/supervision";
import * as messages from "../src/messages";
import { LocalContext } from "../src/localContext";

class Hello {
    constructor(public Who: string) {

    }
}
class Recoverable { }
class Fatal { }
class ParentActor implements IActor {
    Receive(ctx: LocalContext) {
        var child
        if (!ctx.Children || ctx.Children.length == 0) {
            let props = fromProducer(() => new ChildActor())
            child = ctx.Spawn(props)
        } else {
            child = ctx.Children[0]
        }
        let msg = ctx.Message
        if (msg instanceof Hello) {
            child.Tell(msg)
        }
        if (msg instanceof Recoverable) {
            child.Tell(msg)
        }
        if (msg instanceof Fatal) {
            child.Tell(msg)
        }

        return done;
    }
}
class ChildActor implements IActor {
    Receive(ctx: LocalContext) {
        let msg = ctx.Message
        if (msg instanceof Hello) {
            global.console.log(ctx.Self.ToShortString(), 'Hello', msg.Who)
        }
        if (msg instanceof Recoverable) {
            global.console.log(ctx.Self.ToShortString(), 'Recoverable')
            throw msg
        }
        if (msg instanceof Fatal) {
            global.console.log(ctx.Self.ToShortString(), 'Fatal')
            throw msg
        }
        if (msg == messages.Started) {
            global.console.log(ctx.Self.ToShortString(), 'Started')
        }
        if (msg == messages.Stopping) {
            global.console.log(ctx.Self.ToShortString(), 'Stopping')
        }
        if (msg == messages.Stopped) {
            global.console.log(ctx.Self.ToShortString(), 'Stopped')
        }
        if (msg == messages.Stopping) {
            global.console.log(ctx.Self.ToShortString(), 'Stopping')
        }
        if (msg == messages.Restarting) {
            global.console.log(ctx.Self.ToShortString(), 'Restarting')
        }

        return done;
    }
}

var decider: IDecider = (who, reason) => {
    if (reason instanceof Recoverable)
        return SupervisorDirective.Restart;
    if (reason instanceof Fatal)
        return SupervisorDirective.Stop;
    return SupervisorDirective.Escalate;
}

async function run() {
    var props = fromProducer(() => new ParentActor())
        .WithSupervisor(new OneForOneStrategy(decider, 1));

    var pid = await spawn(props)

    pid.Tell(new Hello("Christian"))
    pid.Tell(new Recoverable())
    pid.Tell(new Fatal())
}

run()