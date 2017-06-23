export class Awaiter {
    public promise: Promise<void>
    public resolve: () => void
    constructor() {
        this.promise = new Promise<void>(resolve => {
            this.resolve = resolve
        })
    }
}