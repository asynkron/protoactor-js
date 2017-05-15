import { Dispatcher } from "../src/dispatcher";

var tps = [300, 400, 500, 600, 700, 800, 900]
tps.forEach(t => {
    var d = new Dispatcher()
    d.SetThroughput(t)
})
console.log("Done")