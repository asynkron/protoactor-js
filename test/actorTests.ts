import * as actor from "../src/actor";
import {PID} from "../src/pid"
import processRegistry from "../src/processRegistry"
import * as assert from "assert";

describe('actor', () => {
    it('should receive message when using Tell', async () => {
        let received : any[] = []
        let p = new Promise(resolve => {
            let pid = actor.spawn(
                actor.fromFunc(context => {
                    var msg = context.Message
                    if (typeof(msg) === 'string') {
                        received.push(msg)
                        resolve(msg)
                    }
                })
            );
            pid.Tell('hello')
        })
        await p
        assert.equal(received.length, 1)
        assert.equal(received[0], 'hello')
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

    it('should be added to ProcessRegistry when spawned', async () => {
        let pid = actor.spawn(
            actor.fromFunc(context => {})
        );
        pid.Stop()
        let reff = processRegistry.Get(pid)
        assert(!reff)
    })
    
    it('should be removed from ProcessRegistry when stopped', async () => {
        let pid = actor.spawn(
            actor.fromFunc(context => {})
        );
        pid.Stop()
        let reff = processRegistry.Get(pid)
        assert(!reff)
    })
    
    
})