/*
  Adapted from Queue.js. Original license:

    A function to represent a queue

    Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
    the terms of the CC0 1.0 Universal legal code:

    http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

export interface IQueue {
  getLength(): number
  enqueue(item: any): void
  dequeue(): any;
  peek(): any;
  isEmpty(): boolean;
}

export class Queue implements IQueue {
  private queue: any[] = []
  private offset = 0

  getLength(): number {
    return this.queue.length - this.offset
  }
  enqueue(item: any) {
      this.queue.push(item)
  }
  dequeue() {
    if (this.queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = this.queue[this.offset];

    // increment the offset and remove the free space if necessary
    if (++this.offset * 2 >= this.queue.length) {
      this.queue = this.queue.slice(this.offset);
      this.offset = 0;
    }

    // return the dequeued item
    return item;
  }
  peek() {
    return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
  }
  isEmpty(): boolean {
    return this.queue.length == 0
  }
}