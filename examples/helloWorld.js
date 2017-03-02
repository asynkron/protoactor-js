"use strict"

var actor = require("../src/actor")

class Hello {
    constructor(who) {
        this.Who = who
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
