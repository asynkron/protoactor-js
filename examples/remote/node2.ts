import * as actor from "../../src/actor";
import * as remote from "../../src/remote/remote";
import * as messages from "./messages_pb";

remote.Serialization.RegisterTypes('messages', messages)

let helloProps = actor.fromFunc(ctx => {
    let msg = ctx.Message
    if (msg instanceof messages.HelloRequest) {
        let res = new HelloResponse()
        res.setMessage('Hello from node 2')
        ctx.Respond(res)
    }
})

remote.RegisterKnownKind('hello', helloProps)
remote.Start('localhost', 12000)