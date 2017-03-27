# protoactor-js

Ultra-fast, distributed, cross-platform actors.

## Disclaimer

This repo is in a very early phase of development. A lot of the core functionality works, but there's a lot of stuff left to do until this can be considered production-ready.

## Source code

This is the JavaScript repository for Proto Actor.

At the moment development is focused towards Node.js, but exploring actors in the browser is definitely of interest as well.

Other implementations:
* Go: [https://github.com/AsynkronIT/protoactor-go](https://github.com/AsynkronIT/protoactor-go)
* .NET: [https://github.com/AsynkronIT/protoactor-dotnet](https://github.com/AsynkronIT/protoactor-dotnet)
* Python (unstable/WIP): [https://github.com/AsynkronIT/protoactor-python](https://github.com/AsynkronIT/protoactor-python)

## Getting started

The code relies heavily on ECMAScript 6, in particular the class and async/await features. Using it therefore currently requires Node.js 7.6.0 or later. Given that, getting started should be trivial.

E.g. to run the "hello world" example - simply execute:
`node examples/helloWorld.js`

### Hello world example

Define a message type:

```js
class Hello {
    constructor(who) {
        this.Who = who
    }
}
```

Define an actor:
```js
var props = actor.fromFunc(context => {
    var msg = context.Message
    if (msg instanceof Hello) {
        console.log('Hello', msg.Who)
    }
});
```

Spawn it and send a message to it:
```js
var pid = actor.spawn(props);
pid.Tell(new Hello("Christian"))
```

You should see the output `Hello Christian`.