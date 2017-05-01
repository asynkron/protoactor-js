import {IQueue} from "./queue";

export class Queue2 implements IQueue {
    private buffer: any[] = [];
    private head = 0;
    private tail = 0;
    private dequeuePromise: Promise<any> | null;
    
    private dequeuePromiseResolve: () => void;
    private dequeuePromiseReject: () => void;

    enqueue = (o: any) => {
        this.buffer[this.head++] = o
        if (this.head == this.buffer.length) {
            if (!this.dequeuePromise) {
                this.dequeuePromise = new Promise((resolve, reject) => {
                    this.dequeuePromiseResolve = resolve;
                    this.dequeuePromiseReject = reject;
                })
            }
            return this.dequeuePromise
        }
        return Promise.resolve()
    }

    dequeue = () => {
        if (this.tail == this.head) 
            return undefined;
        var item = this.buffer[this.tail++];
        this.dequeuePromise = null;
        this.dequeuePromiseResolve()
        return item
    }

    getLength = () => this.head - this.tail;

    isEmpty = () => this.getLength() == 0;

    peek = () => (this.buffer.length > 0 ? this.buffer[this.tail] : undefined);
    
    _reconstruct = () => {
        this.buffer = this.buffer.slice(this.tail).concat(new Array(this.getLength()*2))
        this.head -= this.tail
        this.tail = 0
    }
}