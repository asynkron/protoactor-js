"use strict"

var actor = require("../src/actor")

class Hello {
    constructor(who) {
        this.Who = who
    }
}

let helloBehavior = context => {
    var msg = context.Message
    if (msg instanceof Hello) {
        console.log('Hello', msg.Who)
        console.log('changing to goodbye behavior')
        context.PushBehavior(goodbyeBehavior)
    }
}
let goodbyeBehavior = context => {
    var msg = context.Message
    if (msg instanceof Hello) {
        console.log('I already said hello. Goodbye', msg.Who)
        console.log('reverting to previous behavior')
        context.PopBehavior()
    }
}

var props = actor.fromFunc(helloBehavior)
var pid = actor.spawn(props)

pid.Tell(new Hello("Christian"))
pid.Tell(new Hello("Christian"))
pid.Tell(new Hello("Christian"))
