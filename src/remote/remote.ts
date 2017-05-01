import * as grpc from "grpc";
import * as pb from "google-protobuf";
import * as messages from "../messages";
import { remoteMessages } from "./remote_pb";
import { services } from "./remote_grpc_pb";
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

// TODO: Should be generated from *.proto ?
interface IMessageBatch {
    getTargetNamesList(): string[];
    getTypeNamesList(): string[];
    getEnvelopesList(): IEnvelope[];
}
interface IEnvelope{
    getTarget(): number;
    getSender(): PID;
    getTypeId(): number;
    getMessageData(): number[];
}
class EndpointReader {
    Receive(call: { on(event: string, cb: (batch: IMessageBatch) => void): void }) {
        let self = this
        call.on('data', messageBatch => self._processMessageBatch(messageBatch))
    }

    _processMessageBatch(messageBatch: IMessageBatch) {
        let targetNames = messageBatch.getTargetNamesList()
        let typeNames = messageBatch.getTypeNamesList()
        let envelopes = messageBatch.getEnvelopesList()

        for (let i = 0; i < envelopes.length; i++) {
            let envelope = envelopes[i]
            let targetName = targetNames[envelope.getTarget()]
            
            // was PID.New, this doesnt exist. If its realy supposed to be undefined as Ref, PID wont do much good?
            let target = new PID(processRegistry.Address, targetName)
            let sender = envelope.getSender()
            let typeName = typeNames[envelope.getTypeId()]
            let message = remote.Serialization.Deserialize(typeName, envelope.getMessageData())
            // todo - handle Terminated and SystemMessages
            target.Request(message, sender)
        }
    }
}

class EndpointManager {
    
    connections: {[adress: string]: Endpoint } = {}
    Receive(context: LocalContext) {
        let msg = context.Message
        // todo - handle EndpointTerminatedEvent, RemoteTerminate, RemoteWatch, RemoteUnwatch
        if (msg instanceof RemoteDeliver) {
            let ep = this._ensureConnected(msg.Target.Address, context)
            ep.Writer.Tell(msg)
        }
    }

    _ensureConnected(address: string, context: LocalContext) {
        let ep = this.connections[address]
        if (!ep) {
            let writer = this._spawnWriter(address, context)
            let watcher = this._spawnWatcher(address, context)
            ep = new Endpoint(writer, watcher)
            this.connections[address] = ep
        }
        return ep
    }

    _spawnWriter(address: string, context: LocalContext) {
        let props = actor.fromProducer(() => new EndpointWriter(address))
            .WithMailbox(() => new EndpointWriterMailbox(1000))
        let writer = actor.spawn(props)
        return writer
    }

    _spawnWatcher(address: string, context: LocalContext) {
        // todo
        return null
    }
}

class EndpointWriter implements actor.IActor {
    ToShortString(): string {
        throw new Error('Method not implemented.');
    }
    Tell(message: messages.Message): void {
        throw new Error('Method not implemented.' + message);
    }

    constructor(private address: string) {
        
    }

    async Receive(context: LocalContext) {
        let message = context.Message
        if (message === messages.Started) {
            await this._started()
        }
        if (message instanceof RemoteDeliverArray) {
            let messageBatch = new remoteMessages.MessageBatch()
            let targetIds: {[targetName: string]: number} = {}
            let targetNames = []

            for (let rd of message) {
                let targetName = rd.Target.Id
                if (targetNames.indexOf(targetName) < 0) {
                    targetIds[targetName] = targetNames.length
                    targetNames.push(targetName)
                }
                let targetId = targetIds[targetName]
                
                console.error("Not implemented, " + targetId);
                //let typeName = get type name from protobuf?
            }
            await this._sendEnvelopes(messageBatch, context)
        }
    }

    private client: IRemotingClient;
    async _started() {
        this.client = new services.RemotingClient(this.address, grpc.credentials.createInsecure())
    }

    async _sendEnvelopes(messageBatch: IMessageBatch, context: LocalContext) {

    }
}
interface IRemotingClient {

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

class Activator {
    Receive(context: LocalContext) {
        let msg = context.Message
        if (msg instanceof remoteMessages.ActorPidRequest) {
            let props = remote.GetKnownKind(msg.getKind())
            let name = msg.getName()
            if (!name) {
                name = processRegistry.NextId()
            }
            let pid = actor.spawnNamed(props, name)
            let response = new remoteMessages.ActorPidResponse()
            response.setPid(pid)
            context.Respond(response)
        }
    }
}

class RemoteProcess implements IProcess {
    Stop(pid?: PID): void {
        throw new Error('Method not implemented.');
    }

    SendUserMessage(pid: PID, message: messages.Message, sender?: PID) {
        this._send(pid, message, sender)
    }

    SendSystemMessage(pid: PID, message: messages.Message) {
        this._send(pid, message)
    }

    _send(pid: PID, message: messages.Message, sender?: PID) {
        // todo - handle watch/unwatch

        if (message instanceof pb.Message) {
            let env = new RemoteDeliver(pid, message, sender)
            remote.EndpointManager.Tell(env)
        } else {
            throw 'Message is not a protobuf message'
        }
    }
}

class RemoteDeliver {
    constructor(public Target: PID, public Message: messages.Message, public Sender?: PID) {

    }
}

class Remote {
    kinds: { [kind: string]: Props } = {}
    Serialization = new Serialization()
    EndpointManager: PID;
    Activator: PID;
    Start(host: string, port: number) {
        let addr = host + ':' + port
        processRegistry.RegisterHostResolver(pid => new RemoteProcess())

        let server = new grpc.Server()
        let endpointReader = new EndpointReader()
        server.addService(services.RemotingService, {
            receive: endpointReader.Receive.bind(endpointReader)
        })
        server.bind(addr, grpc.ServerCredentials.createInsecure())
        server.start()

        processRegistry.Address = addr

        this.EndpointManager = actor.spawn(actor.fromProducer(() => new EndpointManager()))
        this.Activator = actor.spawnNamed(actor.fromProducer(() => new Activator()), "activator")
    }

    GetKnownKind(kind: string) {
        return this.kinds[kind]
    }

    RegisterKnownKind(kind: string, props: Props) {
        this.kinds[kind] = props
    }
}

type Parser = { deserializeBinary(bytes: number[]): object }
class Serialization {
    private typeLookup: { [index: string]: Parser } = {}

    RegisterTypes(packageName: string, types) {
        let keys = Object.keys(types)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let typeName = packageName + '.' + key
            let type = types[key]
            this.typeLookup[typeName] = type
        }
    }

    Deserialize(typeName: string, bytes: number[]) {
        let parser = this.typeLookup[typeName]
        let o = parser.deserializeBinary(bytes)
        return o
    }
}

let remote = new Remote()
remote.Serialization.RegisterTypes('remote', remoteMessages)
module.exports = remote

// test
//remote.Start('localhost', 12000)