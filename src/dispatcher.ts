export class Dispatcher {
    throughput = 10;

    constructor() {
        
    }

    Schedule(fn: Function) {
        fn()
    }

    GetThroughput() {
        return this.throughput
    }

    SetThroughput(t: number) {
        this.throughput = t
    }
}