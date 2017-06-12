import * as actor from "../src/actor";

class Hello {
    constructor(public Who: string) {

    }
}

async function run() {
    var props = actor.fromFunc(context => {
        var msg = context.Message
        if (msg instanceof Hello) {
            global.console.log('Hello', msg.Who)
        }
    });
    var pid = await actor.spawn(props);
    pid.Tell(new Hello("Christian"))
}

run()