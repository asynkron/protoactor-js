import * as $protobuf from "protobufjs";

/**
 * Namespace remote.
 * @exports remote
 * @namespace
 */
export namespace remote {

    type MessageBatch$Properties = {
        typeNames?: string[];
        targetNames?: string[];
        envelopes?: remote.MessageEnvelope$Properties[];
    };

    /**
     * Constructs a new MessageBatch.
     * @exports remote.MessageBatch
     * @constructor
     * @param {remote.MessageBatch$Properties=} [properties] Properties to set
     */
    class MessageBatch {

        /**
         * Constructs a new MessageBatch.
         * @exports remote.MessageBatch
         * @constructor
         * @param {remote.MessageBatch$Properties=} [properties] Properties to set
         */
        constructor(properties?: remote.MessageBatch$Properties);

        /**
         * MessageBatch typeNames.
         * @type {Array.<string>}
         */
        public typeNames: string[];

        /**
         * MessageBatch targetNames.
         * @type {Array.<string>}
         */
        public targetNames: string[];

        /**
         * MessageBatch envelopes.
         * @type {Array.<remote.MessageEnvelope$Properties>}
         */
        public envelopes: remote.MessageEnvelope$Properties[];

        /**
         * Creates a new MessageBatch instance using the specified properties.
         * @param {remote.MessageBatch$Properties=} [properties] Properties to set
         * @returns {remote.MessageBatch} MessageBatch instance
         */
        public static create(properties?: remote.MessageBatch$Properties): remote.MessageBatch;

        /**
         * Encodes the specified MessageBatch message. Does not implicitly {@link remote.MessageBatch.verify|verify} messages.
         * @param {remote.MessageBatch$Properties} message MessageBatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: remote.MessageBatch$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageBatch message, length delimited. Does not implicitly {@link remote.MessageBatch.verify|verify} messages.
         * @param {remote.MessageBatch$Properties} message MessageBatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: remote.MessageBatch$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageBatch message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.MessageBatch} MessageBatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.MessageBatch;

        /**
         * Decodes a MessageBatch message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.MessageBatch} MessageBatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.MessageBatch;

        /**
         * Verifies a MessageBatch message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a MessageBatch message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageBatch} MessageBatch
         */
        public static fromObject(object: { [k: string]: any }): remote.MessageBatch;

        /**
         * Creates a MessageBatch message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.MessageBatch.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageBatch} MessageBatch
         */
        public static from(object: { [k: string]: any }): remote.MessageBatch;

        /**
         * Creates a plain object from a MessageBatch message. Also converts values to other types if specified.
         * @param {remote.MessageBatch} message MessageBatch
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: remote.MessageBatch, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this MessageBatch message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageBatch to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type MessageEnvelope$Properties = {
        typeId?: number;
        messageData?: Uint8Array;
        target?: number;
        sender?: actor.PID$Properties;
    };

    /**
     * Constructs a new MessageEnvelope.
     * @exports remote.MessageEnvelope
     * @constructor
     * @param {remote.MessageEnvelope$Properties=} [properties] Properties to set
     */
    class MessageEnvelope {

        /**
         * Constructs a new MessageEnvelope.
         * @exports remote.MessageEnvelope
         * @constructor
         * @param {remote.MessageEnvelope$Properties=} [properties] Properties to set
         */
        constructor(properties?: remote.MessageEnvelope$Properties);

        /**
         * MessageEnvelope typeId.
         * @type {number}
         */
        public typeId: number;

        /**
         * MessageEnvelope messageData.
         * @type {Uint8Array}
         */
        public messageData: Uint8Array;

        /**
         * MessageEnvelope target.
         * @type {number}
         */
        public target: number;

        /**
         * MessageEnvelope sender.
         * @type {(actor.PID$Properties|null)}
         */
        public sender: (actor.PID$Properties|null);

        /**
         * Creates a new MessageEnvelope instance using the specified properties.
         * @param {remote.MessageEnvelope$Properties=} [properties] Properties to set
         * @returns {remote.MessageEnvelope} MessageEnvelope instance
         */
        public static create(properties?: remote.MessageEnvelope$Properties): remote.MessageEnvelope;

        /**
         * Encodes the specified MessageEnvelope message. Does not implicitly {@link remote.MessageEnvelope.verify|verify} messages.
         * @param {remote.MessageEnvelope$Properties} message MessageEnvelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: remote.MessageEnvelope$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageEnvelope message, length delimited. Does not implicitly {@link remote.MessageEnvelope.verify|verify} messages.
         * @param {remote.MessageEnvelope$Properties} message MessageEnvelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: remote.MessageEnvelope$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageEnvelope message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.MessageEnvelope} MessageEnvelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.MessageEnvelope;

        /**
         * Decodes a MessageEnvelope message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.MessageEnvelope} MessageEnvelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.MessageEnvelope;

        /**
         * Verifies a MessageEnvelope message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a MessageEnvelope message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageEnvelope} MessageEnvelope
         */
        public static fromObject(object: { [k: string]: any }): remote.MessageEnvelope;

        /**
         * Creates a MessageEnvelope message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.MessageEnvelope.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageEnvelope} MessageEnvelope
         */
        public static from(object: { [k: string]: any }): remote.MessageEnvelope;

        /**
         * Creates a plain object from a MessageEnvelope message. Also converts values to other types if specified.
         * @param {remote.MessageEnvelope} message MessageEnvelope
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: remote.MessageEnvelope, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this MessageEnvelope message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageEnvelope to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type ActorPidRequest$Properties = {
        name?: string;
        kind?: string;
    };

    /**
     * Constructs a new ActorPidRequest.
     * @exports remote.ActorPidRequest
     * @constructor
     * @param {remote.ActorPidRequest$Properties=} [properties] Properties to set
     */
    class ActorPidRequest {

        /**
         * Constructs a new ActorPidRequest.
         * @exports remote.ActorPidRequest
         * @constructor
         * @param {remote.ActorPidRequest$Properties=} [properties] Properties to set
         */
        constructor(properties?: remote.ActorPidRequest$Properties);

        /**
         * ActorPidRequest name.
         * @type {string}
         */
        public name: string;

        /**
         * ActorPidRequest kind.
         * @type {string}
         */
        public kind: string;

        /**
         * Creates a new ActorPidRequest instance using the specified properties.
         * @param {remote.ActorPidRequest$Properties=} [properties] Properties to set
         * @returns {remote.ActorPidRequest} ActorPidRequest instance
         */
        public static create(properties?: remote.ActorPidRequest$Properties): remote.ActorPidRequest;

        /**
         * Encodes the specified ActorPidRequest message. Does not implicitly {@link remote.ActorPidRequest.verify|verify} messages.
         * @param {remote.ActorPidRequest$Properties} message ActorPidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: remote.ActorPidRequest$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActorPidRequest message, length delimited. Does not implicitly {@link remote.ActorPidRequest.verify|verify} messages.
         * @param {remote.ActorPidRequest$Properties} message ActorPidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: remote.ActorPidRequest$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActorPidRequest message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.ActorPidRequest} ActorPidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.ActorPidRequest;

        /**
         * Decodes an ActorPidRequest message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.ActorPidRequest} ActorPidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.ActorPidRequest;

        /**
         * Verifies an ActorPidRequest message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates an ActorPidRequest message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidRequest} ActorPidRequest
         */
        public static fromObject(object: { [k: string]: any }): remote.ActorPidRequest;

        /**
         * Creates an ActorPidRequest message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.ActorPidRequest.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidRequest} ActorPidRequest
         */
        public static from(object: { [k: string]: any }): remote.ActorPidRequest;

        /**
         * Creates a plain object from an ActorPidRequest message. Also converts values to other types if specified.
         * @param {remote.ActorPidRequest} message ActorPidRequest
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: remote.ActorPidRequest, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this ActorPidRequest message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this ActorPidRequest to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type ActorPidResponse$Properties = {
        pid?: actor.PID$Properties;
    };

    /**
     * Constructs a new ActorPidResponse.
     * @exports remote.ActorPidResponse
     * @constructor
     * @param {remote.ActorPidResponse$Properties=} [properties] Properties to set
     */
    class ActorPidResponse {

        /**
         * Constructs a new ActorPidResponse.
         * @exports remote.ActorPidResponse
         * @constructor
         * @param {remote.ActorPidResponse$Properties=} [properties] Properties to set
         */
        constructor(properties?: remote.ActorPidResponse$Properties);

        /**
         * ActorPidResponse pid.
         * @type {(actor.PID$Properties|null)}
         */
        public pid: (actor.PID$Properties|null);

        /**
         * Creates a new ActorPidResponse instance using the specified properties.
         * @param {remote.ActorPidResponse$Properties=} [properties] Properties to set
         * @returns {remote.ActorPidResponse} ActorPidResponse instance
         */
        public static create(properties?: remote.ActorPidResponse$Properties): remote.ActorPidResponse;

        /**
         * Encodes the specified ActorPidResponse message. Does not implicitly {@link remote.ActorPidResponse.verify|verify} messages.
         * @param {remote.ActorPidResponse$Properties} message ActorPidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: remote.ActorPidResponse$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActorPidResponse message, length delimited. Does not implicitly {@link remote.ActorPidResponse.verify|verify} messages.
         * @param {remote.ActorPidResponse$Properties} message ActorPidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: remote.ActorPidResponse$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActorPidResponse message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.ActorPidResponse} ActorPidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.ActorPidResponse;

        /**
         * Decodes an ActorPidResponse message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.ActorPidResponse} ActorPidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.ActorPidResponse;

        /**
         * Verifies an ActorPidResponse message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates an ActorPidResponse message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidResponse} ActorPidResponse
         */
        public static fromObject(object: { [k: string]: any }): remote.ActorPidResponse;

        /**
         * Creates an ActorPidResponse message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.ActorPidResponse.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidResponse} ActorPidResponse
         */
        public static from(object: { [k: string]: any }): remote.ActorPidResponse;

        /**
         * Creates a plain object from an ActorPidResponse message. Also converts values to other types if specified.
         * @param {remote.ActorPidResponse} message ActorPidResponse
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: remote.ActorPidResponse, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this ActorPidResponse message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this ActorPidResponse to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type Unit$Properties = {};

    /**
     * Constructs a new Unit.
     * @exports remote.Unit
     * @constructor
     * @param {remote.Unit$Properties=} [properties] Properties to set
     */
    class Unit {

        /**
         * Constructs a new Unit.
         * @exports remote.Unit
         * @constructor
         * @param {remote.Unit$Properties=} [properties] Properties to set
         */
        constructor(properties?: remote.Unit$Properties);

        /**
         * Creates a new Unit instance using the specified properties.
         * @param {remote.Unit$Properties=} [properties] Properties to set
         * @returns {remote.Unit} Unit instance
         */
        public static create(properties?: remote.Unit$Properties): remote.Unit;

        /**
         * Encodes the specified Unit message. Does not implicitly {@link remote.Unit.verify|verify} messages.
         * @param {remote.Unit$Properties} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: remote.Unit$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Unit message, length delimited. Does not implicitly {@link remote.Unit.verify|verify} messages.
         * @param {remote.Unit$Properties} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: remote.Unit$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Unit message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remote.Unit;

        /**
         * Decodes an Unit message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remote.Unit;

        /**
         * Verifies an Unit message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates an Unit message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.Unit} Unit
         */
        public static fromObject(object: { [k: string]: any }): remote.Unit;

        /**
         * Creates an Unit message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.Unit.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.Unit} Unit
         */
        public static from(object: { [k: string]: any }): remote.Unit;

        /**
         * Creates a plain object from an Unit message. Also converts values to other types if specified.
         * @param {remote.Unit} message Unit
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: remote.Unit, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Unit message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Unit to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /**
     * Constructs a new Remoting service.
     * @exports remote.Remoting
     * @extends $protobuf.rpc.Service
     * @constructor
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    class Remoting extends $protobuf.rpc.Service {

        /**
         * Constructs a new Remoting service.
         * @exports remote.Remoting
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new Remoting service using the specified rpc implementation.
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Remoting} RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Remoting;

        /**
         * Calls Receive.
         * @param {remote.MessageBatch|Object.<string,*>} request MessageBatch message or plain object
         * @param {Remoting_receive_Callback} callback Node-style callback called with the error, if any, and Unit
         * @returns {undefined}
         */
        public receive(request: (remote.MessageBatch|{ [k: string]: any }), callback: Remoting_receive_Callback): void;
    }
}

type Remoting_receive_Callback = (error: Error, response?: remote.Unit) => void;

/**
 * Namespace actor.
 * @exports actor
 * @namespace
 */
export namespace actor {

    type PID$Properties = {
        Address?: string;
        Id?: string;
    };

    /**
     * Constructs a new PID.
     * @exports actor.PID
     * @constructor
     * @param {actor.PID$Properties=} [properties] Properties to set
     */
    class PID {

        /**
         * Constructs a new PID.
         * @exports actor.PID
         * @constructor
         * @param {actor.PID$Properties=} [properties] Properties to set
         */
        constructor(properties?: actor.PID$Properties);

        /**
         * PID Address.
         * @type {string}
         */
        public Address: string;

        /**
         * PID Id.
         * @type {string}
         */
        public Id: string;

        /**
         * Creates a new PID instance using the specified properties.
         * @param {actor.PID$Properties=} [properties] Properties to set
         * @returns {actor.PID} PID instance
         */
        public static create(properties?: actor.PID$Properties): actor.PID;

        /**
         * Encodes the specified PID message. Does not implicitly {@link actor.PID.verify|verify} messages.
         * @param {actor.PID$Properties} message PID message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: actor.PID$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PID message, length delimited. Does not implicitly {@link actor.PID.verify|verify} messages.
         * @param {actor.PID$Properties} message PID message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: actor.PID$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PID message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.PID} PID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): actor.PID;

        /**
         * Decodes a PID message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.PID} PID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): actor.PID;

        /**
         * Verifies a PID message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a PID message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PID} PID
         */
        public static fromObject(object: { [k: string]: any }): actor.PID;

        /**
         * Creates a PID message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.PID.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PID} PID
         */
        public static from(object: { [k: string]: any }): actor.PID;

        /**
         * Creates a plain object from a PID message. Also converts values to other types if specified.
         * @param {actor.PID} message PID
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: actor.PID, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this PID message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this PID to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type PoisonPill$Properties = {};

    /**
     * Constructs a new PoisonPill.
     * @exports actor.PoisonPill
     * @constructor
     * @param {actor.PoisonPill$Properties=} [properties] Properties to set
     */
    class PoisonPill {

        /**
         * Constructs a new PoisonPill.
         * @exports actor.PoisonPill
         * @constructor
         * @param {actor.PoisonPill$Properties=} [properties] Properties to set
         */
        constructor(properties?: actor.PoisonPill$Properties);

        /**
         * Creates a new PoisonPill instance using the specified properties.
         * @param {actor.PoisonPill$Properties=} [properties] Properties to set
         * @returns {actor.PoisonPill} PoisonPill instance
         */
        public static create(properties?: actor.PoisonPill$Properties): actor.PoisonPill;

        /**
         * Encodes the specified PoisonPill message. Does not implicitly {@link actor.PoisonPill.verify|verify} messages.
         * @param {actor.PoisonPill$Properties} message PoisonPill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: actor.PoisonPill$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PoisonPill message, length delimited. Does not implicitly {@link actor.PoisonPill.verify|verify} messages.
         * @param {actor.PoisonPill$Properties} message PoisonPill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: actor.PoisonPill$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PoisonPill message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.PoisonPill} PoisonPill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): actor.PoisonPill;

        /**
         * Decodes a PoisonPill message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.PoisonPill} PoisonPill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): actor.PoisonPill;

        /**
         * Verifies a PoisonPill message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a PoisonPill message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PoisonPill} PoisonPill
         */
        public static fromObject(object: { [k: string]: any }): actor.PoisonPill;

        /**
         * Creates a PoisonPill message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.PoisonPill.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PoisonPill} PoisonPill
         */
        public static from(object: { [k: string]: any }): actor.PoisonPill;

        /**
         * Creates a plain object from a PoisonPill message. Also converts values to other types if specified.
         * @param {actor.PoisonPill} message PoisonPill
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: actor.PoisonPill, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this PoisonPill message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this PoisonPill to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type Watch$Properties = {
        watcher?: actor.PID$Properties;
    };

    /**
     * Constructs a new Watch.
     * @exports actor.Watch
     * @constructor
     * @param {actor.Watch$Properties=} [properties] Properties to set
     */
    class Watch {

        /**
         * Constructs a new Watch.
         * @exports actor.Watch
         * @constructor
         * @param {actor.Watch$Properties=} [properties] Properties to set
         */
        constructor(properties?: actor.Watch$Properties);

        /**
         * Watch watcher.
         * @type {(actor.PID$Properties|null)}
         */
        public watcher: (actor.PID$Properties|null);

        /**
         * Creates a new Watch instance using the specified properties.
         * @param {actor.Watch$Properties=} [properties] Properties to set
         * @returns {actor.Watch} Watch instance
         */
        public static create(properties?: actor.Watch$Properties): actor.Watch;

        /**
         * Encodes the specified Watch message. Does not implicitly {@link actor.Watch.verify|verify} messages.
         * @param {actor.Watch$Properties} message Watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: actor.Watch$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Watch message, length delimited. Does not implicitly {@link actor.Watch.verify|verify} messages.
         * @param {actor.Watch$Properties} message Watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: actor.Watch$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Watch message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Watch} Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): actor.Watch;

        /**
         * Decodes a Watch message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Watch} Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): actor.Watch;

        /**
         * Verifies a Watch message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a Watch message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Watch} Watch
         */
        public static fromObject(object: { [k: string]: any }): actor.Watch;

        /**
         * Creates a Watch message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Watch.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Watch} Watch
         */
        public static from(object: { [k: string]: any }): actor.Watch;

        /**
         * Creates a plain object from a Watch message. Also converts values to other types if specified.
         * @param {actor.Watch} message Watch
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: actor.Watch, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Watch message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Watch to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type Unwatch$Properties = {
        watcher?: actor.PID$Properties;
    };

    /**
     * Constructs a new Unwatch.
     * @exports actor.Unwatch
     * @constructor
     * @param {actor.Unwatch$Properties=} [properties] Properties to set
     */
    class Unwatch {

        /**
         * Constructs a new Unwatch.
         * @exports actor.Unwatch
         * @constructor
         * @param {actor.Unwatch$Properties=} [properties] Properties to set
         */
        constructor(properties?: actor.Unwatch$Properties);

        /**
         * Unwatch watcher.
         * @type {(actor.PID$Properties|null)}
         */
        public watcher: (actor.PID$Properties|null);

        /**
         * Creates a new Unwatch instance using the specified properties.
         * @param {actor.Unwatch$Properties=} [properties] Properties to set
         * @returns {actor.Unwatch} Unwatch instance
         */
        public static create(properties?: actor.Unwatch$Properties): actor.Unwatch;

        /**
         * Encodes the specified Unwatch message. Does not implicitly {@link actor.Unwatch.verify|verify} messages.
         * @param {actor.Unwatch$Properties} message Unwatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: actor.Unwatch$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Unwatch message, length delimited. Does not implicitly {@link actor.Unwatch.verify|verify} messages.
         * @param {actor.Unwatch$Properties} message Unwatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: actor.Unwatch$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Unwatch message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Unwatch} Unwatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): actor.Unwatch;

        /**
         * Decodes an Unwatch message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Unwatch} Unwatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): actor.Unwatch;

        /**
         * Verifies an Unwatch message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates an Unwatch message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Unwatch} Unwatch
         */
        public static fromObject(object: { [k: string]: any }): actor.Unwatch;

        /**
         * Creates an Unwatch message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Unwatch.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Unwatch} Unwatch
         */
        public static from(object: { [k: string]: any }): actor.Unwatch;

        /**
         * Creates a plain object from an Unwatch message. Also converts values to other types if specified.
         * @param {actor.Unwatch} message Unwatch
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: actor.Unwatch, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Unwatch message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Unwatch to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type Terminated$Properties = {
        who?: actor.PID$Properties;
        AddressTerminated?: boolean;
    };

    /**
     * Constructs a new Terminated.
     * @exports actor.Terminated
     * @constructor
     * @param {actor.Terminated$Properties=} [properties] Properties to set
     */
    class Terminated {

        /**
         * Constructs a new Terminated.
         * @exports actor.Terminated
         * @constructor
         * @param {actor.Terminated$Properties=} [properties] Properties to set
         */
        constructor(properties?: actor.Terminated$Properties);

        /**
         * Terminated who.
         * @type {(actor.PID$Properties|null)}
         */
        public who: (actor.PID$Properties|null);

        /**
         * Terminated AddressTerminated.
         * @type {boolean}
         */
        public AddressTerminated: boolean;

        /**
         * Creates a new Terminated instance using the specified properties.
         * @param {actor.Terminated$Properties=} [properties] Properties to set
         * @returns {actor.Terminated} Terminated instance
         */
        public static create(properties?: actor.Terminated$Properties): actor.Terminated;

        /**
         * Encodes the specified Terminated message. Does not implicitly {@link actor.Terminated.verify|verify} messages.
         * @param {actor.Terminated$Properties} message Terminated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: actor.Terminated$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Terminated message, length delimited. Does not implicitly {@link actor.Terminated.verify|verify} messages.
         * @param {actor.Terminated$Properties} message Terminated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: actor.Terminated$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Terminated message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Terminated} Terminated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): actor.Terminated;

        /**
         * Decodes a Terminated message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Terminated} Terminated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): actor.Terminated;

        /**
         * Verifies a Terminated message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a Terminated message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Terminated} Terminated
         */
        public static fromObject(object: { [k: string]: any }): actor.Terminated;

        /**
         * Creates a Terminated message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Terminated.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Terminated} Terminated
         */
        public static from(object: { [k: string]: any }): actor.Terminated;

        /**
         * Creates a plain object from a Terminated message. Also converts values to other types if specified.
         * @param {actor.Terminated} message Terminated
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: actor.Terminated, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Terminated message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Terminated to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type Stop$Properties = {};

    /**
     * Constructs a new Stop.
     * @exports actor.Stop
     * @constructor
     * @param {actor.Stop$Properties=} [properties] Properties to set
     */
    class Stop {

        /**
         * Constructs a new Stop.
         * @exports actor.Stop
         * @constructor
         * @param {actor.Stop$Properties=} [properties] Properties to set
         */
        constructor(properties?: actor.Stop$Properties);

        /**
         * Creates a new Stop instance using the specified properties.
         * @param {actor.Stop$Properties=} [properties] Properties to set
         * @returns {actor.Stop} Stop instance
         */
        public static create(properties?: actor.Stop$Properties): actor.Stop;

        /**
         * Encodes the specified Stop message. Does not implicitly {@link actor.Stop.verify|verify} messages.
         * @param {actor.Stop$Properties} message Stop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: actor.Stop$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Stop message, length delimited. Does not implicitly {@link actor.Stop.verify|verify} messages.
         * @param {actor.Stop$Properties} message Stop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: actor.Stop$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Stop message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Stop} Stop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): actor.Stop;

        /**
         * Decodes a Stop message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Stop} Stop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): actor.Stop;

        /**
         * Verifies a Stop message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a Stop message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Stop} Stop
         */
        public static fromObject(object: { [k: string]: any }): actor.Stop;

        /**
         * Creates a Stop message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Stop.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Stop} Stop
         */
        public static from(object: { [k: string]: any }): actor.Stop;

        /**
         * Creates a plain object from a Stop message. Also converts values to other types if specified.
         * @param {actor.Stop} message Stop
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: actor.Stop, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Stop message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Stop to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
