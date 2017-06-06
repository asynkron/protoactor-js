import * as actor from "../src/actor";

async function run() {
    var props = actor.fromFunc(ctx => {
        if (typeof ctx.Message == "string") {
            global.console.log('got message', ctx.Message)
            ctx.Respond("hey")
        }
    })
    var pid = actor.spawn(props)
    var reply = await pid.RequestPromise("hello")
    global.console.log('got reply', reply)
}

run()