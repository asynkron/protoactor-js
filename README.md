# protoactor-js

Ultra-fast, distributed, cross-platform actors.

http://proto.actor/

## Source code
This is the JavaScript repository for Proto Actor.

Other implementations:
* Go: [https://github.com/AsynkronIT/protoactor-go](https://github.com/AsynkronIT/protoactor-go)
* .NET: [https://github.com/AsynkronIT/protoactor-dotnet](https://github.com/AsynkronIT/protoactor-dotnet)
* Python (unstable/WIP): [https://github.com/AsynkronIT/protoactor-python](https://github.com/AsynkronIT/protoactor-python)

## Disclaimer

This library is in a very early/draft state. There is no pipeline yet for building NPM packages, and the code is far from complete. That said, it is currently a functional prototype - several of the .NET examples (e.g. Hello world, Supervision, Behaviors, Remote activation) have been ported and are working.

## How to build and run

Requires Node 7.6.0+ and TypeScript.

```
> npm i
> tsc
> node dist/examples/helloWorld.js
```
