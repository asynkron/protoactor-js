var Queue = require('./queue')
var Queue2 = require('./queue2')

var c = 10*1000*1000
var q1 = new Queue()
var q2 = new Queue2()

function testEnqueue(q) {
    var hrstart = process.hrtime();
    for(var i=0;i<c;i++) {
        q.enqueue('hello')
    }
    var hr = process.hrtime(hrstart)
    var s = hr[0] + hr[1]/(1000*1000*1000)
    var t = c / s
    console.log('enq', t/1000, 'K msg/s')
}

function testDequeue(q) {
    var hrstart = process.hrtime();
    for(var i=0;i<c;i++) {
        q.dequeue()
    }
    var hr = process.hrtime(hrstart)
    var s = hr[0] + hr[1]/(1000*1000*1000)
    var t = c / s
    console.log('deq', t/1000, 'K msg/s')
}

console.log('queue1')
testEnqueue(q1)
testDequeue(q1)
console.log('queue2')
testEnqueue(q2)
testDequeue(q2)
