import * as actor from "../src/actor"
import {PID} from "../src/pid"
import processRegistry from "../src/processRegistry"
import * as messages from "../src/messages"
import {assert, expect, use as chaiUse} from "chai"
import * as chaiAsPromised from "chai-as-promised"

chaiUse(chaiAsPromised)

class Awaiter {
    public promise: Promise<void>
    public resolve: () => void
    constructor() {
        this.promise = new Promise<void>(resolve => {
            this.resolve = resolve
        })
    }
}

describe('actor', () => {

    it('should receive Started message when started', async () => {
        let received : any[] = []
        let aw = new Awaiter()
        
        actor.spawn(
            actor.fromFunc(context => {
                var msg = context.Message
                if (msg instanceof messages.Started) {
                    received.push(msg)
                    aw.resolve()
                }
            })
        )

        await aw.promise
        assert.sameDeepMembers(received, [
            messages.Started.Instance
        ])
    })

    it('should receive Stopping and Stopped message when stopped', async () => {
        let received : any[] = []
        let aw = new Awaiter()
        let pid = actor.spawn(
            actor.fromFunc(context => {
                var msg = context.Message
                if (msg instanceof messages.Stopping || msg instanceof messages.Stopped) {
                    received.push(msg)
                }
                if (msg instanceof messages.Stopped) {
                    aw.resolve()
                }
            })
        );
        
        pid.Stop()
        
        await aw.promise
        assert.sameDeepMembers(received, [
            messages.Stopping.Instance,
            messages.Stopped.Instance
        ])
    })

    it('should receive message when using Tell', async () => {
        let received : any[] = []
        let aw = new Awaiter()
        let pid = actor.spawn(
            actor.fromFunc(context => {
                var msg = context.Message
                if (typeof(msg) === 'string') {
                    received.push(msg)
                    aw.resolve()
                }
            })
        );

        pid.Tell('hello')
        
        await aw.promise
         assert.sameDeepMembers(received, [
            'hello'
        ])
    })
    
    it('should respond with message when using RequestPromise', async () => {
        let pid = actor.spawn(
            actor.fromFunc(context => {
                var msg = context.Message
                if (typeof(msg) === 'string') {
                    context.Respond('hey')
                }
            })
        );

        let res = await pid.RequestPromise('hello')
        
        assert.equal(res, 'hey')
    })

    it('should raise timeout if no response is sent when using RequestPromise', async () => {
        let pid = actor.spawn(
            actor.fromFunc(context => { })
        );

        let p = pid.RequestPromise('hello', 10)
        
        await assert.isRejected(p)
    })

    it('should be added to ProcessRegistry when spawned', async () => {
        let pid = actor.spawn(
            actor.fromFunc(context => {})
        );

        let reff = processRegistry.Get(pid)
        assert.isDefined(reff)
        assert.isNotNull(reff)
    })
    
    it('should be removed from ProcessRegistry when stopped', async () => {
        let pid = actor.spawn(
            actor.fromFunc(context => {})
        );
        
        pid.Stop()
        
        let reff = processRegistry.Get(pid)
        assert.isUndefined(reff)
    })
    
    
})