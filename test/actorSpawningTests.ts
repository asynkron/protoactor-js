import * as actor from "../src/actor"
import {IContext} from "../src/localContext"
import {PID} from "../src/pid"
import processRegistry from "../src/processRegistry"
import * as messages from "../src/messages"

import {assert, expect, use as chaiUse} from "chai"
import * as chaiAsPromised from "chai-as-promised"

import {Awaiter} from "./util/awaiter"

chaiUse(chaiAsPromised)

describe('actor spawning', () => {
    
    it('should spawn actor from function', () => {
        let pid = actor.spawn(
            actor.fromFunc(async context => {})
        )

        assert.isDefined(pid)
        assert.isNotNull(pid)
    })

    it('should spawn actor from producer', () => {
        let producer = () => {
            return {
                receive: async (context: IContext) => {
                }
            }
        }

        let pid = actor.spawn(
            actor.fromFunc(async context => {})
        )

        assert.isDefined(pid)
        assert.isNotNull(pid)
    })

    it('should spawn actor with prefix', () => {
        let pid = actor.spawnPrefix(
            actor.fromFunc(async context => {}),
            'test'
        )

        assert.isDefined(pid)
        assert.isNotNull(pid)
        assert.isTrue(pid.Id.startsWith('test'), 'PID Id should start with test')
    })

    it('should spawn actor with name', () => {
        let pid = actor.spawnNamed(
            actor.fromFunc(async context => {}),
            'test'
        )

        assert.isDefined(pid)
        assert.isNotNull(pid)
        assert.equal(pid.Id, 'test')
    })
})