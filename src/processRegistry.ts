import { PID } from "./pid";
import { IProcess } from "./process";

export type IProcessResolver = (pid: PID) => IProcess;
export class ProcessRegistry {
    private localActorRefs: { [Id: string]: any } = {};
    private counter = 0;
    private hostResolvers: IProcessResolver[] = [];
    public Address = "nonhost";
    Get(pid: PID) {
        if (pid.Address != "nonhost" && pid.Address != this.Address) {
            for(let resolver of this.hostResolvers) {
                let ref = resolver(pid)
                if (ref) {
                    return ref
                }
            }
            throw "Unknown host"
        }
        return this.localActorRefs[pid.Id] // todo - deadletter
    }

    TryAdd(id: string, ref: IProcess) {
        var pid = new PID(this.Address, id);
        this.localActorRefs[pid.Id] = ref;
        return pid;
    }

    NextId() {
        return "$" + this.counter++
    }

    Remove(pid: PID) {
        this.localActorRefs[pid.Id] = undefined
    }
    RegisterHostResolver(resolver: IProcessResolver) {
        this.hostResolvers.push(resolver)
    }

}
const processRegistry = new ProcessRegistry();

export default processRegistry;
