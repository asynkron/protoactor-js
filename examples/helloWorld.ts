import * as actor from "../src/actor";

class Hello {
    constructor(public Who: string) {

    }
}

var props = actor.fromFunc(context => {
    var msg = context.Message
    if (msg instanceof Hello) {
        console.log('Hello', msg.Who)
    }
});
var pid = actor.spawn(props);
pid.Tell(new Hello("Christian"))
