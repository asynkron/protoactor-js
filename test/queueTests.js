var assert = require("assert");
var timeAction = require("./timeAction");
var Queue = require('../src/queue')
var Queue2 = require('../src/queue2')

var queueTests = ctor => () => {
  var queueAction;
  beforeEach(() => queueAction = ctor())

  describe('enqueue', () => {
    it('should have 2000 K msg/s', () => assert(queueAction(q => q.enqueue("hello")) > 2000));
  });

  describe('dequeue', () => {
    beforeEach(() => queueAction(q => q.enqueue("hello")));

    it('should have 3000 K msg/s', () => assert(queueAction(q => q.dequeue()) > 3000))
  })
}
describe('queue', queueTests(() => timeAction(new Queue(), 1000 * 1000)));
describe('queue2', queueTests(() => timeAction(new Queue2(), 1000 * 1000)));