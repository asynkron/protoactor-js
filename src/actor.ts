import { Props } from "./props";
import processRegistry from "./processRegistry";
import { IContext } from "./localContext";
import { PID } from "./pid";
import { Message } from "./messages"
import { ISupervisor } from "./supervision";
import { RestartStatistics } from "./restartStatistics";

export function fromFunc(fn: (context: IContext) => void): Props {
    return fromProducer(() => new EmptyActor(fn))
}

export function fromProducer(fn: () => IActor): Props {
    return new Props().WithProducer(fn)
}

export function spawn(props: Props): PID {
    var name = processRegistry.NextId()
    return spawnNamed(props, name)
}

export function spawnPrefix(props: Props, prefix: string): PID {
    var name = prefix + processRegistry.NextId()
    return spawnNamed(props, name)
}

export function spawnNamed(props: Props, name: string): PID {
    return props.Spawn(name)
}

class EmptyActor implements IActor {
    constructor(private fn: (context: IContext) => void) { }

    async Receive(context: IContext) {
        this.fn(context)
    }
}
export interface IActor {
    Receive(context: IContext): Promise<void>;
}

export const done = Promise.resolve();