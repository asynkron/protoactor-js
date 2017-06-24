import {Sleep} from "./sleep"

export class Awaiter<T> {
    public promise: Promise<T>
    public resolve: (v?:T) => void
    private isResolved: boolean = false
    constructor() {
        this.promise = new Promise<T>(resolve => {
            this.resolve = (v) => {
                resolve(v)
                this.isResolved = true
            }
        })
    }
    public async isResolvedWithin(timeoutMs: number) {
        let t = 0
        await Sleep(timeoutMs)
        return this.isResolved
    }
}
