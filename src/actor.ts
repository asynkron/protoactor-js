import { Props } from "./props";
import processRegistry from "./processRegistry";
import { LocalContext } from "./localContext";
import { PID } from "./pid";
import { Message } from "./messages"
import { ISupervisor } from "./supervision";
import { RestartStatistics } from "./restartStatistics";

export function fromFunc(fn: (context: LocalContext) => void) {
    return fromProducer(() => new EmptyActor(fn))
}

export function fromProducer(fn: () => IActor) {
    return new Props().WithProducer(fn)
}

export function spawn(props: Props): PID {
    var name = processRegistry.NextId()
    return spawnNamed(props, name)
}

export function spawnPrefix(props: Props, prefix: string) {
    var name = prefix + processRegistry.NextId()
    return spawnNamed(props, name)
}

export function spawnNamed(props: Props, name: string) {
    return props.Spawn(name)
}

class EmptyActor implements IActor {
    constructor(private fn: (context: LocalContext) => void) { }

    Receive(context: LocalContext) {
        this.fn(context)
    }
}
export interface IActor {
    Receive(context: LocalContext): void;
}

export const done = Promise.resolve();