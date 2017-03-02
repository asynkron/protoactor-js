"use strict"

async function run() {
    var actor = require('../src/actor')

    var props = actor.fromFunc(ctx => {
        if (typeof ctx.Message == "string") {
            console.log('got message', ctx.Message)
            ctx.Respond("hey")
        }
    })
    var pid = actor.spawn(props)
    var reply = await pid.RequestPromise("hello")
    console.log('got reply', reply)
}

run()