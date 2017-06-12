let grpc = require('grpc')
import * as pb from "google-protobuf";
import * as messages from "../messages";
import * as remoteProto from "./remote_pb";
import processRegistry from "../processRegistry";
import { IProcess } from "../process";
import * as actor from "../actor";
import { PID } from "../pid";
import { Queue, IQueue } from "../queue";
import { Props } from "../props";
import { LocalContext } from "../localContext";
import { IMessageInvoker } from "../invoker";
import { Dispatcher } from "../dispatcher";
import { IMailbox } from "../mailbox";
import * as protobuf from "protobufjs";

// TODO: Should be generated from *.proto ?
class EndpointReader {
    Receive(call: { on(event: string, cb: (batch: remoteProto.remote.MessageBatch) => void): void }) {
        let self = this
        call.on('data', messageBatch => self._processMessageBatch(messageBatch))
    }

    _processMessageBatch(messageBatch: remoteProto.remote.MessageBatch) {
        let targetNames = messageBatch.targetNames
        let typeNames = messageBatch.typeNames
        let envelopes = messageBatch.envelopes

        for (let i = 0; i < envelopes.length; i++) {
            let envelope = envelopes[i]
            if (envelope.messageData==undefined || envelope.sender==undefined || envelope.target==undefined || envelope.typeId==undefined) {
                console.error('Invalid envelope!')
                continue;
            }
            let targetName = targetNames[envelope.target || 0]
            
            let target = new PID(processRegistry.Address, targetName)
            let sender = new PID(envelope.sender.Address || '', envelope.sender.Id || '')
            let typeName = typeNames[envelope.typeId || 0]

            let message = Serialization.Deserialize(typeName, envelope.messageData||new Uint8Array(0))
            // todo - handle Terminated and SystemMessages
            target.Request(message, sender)
        }
    }
}

class EndpointManager implements actor.IActor {
    
    connections: {[adress: string]: Endpoint } = {}
    async Receive(context: LocalContext) {
        let msg = context.Message
        // todo - handle EndpointTerminatedEvent, RemoteTerminate, RemoteWatch, RemoteUnwatch
        if (msg instanceof RemoteDeliver) {
            let ep = await this._ensureConnected(msg.Target.Address, context)
            ep.Writer.Tell(msg)
        }
    }

    async _ensureConnected(address: string, context: LocalContext) {
        let ep = this.connections[address]
        if (!ep) {
            let writer = await this._spawnWriter(address, context)
            let watcher = await this._spawnWatcher(address, context)
            ep = new Endpoint(writer, watcher)
            this.connections[address] = ep
        }
        return ep
    }

    async _spawnWriter(address: string, context: LocalContext) {
        let props = actor.fromProducer(() => new EndpointWriter(address))
            .WithMailbox(() => new EndpointWriterMailbox(1000))
        let writer = await actor.spawn(props)
        return writer
    }

    async _spawnWatcher(address: string, context: LocalContext) {
        // todo
        return null
    }
}

class EndpointWriter implements actor.IActor {
    private client: any;
    private call: any;
    constructor(private address: string) {
        
    }

    async Receive(context: LocalContext) {
        let message = context.Message
        if (message instanceof messages.Started) {
            await this._started()
        }
        if (message instanceof RemoteDeliverArray) {
            let targetIds: {[targetName: string]: number} = {}
            let targetNames = []
            let typeIds: {[typeName: string]: number} = {}
            let typeNames = []
            let batch = new remoteProto.remote.MessageBatch()

            for (let rd of message) {
                let targetName = rd.Target.Id
                if (batch.targetNames.indexOf(targetName) < 0) {
                    targetIds[targetName] = targetNames.length
                    batch.targetNames.push(targetName)
                }
                let targetId = targetIds[targetName]
                
                //let typeName = rd.constructor.name;
                let typeName = Serialization.LookupTypeName(rd.Message)
                if (batch.typeNames.indexOf(typeName) < 0) {
                    typeIds[typeName] = typeNames.length
                    batch.typeNames.push(typeName)
                }
                let typeId = typeIds[typeName]

                let bytes = Serialization.Serialize(rd.Message)
                let envelope = new remoteProto.remote.MessageEnvelope()
                batch.envelopes.push({
                    messageData: bytes,
                    sender: rd.Sender || new PID('', ''),
                    target: targetId,
                    typeId: typeId
                })
            }
                        
            await this._sendEnvelopes(batch, context)
        }
    }

    async _started() {
        //let rpcImpl = new protobuf.Service('Remoting')        
        this.client = new RemoteClient(this.address, grpc.credentials.createInsecure())
        this.call = this.client.receive()
    }

    async _sendEnvelopes(messageBatch: remoteProto.remote.MessageBatch, context: LocalContext) {
        this.call.write(messageBatch)
    }
}
class RemoteDeliverArray extends Array<RemoteDeliver> {
}

class EndpointWriterMailbox implements IMailbox {
    running: boolean;
    systemMessageQueue: IQueue = new Queue()
    userMessageQueue: IQueue = new Queue()
    constructor(private batchSize: number) {

    }

    async PostUserMessage(message: messages.Message) {
        await this.userMessageQueue.enqueue(message)
        this.processMessages()
    }

    async PostSystemMessage(message: messages.Message) {
        await this.systemMessageQueue.enqueue(message)
        this.processMessages()
    }
    private invoker: IMessageInvoker;
    private dispatcher: Dispatcher;
    RegisterHandlers(invoker: IMessageInvoker, dispatcher: Dispatcher) {
        this.invoker = invoker
        this.dispatcher = dispatcher
    }

    Start() {
    }

    async processMessages() {
        if (this.running) return

        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule()
        }
    }

    schedule() {
        this.running = true;
        this.dispatcher.Schedule(this.run.bind(this));
    }

    async run() {
        let batch = new RemoteDeliverArray()

        let sys = this.systemMessageQueue.dequeue()
        if (sys != undefined) {
            await this.invoker.InvokeSystemMessage(sys)
        }

        while (batch.length < this.batchSize) {
            let msg = this.userMessageQueue.dequeue()
            if (!msg)
                break
            batch.push(msg)
        }
        await this.invoker.InvokeUserMessage(batch)

        this.running = false;
        if (!this.systemMessageQueue.isEmpty() || !this.userMessageQueue.isEmpty()) {
            this.schedule();
        }
    }
}

class Endpoint {
    constructor(public Writer: PID, public Watcher: null) {

    }
}

class Activator implements actor.IActor {
    async Receive(context: LocalContext) {
        let msg = context.Message
        if (msg instanceof remoteProto.remote.ActorPidRequest) {
            let props = Remote.GetKnownKind(msg.kind)
            let name = msg.name
            if (!name) {
                name = processRegistry.NextId()
            }
            let pid = actor.spawnNamed(props, name)
            let response = new remoteProto.remote.ActorPidResponse({
                pid: pid
            })
            context.Respond(response)
        }
    }
}

class RemoteProcess implements IProcess {
    Stop(pid?: PID): void {
        throw new Error('Method not implemented.');
    }

    SendUserMessage(pid: PID, message: any, sender?: PID) {
        this._send(pid, message, sender)
    }

    SendSystemMessage(pid: PID, message: any) {
        this._send(pid, message)
    }

    _send(pid: PID, message: any, sender?: PID) {
        // todo - handle watch/unwatch
        let env = new RemoteDeliver(pid, message, sender)
        Remote.EndpointManager.Tell(env)
    }
}

class RemoteDeliver {
    constructor(public Target: PID, public Message: any, public Sender?: PID) {

    }
}

var RemoteService =  {
  // Sends a greeting
  receive: {
    path: '/remote.Remoting/Receive',
    requestStream: true,
    responseStream: true,
    requestType: remoteProto.remote.MessageBatch,
    responseType: remoteProto.remote.Unit,
    requestSerialize: (message: remoteProto.remote.MessageBatch$Properties) => { 
        let writer = remoteProto.remote.MessageBatch.encode(message)
        return writer.finish()
    },
    requestDeserialize: remoteProto.remote.MessageBatch.decode,
    responseSerialize: (message: remoteProto.remote.Unit$Properties) => { 
        let writer = remoteProto.remote.Unit.encode(message)
        return writer.finish()
    },
    responseDeserialize: remoteProto.remote.Unit.decode,
  },
};
var RemoteClient = grpc.makeGenericClientConstructor(RemoteService)

export class Remote {
    static kinds: { [kind: string]: Props } = {}
    static EndpointManager: PID;
    static Activator: PID;
    static async Start(host: string, port: number) {
        let addr = host + ':' + port
        processRegistry.RegisterHostResolver(pid => new RemoteProcess())

        let server = new grpc.Server()
        let endpointReader = new EndpointReader()
        server.addService(RemoteService, {
            receive: endpointReader.Receive.bind(endpointReader)
        })
        server.bind(addr, grpc.ServerCredentials.createInsecure())
        server.start()

        processRegistry.Address = addr

        this.EndpointManager = await actor.spawn(actor.fromProducer(() => new EndpointManager()))
        this.Activator = await actor.spawnNamed(actor.fromProducer(() => new Activator()), "activator")
    }

    static GetKnownKind(kind: string) {
        return this.kinds[kind]
    }

    static RegisterKnownKind(kind: string, props: Props) {
        this.kinds[kind] = props
    }
}

type Parser = { deserializeBinary(bytes: number[]): object }
export class Serialization {
    private static typeLookup: { [index: string]: any } = {}

    static RegisterTypes(packageName: string, types: any) {
        let keys = Object.keys(types)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let type = types[key]
            let typeName = packageName + '.' + type.name
            this.typeLookup[typeName] = type
        }
    }

    static Deserialize(typeName: string, bytes: Uint8Array) {
        let parser = this.typeLookup[typeName]
        let reader = protobuf.Reader.create(bytes)
        let o = parser.decode(reader)
        return o
    }

    static LookupTypeName(type: any) : string {
        let i = Object.values(this.typeLookup).indexOf(type.constructor)
        let typeName = Object.keys(this.typeLookup)[i]
        return typeName
    }

    static Serialize(message: any) : Uint8Array {
        let encoder = message.constructor.encode
        let writer = encoder(message)
        let buffer = writer.finish()
        return buffer
    }
}

Serialization.RegisterTypes('remote', remoteProto.remote)

// test
//remote.Start('localhost', 12000)