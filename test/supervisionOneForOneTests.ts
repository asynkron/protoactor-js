import * as actor from "../src/actor"
import {IContext} from "../src/localContext"
import {Props} from "../src/props"
import {PID} from "../src/pid"
import processRegistry from "../src/processRegistry"
import * as messages from "../src/messages"
import * as supervision from "../src/supervision"
import * as mailbox from "../src/mailbox"

import {assert, expect, use as chaiUse} from "chai"
import * as chaiAsPromised from "chai-as-promised"

import {Awaiter} from "./util/awaiter"
import {Sleep} from "./util/sleep"

chaiUse(chaiAsPromised)

class ParentActor implements actor.IActor {
    private child: PID
    constructor(private childProps: Props) {}
    Receive(context: IContext): Promise<void> {
        let msg = context.Message
        if (msg instanceof messages.Started)
            this.child = context.Spawn(this.childProps)
        if (typeof(msg) == 'string')
            this.child.Tell(msg)
        return actor.done
    }
}

class ChildActor implements actor.IActor {
    constructor(private awaiter: Awaiter) {}
    Receive(context: IContext): Promise<void> {
        switch (context.Message) {
            case 'die':
                throw 'BOOM'
            case 'hello again':
                this.awaiter.resolve()            
        }
        return actor.done
    }
}

class TestMailboxStatistics implements mailbox.IStatistics {
    public Posted: any[] = []
    public Received: any[] = []
    UserMessagePosted(message: messages.Message) {
        this.Posted.push(message)
    }
    SystemMessagePosted(message: messages.Message) {
        this.Posted.push(message)
    }
    MailboxStarted() {}
    MailboxEmpty() {}
}

describe('one-for-one supervision', () => {

    it('should resume child on failure', async () => {
        let childMailboxStats = new TestMailboxStatistics()
        let aw = new Awaiter()
        let strategy = new supervision.OneForOneStrategy((reason: any, who: PID) => { return supervision.SupervisorDirective.Resume }, 1)
        let childProps = actor.fromProducer(() => new ChildActor(aw))
            .WithMailbox(() => mailbox.Unbounded(childMailboxStats))
        let parentProps = actor.fromProducer(() => new ParentActor(childProps))
            .WithSupervisor(strategy)
        let parent = actor.spawn(parentProps)

        parent.Tell('die')
        parent.Tell('hello again')

        await aw.promise

        assert.equal(childMailboxStats.Posted[0], messages.Started.Instance)
        assert.equal(childMailboxStats.Posted[1], 'die')
        assert.equal(childMailboxStats.Posted[2], messages.SuspendMailbox.Instance)
        assert.equal(childMailboxStats.Posted[3], messages.ResumeMailbox.Instance)
        assert.equal(childMailboxStats.Posted[4], 'hello again')
    })
})