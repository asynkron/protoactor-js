import { Dispatcher } from "../src/dispatcher"
import * as actor from "../src/actor"
import {PID} from "../src/pid"
import {LocalContext} from "../src/localContext"

class Awaiter {
    public promise: Promise<void>
    public resolve: () => void
    constructor() {
        this.promise = new Promise<void>(resolve => {
            this.resolve = resolve
        })
    }
}
class Msg {
    constructor(public sender: PID){}
}
class Start {
    constructor(public sender: PID){}
}
class PingActor implements actor.IActor {
    private batch: number
    constructor(private awaiter: Awaiter, private messageCount: number, private batchSize: number){}
    Receive(c: LocalContext): Promise<void> {
        let msg = c.Message
        if (msg instanceof Start) {
            this.sendBatch(c, msg.sender)
        }
        if (msg instanceof Msg) {
            this.batch--
            if (this.batch == 0) {
                if (!this.sendBatch(c, msg.sender)) {
                    this.awaiter.resolve()
                }
            }
        }
        return actor.done
    }

    private sendBatch(c: LocalContext, s: PID): boolean {
        if (this.messageCount == 0) {
            return false
        }
        let m = new Msg(c.Self)
        for (let i = 0; i < this.batchSize; i++) {
            s.Tell(m)
        }

        this.messageCount -= this.batchSize
        this.batch = this.batchSize
        return true
    }
}

let messageCount = 100000
let batchSize = 100
var tps = [300, 400, 500, 600, 700, 800, 900]

async function benchmark(t: number) {
    var d = new Dispatcher()
    d.SetThroughput(t)

    let clientCount = 2
    let clients = []
    let echos = []
    let promises = []
    let echoProps = actor.fromFunc(c => {
        let msg = c.Message
        if (msg instanceof Msg) {
            msg.sender.Tell(msg)
        }
        return actor.done
    }).WithDispatcher(d)

    for (let i = 0; i < clientCount; i++) {
        let awaiter = new Awaiter()
        let clientProps = actor.fromProducer(() => new PingActor(awaiter, messageCount, batchSize))
            .WithDispatcher(d)
        let client = await actor.spawn(clientProps)
        let echo = await actor.spawn(echoProps)
        promises.push(awaiter.promise)
        clients.push(client)
        echos.push(echo)
    }

    let t0 = new Date().getTime()
    for (let i = 0; i < clientCount; i++) {
        await clients[i].Tell(new Start(echos[i]))
    }
    await Promise.all(promises)
    let t1 = new Date().getTime()
    let dt = t1 - t0
    
    let totalMessages = messageCount*2*clientCount
    let x = totalMessages/dt*1000
    console.log(`${t}\t\t\t${dt} ms\t\t${x}`)
}

async function run() {
    console.log('Dispatcher\t\tElapsed\t\tMsg/sec')
    for (let i = 0; i < tps.length; i++) {
        await benchmark(tps[i])
    }
    console.log('Done.')
}

run()