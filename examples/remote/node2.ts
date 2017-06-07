import * as actor from "../../src/actor";
import * as remote from "../../src/remote/remote";
import * as pb from "./messages_pb";

remote.Serialization.RegisterTypes('messages', pb)

let helloProps = actor.fromFunc(ctx => {
    let msg = ctx.Message
    if (msg instanceof pb.messages.HelloRequest) {
        let res = new pb.messages.HelloResponse()
        res.Message = 'Hello from node 2'
        ctx.Respond(res)
    }
})

remote.Remote.RegisterKnownKind('hello', helloProps)
remote.Remote.Start('localhost', 12000)