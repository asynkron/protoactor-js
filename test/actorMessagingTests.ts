import * as actor from "../src/actor"
import {PID} from "../src/pid"
import processRegistry from "../src/processRegistry"
import * as messages from "../src/messages"

import {assert, expect, use as chaiUse} from "chai"
import * as chaiAsPromised from "chai-as-promised"

import {Awaiter} from "./util/awaiter"

chaiUse(chaiAsPromised)

describe('actor messaging', () => {

    it('should receive Started message when started', async () => {
        let received : any[] = []
        let aw = new Awaiter()
        
        actor.spawn(
            actor.fromFunc(async context => {
                var msg = context.Message
                if (msg instanceof messages.Started) {
                    received.push(msg)
                    aw.resolve()
                }
            })
        )

        await aw.promise
        assert.equal(received[0], messages.Started.Instance)
    })

    it('should receive Stopping and Stopped message when stopped', async () => {
        let received : any[] = []
        let aw = new Awaiter()
        let pid = actor.spawn(
            actor.fromFunc(async context => {
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
        assert.equal(received[0], messages.Stopping.Instance)
        assert.equal(received[1], messages.Stopped.Instance)
    })

    it('should receive message when using Tell', async () => {
        let received : any[] = []
        let aw = new Awaiter()
        let pid = actor.spawn(
            actor.fromFunc(async context => {
                var msg = context.Message
                if (typeof(msg) === 'string') {
                    received.push(msg)
                    aw.resolve()
                }
            })
        );

        pid.Tell('hello')
        
        await aw.promise
        assert.equal(received[0], 'hello')
    })
    
    it('should respond with message when using RequestPromise', async () => {
        let pid = actor.spawn(
            actor.fromFunc(async context => {
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
            actor.fromFunc(async context => { })
        );

        let p = pid.RequestPromise('hello', 10)
        
        await assert.isRejected(p)
    })

    it('should be added to ProcessRegistry when spawned', async () => {
        let pid = actor.spawn(
            actor.fromFunc(async context => {})
        );

        let reff = processRegistry.Get(pid)
        assert.isDefined(reff)
        assert.isNotNull(reff)
    })
    
    it('should be removed from ProcessRegistry when stopped', async () => {
        let pid = actor.spawn(
            actor.fromFunc(async context => {})
        );
        
        pid.Stop()
        
        let reff = processRegistry.Get(pid)
        assert.isUndefined(reff)
    })
    
    
})