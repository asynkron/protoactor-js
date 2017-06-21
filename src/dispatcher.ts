export class Dispatcher {
    throughput = 10;

    Schedule(fn: Function): void {
        fn()
    }

    GetThroughput(): number {
        return this.throughput
    }

    SetThroughput(t: number): void {
        this.throughput = t
    }
}