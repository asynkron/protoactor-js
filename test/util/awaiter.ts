import {Sleep} from "./sleep"

export class Awaiter {
    public promise: Promise<void>
    public resolve: () => void
    private isResolved: boolean = false
    constructor() {
        this.promise = new Promise<void>(resolve => {
            this.resolve = () => {
                resolve()
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