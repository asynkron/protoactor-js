import * as actor from "../src/actor";
import {PID} from "../src/pid"
import processRegistry from "../src/processRegistry"
import * as assert from "assert";
import * as messages from "../src/messages";

describe('actor', () => {

    it('should receive Started message when started', async () => {
        let received : any[] = []
        let pid = await actor.spawn(
            actor.fromFunc(context => {
                var msg = context.Message
                received.push(msg)
            })
        );
        assert.equal(received.length, 1)
        assert(received[0] instanceof messages.Started)
    })

    it('should receive message when using Tell', async () => {
        let received : any[] = []
        let pid = await actor.spawn(
            actor.fromFunc(context => {
                var msg = context.Message
                if (typeof(msg) === 'string') {
                    received.push(msg)
                }
            })
        );
        await pid.Tell('hello')
        assert.equal(received.length, 1)
        assert.equal(received[0], 'hello')
    })
    
    it('should respond with message when using RequestPromise', async () => {
        let pid = await actor.spawn(
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

    it('should be added to ProcessRegistry when spawned', async () => {
        let pid = await actor.spawn(
            actor.fromFunc(context => {})
        );
        pid.Stop()
        let reff = processRegistry.Get(pid)
        assert(!reff)
    })
    
    it('should be removed from ProcessRegistry when stopped', async () => {
        let pid = await actor.spawn(
            actor.fromFunc(context => {})
        );
        pid.Stop()
        let reff = processRegistry.Get(pid)
        assert(!reff)
    })
    
    
})