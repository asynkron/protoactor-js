"use strict"

var dispatcher = require('../src/dispatcher')

var messageCount = 1000000
var batchSize = 100
var tps = [300, 400, 500, 600, 700, 800, 900]
tps.forEach(t => {
    var d = new dispatcher.DefaultDispatcher()
    d.SetThroughput(t)

    var clientCount = 2
    var clients = []
    var echos = []
    
})