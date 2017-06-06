/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.remote = (function() {

    /**
     * Namespace remote.
     * @exports remote
     * @namespace
     */
    var remote = {};

    remote.MessageBatch = (function() {

        /**
         * Properties of a MessageBatch.
         * @typedef remote.MessageBatch$Properties
         * @type {Object}
         * @property {Array.<string>} [typeNames] MessageBatch typeNames.
         * @property {Array.<string>} [targetNames] MessageBatch targetNames.
         * @property {Array.<remote.MessageEnvelope$Properties>} [envelopes] MessageBatch envelopes.
         */

        /**
         * Constructs a new MessageBatch.
         * @exports remote.MessageBatch
         * @constructor
         * @param {remote.MessageBatch$Properties=} [properties] Properties to set
         */
        function MessageBatch(properties) {
            this.typeNames = [];
            this.targetNames = [];
            this.envelopes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageBatch typeNames.
         * @type {Array.<string>}
         */
        MessageBatch.prototype.typeNames = $util.emptyArray;

        /**
         * MessageBatch targetNames.
         * @type {Array.<string>}
         */
        MessageBatch.prototype.targetNames = $util.emptyArray;

        /**
         * MessageBatch envelopes.
         * @type {Array.<remote.MessageEnvelope$Properties>}
         */
        MessageBatch.prototype.envelopes = $util.emptyArray;

        /**
         * Creates a new MessageBatch instance using the specified properties.
         * @param {remote.MessageBatch$Properties=} [properties] Properties to set
         * @returns {remote.MessageBatch} MessageBatch instance
         */
        MessageBatch.create = function create(properties) {
            return new MessageBatch(properties);
        };

        /**
         * Encodes the specified MessageBatch message. Does not implicitly {@link remote.MessageBatch.verify|verify} messages.
         * @param {remote.MessageBatch$Properties} message MessageBatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageBatch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.typeNames != null && message.typeNames.length)
                for (var i = 0; i < message.typeNames.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.typeNames[i]);
            if (message.targetNames != null && message.targetNames.length)
                for (var i = 0; i < message.targetNames.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.targetNames[i]);
            if (message.envelopes != null && message.envelopes.length)
                for (var i = 0; i < message.envelopes.length; ++i)
                    $root.remote.MessageEnvelope.encode(message.envelopes[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MessageBatch message, length delimited. Does not implicitly {@link remote.MessageBatch.verify|verify} messages.
         * @param {remote.MessageBatch$Properties} message MessageBatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageBatch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageBatch message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.MessageBatch} MessageBatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageBatch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.remote.MessageBatch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.typeNames && message.typeNames.length))
                        message.typeNames = [];
                    message.typeNames.push(reader.string());
                    break;
                case 2:
                    if (!(message.targetNames && message.targetNames.length))
                        message.targetNames = [];
                    message.targetNames.push(reader.string());
                    break;
                case 3:
                    if (!(message.envelopes && message.envelopes.length))
                        message.envelopes = [];
                    message.envelopes.push($root.remote.MessageEnvelope.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageBatch message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.MessageBatch} MessageBatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageBatch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageBatch message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        MessageBatch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.typeNames != null && message.hasOwnProperty("typeNames")) {
                if (!Array.isArray(message.typeNames))
                    return "typeNames: array expected";
                for (var i = 0; i < message.typeNames.length; ++i)
                    if (!$util.isString(message.typeNames[i]))
                        return "typeNames: string[] expected";
            }
            if (message.targetNames != null && message.hasOwnProperty("targetNames")) {
                if (!Array.isArray(message.targetNames))
                    return "targetNames: array expected";
                for (var i = 0; i < message.targetNames.length; ++i)
                    if (!$util.isString(message.targetNames[i]))
                        return "targetNames: string[] expected";
            }
            if (message.envelopes != null && message.hasOwnProperty("envelopes")) {
                if (!Array.isArray(message.envelopes))
                    return "envelopes: array expected";
                for (var i = 0; i < message.envelopes.length; ++i) {
                    var error = $root.remote.MessageEnvelope.verify(message.envelopes[i]);
                    if (error)
                        return "envelopes." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MessageBatch message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageBatch} MessageBatch
         */
        MessageBatch.fromObject = function fromObject(object) {
            if (object instanceof $root.remote.MessageBatch)
                return object;
            var message = new $root.remote.MessageBatch();
            if (object.typeNames) {
                if (!Array.isArray(object.typeNames))
                    throw TypeError(".remote.MessageBatch.typeNames: array expected");
                message.typeNames = [];
                for (var i = 0; i < object.typeNames.length; ++i)
                    message.typeNames[i] = String(object.typeNames[i]);
            }
            if (object.targetNames) {
                if (!Array.isArray(object.targetNames))
                    throw TypeError(".remote.MessageBatch.targetNames: array expected");
                message.targetNames = [];
                for (var i = 0; i < object.targetNames.length; ++i)
                    message.targetNames[i] = String(object.targetNames[i]);
            }
            if (object.envelopes) {
                if (!Array.isArray(object.envelopes))
                    throw TypeError(".remote.MessageBatch.envelopes: array expected");
                message.envelopes = [];
                for (var i = 0; i < object.envelopes.length; ++i) {
                    if (typeof object.envelopes[i] !== "object")
                        throw TypeError(".remote.MessageBatch.envelopes: object expected");
                    message.envelopes[i] = $root.remote.MessageEnvelope.fromObject(object.envelopes[i]);
                }
            }
            return message;
        };

        /**
         * Creates a MessageBatch message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.MessageBatch.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageBatch} MessageBatch
         */
        MessageBatch.from = MessageBatch.fromObject;

        /**
         * Creates a plain object from a MessageBatch message. Also converts values to other types if specified.
         * @param {remote.MessageBatch} message MessageBatch
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageBatch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.typeNames = [];
                object.targetNames = [];
                object.envelopes = [];
            }
            if (message.typeNames && message.typeNames.length) {
                object.typeNames = [];
                for (var j = 0; j < message.typeNames.length; ++j)
                    object.typeNames[j] = message.typeNames[j];
            }
            if (message.targetNames && message.targetNames.length) {
                object.targetNames = [];
                for (var j = 0; j < message.targetNames.length; ++j)
                    object.targetNames[j] = message.targetNames[j];
            }
            if (message.envelopes && message.envelopes.length) {
                object.envelopes = [];
                for (var j = 0; j < message.envelopes.length; ++j)
                    object.envelopes[j] = $root.remote.MessageEnvelope.toObject(message.envelopes[j], options);
            }
            return object;
        };

        /**
         * Creates a plain object from this MessageBatch message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageBatch.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this MessageBatch to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        MessageBatch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MessageBatch;
    })();

    remote.MessageEnvelope = (function() {

        /**
         * Properties of a MessageEnvelope.
         * @typedef remote.MessageEnvelope$Properties
         * @type {Object}
         * @property {number} [typeId] MessageEnvelope typeId.
         * @property {Uint8Array} [messageData] MessageEnvelope messageData.
         * @property {number} [target] MessageEnvelope target.
         * @property {actor.PID$Properties} [sender] MessageEnvelope sender.
         */

        /**
         * Constructs a new MessageEnvelope.
         * @exports remote.MessageEnvelope
         * @constructor
         * @param {remote.MessageEnvelope$Properties=} [properties] Properties to set
         */
        function MessageEnvelope(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageEnvelope typeId.
         * @type {number}
         */
        MessageEnvelope.prototype.typeId = 0;

        /**
         * MessageEnvelope messageData.
         * @type {Uint8Array}
         */
        MessageEnvelope.prototype.messageData = $util.newBuffer([]);

        /**
         * MessageEnvelope target.
         * @type {number}
         */
        MessageEnvelope.prototype.target = 0;

        /**
         * MessageEnvelope sender.
         * @type {(actor.PID$Properties|null)}
         */
        MessageEnvelope.prototype.sender = null;

        /**
         * Creates a new MessageEnvelope instance using the specified properties.
         * @param {remote.MessageEnvelope$Properties=} [properties] Properties to set
         * @returns {remote.MessageEnvelope} MessageEnvelope instance
         */
        MessageEnvelope.create = function create(properties) {
            return new MessageEnvelope(properties);
        };

        /**
         * Encodes the specified MessageEnvelope message. Does not implicitly {@link remote.MessageEnvelope.verify|verify} messages.
         * @param {remote.MessageEnvelope$Properties} message MessageEnvelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageEnvelope.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.typeId != null && message.hasOwnProperty("typeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.typeId);
            if (message.messageData != null && message.hasOwnProperty("messageData"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.messageData);
            if (message.target != null && message.hasOwnProperty("target"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.target);
            if (message.sender != null && message.hasOwnProperty("sender"))
                $root.actor.PID.encode(message.sender, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MessageEnvelope message, length delimited. Does not implicitly {@link remote.MessageEnvelope.verify|verify} messages.
         * @param {remote.MessageEnvelope$Properties} message MessageEnvelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageEnvelope.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageEnvelope message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.MessageEnvelope} MessageEnvelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageEnvelope.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.remote.MessageEnvelope();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.typeId = reader.int32();
                    break;
                case 2:
                    message.messageData = reader.bytes();
                    break;
                case 3:
                    message.target = reader.int32();
                    break;
                case 4:
                    message.sender = $root.actor.PID.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageEnvelope message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.MessageEnvelope} MessageEnvelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageEnvelope.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageEnvelope message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        MessageEnvelope.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.typeId != null && message.hasOwnProperty("typeId"))
                if (!$util.isInteger(message.typeId))
                    return "typeId: integer expected";
            if (message.messageData != null && message.hasOwnProperty("messageData"))
                if (!(message.messageData && typeof message.messageData.length === "number" || $util.isString(message.messageData)))
                    return "messageData: buffer expected";
            if (message.target != null && message.hasOwnProperty("target"))
                if (!$util.isInteger(message.target))
                    return "target: integer expected";
            if (message.sender != null && message.hasOwnProperty("sender")) {
                var error = $root.actor.PID.verify(message.sender);
                if (error)
                    return "sender." + error;
            }
            return null;
        };

        /**
         * Creates a MessageEnvelope message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageEnvelope} MessageEnvelope
         */
        MessageEnvelope.fromObject = function fromObject(object) {
            if (object instanceof $root.remote.MessageEnvelope)
                return object;
            var message = new $root.remote.MessageEnvelope();
            if (object.typeId != null)
                message.typeId = object.typeId | 0;
            if (object.messageData != null)
                if (typeof object.messageData === "string")
                    $util.base64.decode(object.messageData, message.messageData = $util.newBuffer($util.base64.length(object.messageData)), 0);
                else if (object.messageData.length)
                    message.messageData = object.messageData;
            if (object.target != null)
                message.target = object.target | 0;
            if (object.sender != null) {
                if (typeof object.sender !== "object")
                    throw TypeError(".remote.MessageEnvelope.sender: object expected");
                message.sender = $root.actor.PID.fromObject(object.sender);
            }
            return message;
        };

        /**
         * Creates a MessageEnvelope message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.MessageEnvelope.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.MessageEnvelope} MessageEnvelope
         */
        MessageEnvelope.from = MessageEnvelope.fromObject;

        /**
         * Creates a plain object from a MessageEnvelope message. Also converts values to other types if specified.
         * @param {remote.MessageEnvelope} message MessageEnvelope
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageEnvelope.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.typeId = 0;
                object.messageData = options.bytes === String ? "" : [];
                object.target = 0;
                object.sender = null;
            }
            if (message.typeId != null && message.hasOwnProperty("typeId"))
                object.typeId = message.typeId;
            if (message.messageData != null && message.hasOwnProperty("messageData"))
                object.messageData = options.bytes === String ? $util.base64.encode(message.messageData, 0, message.messageData.length) : options.bytes === Array ? Array.prototype.slice.call(message.messageData) : message.messageData;
            if (message.target != null && message.hasOwnProperty("target"))
                object.target = message.target;
            if (message.sender != null && message.hasOwnProperty("sender"))
                object.sender = $root.actor.PID.toObject(message.sender, options);
            return object;
        };

        /**
         * Creates a plain object from this MessageEnvelope message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageEnvelope.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this MessageEnvelope to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        MessageEnvelope.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MessageEnvelope;
    })();

    remote.ActorPidRequest = (function() {

        /**
         * Properties of an ActorPidRequest.
         * @typedef remote.ActorPidRequest$Properties
         * @type {Object}
         * @property {string} [name] ActorPidRequest name.
         * @property {string} [kind] ActorPidRequest kind.
         */

        /**
         * Constructs a new ActorPidRequest.
         * @exports remote.ActorPidRequest
         * @constructor
         * @param {remote.ActorPidRequest$Properties=} [properties] Properties to set
         */
        function ActorPidRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActorPidRequest name.
         * @type {string}
         */
        ActorPidRequest.prototype.name = "";

        /**
         * ActorPidRequest kind.
         * @type {string}
         */
        ActorPidRequest.prototype.kind = "";

        /**
         * Creates a new ActorPidRequest instance using the specified properties.
         * @param {remote.ActorPidRequest$Properties=} [properties] Properties to set
         * @returns {remote.ActorPidRequest} ActorPidRequest instance
         */
        ActorPidRequest.create = function create(properties) {
            return new ActorPidRequest(properties);
        };

        /**
         * Encodes the specified ActorPidRequest message. Does not implicitly {@link remote.ActorPidRequest.verify|verify} messages.
         * @param {remote.ActorPidRequest$Properties} message ActorPidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActorPidRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.kind != null && message.hasOwnProperty("kind"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.kind);
            return writer;
        };

        /**
         * Encodes the specified ActorPidRequest message, length delimited. Does not implicitly {@link remote.ActorPidRequest.verify|verify} messages.
         * @param {remote.ActorPidRequest$Properties} message ActorPidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActorPidRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActorPidRequest message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.ActorPidRequest} ActorPidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActorPidRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.remote.ActorPidRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.kind = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActorPidRequest message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.ActorPidRequest} ActorPidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActorPidRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActorPidRequest message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        ActorPidRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.kind != null && message.hasOwnProperty("kind"))
                if (!$util.isString(message.kind))
                    return "kind: string expected";
            return null;
        };

        /**
         * Creates an ActorPidRequest message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidRequest} ActorPidRequest
         */
        ActorPidRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.remote.ActorPidRequest)
                return object;
            var message = new $root.remote.ActorPidRequest();
            if (object.name != null)
                message.name = String(object.name);
            if (object.kind != null)
                message.kind = String(object.kind);
            return message;
        };

        /**
         * Creates an ActorPidRequest message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.ActorPidRequest.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidRequest} ActorPidRequest
         */
        ActorPidRequest.from = ActorPidRequest.fromObject;

        /**
         * Creates a plain object from an ActorPidRequest message. Also converts values to other types if specified.
         * @param {remote.ActorPidRequest} message ActorPidRequest
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActorPidRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.kind = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.kind != null && message.hasOwnProperty("kind"))
                object.kind = message.kind;
            return object;
        };

        /**
         * Creates a plain object from this ActorPidRequest message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActorPidRequest.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this ActorPidRequest to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        ActorPidRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ActorPidRequest;
    })();

    remote.ActorPidResponse = (function() {

        /**
         * Properties of an ActorPidResponse.
         * @typedef remote.ActorPidResponse$Properties
         * @type {Object}
         * @property {actor.PID$Properties} [pid] ActorPidResponse pid.
         */

        /**
         * Constructs a new ActorPidResponse.
         * @exports remote.ActorPidResponse
         * @constructor
         * @param {remote.ActorPidResponse$Properties=} [properties] Properties to set
         */
        function ActorPidResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActorPidResponse pid.
         * @type {(actor.PID$Properties|null)}
         */
        ActorPidResponse.prototype.pid = null;

        /**
         * Creates a new ActorPidResponse instance using the specified properties.
         * @param {remote.ActorPidResponse$Properties=} [properties] Properties to set
         * @returns {remote.ActorPidResponse} ActorPidResponse instance
         */
        ActorPidResponse.create = function create(properties) {
            return new ActorPidResponse(properties);
        };

        /**
         * Encodes the specified ActorPidResponse message. Does not implicitly {@link remote.ActorPidResponse.verify|verify} messages.
         * @param {remote.ActorPidResponse$Properties} message ActorPidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActorPidResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && message.hasOwnProperty("pid"))
                $root.actor.PID.encode(message.pid, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ActorPidResponse message, length delimited. Does not implicitly {@link remote.ActorPidResponse.verify|verify} messages.
         * @param {remote.ActorPidResponse$Properties} message ActorPidResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActorPidResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActorPidResponse message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.ActorPidResponse} ActorPidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActorPidResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.remote.ActorPidResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pid = $root.actor.PID.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActorPidResponse message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.ActorPidResponse} ActorPidResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActorPidResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActorPidResponse message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        ActorPidResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid")) {
                var error = $root.actor.PID.verify(message.pid);
                if (error)
                    return "pid." + error;
            }
            return null;
        };

        /**
         * Creates an ActorPidResponse message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidResponse} ActorPidResponse
         */
        ActorPidResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.remote.ActorPidResponse)
                return object;
            var message = new $root.remote.ActorPidResponse();
            if (object.pid != null) {
                if (typeof object.pid !== "object")
                    throw TypeError(".remote.ActorPidResponse.pid: object expected");
                message.pid = $root.actor.PID.fromObject(object.pid);
            }
            return message;
        };

        /**
         * Creates an ActorPidResponse message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.ActorPidResponse.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.ActorPidResponse} ActorPidResponse
         */
        ActorPidResponse.from = ActorPidResponse.fromObject;

        /**
         * Creates a plain object from an ActorPidResponse message. Also converts values to other types if specified.
         * @param {remote.ActorPidResponse} message ActorPidResponse
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActorPidResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.pid = null;
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = $root.actor.PID.toObject(message.pid, options);
            return object;
        };

        /**
         * Creates a plain object from this ActorPidResponse message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActorPidResponse.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this ActorPidResponse to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        ActorPidResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ActorPidResponse;
    })();

    remote.Unit = (function() {

        /**
         * Properties of an Unit.
         * @typedef remote.Unit$Properties
         * @type {Object}
         */

        /**
         * Constructs a new Unit.
         * @exports remote.Unit
         * @constructor
         * @param {remote.Unit$Properties=} [properties] Properties to set
         */
        function Unit(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Unit instance using the specified properties.
         * @param {remote.Unit$Properties=} [properties] Properties to set
         * @returns {remote.Unit} Unit instance
         */
        Unit.create = function create(properties) {
            return new Unit(properties);
        };

        /**
         * Encodes the specified Unit message. Does not implicitly {@link remote.Unit.verify|verify} messages.
         * @param {remote.Unit$Properties} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Unit message, length delimited. Does not implicitly {@link remote.Unit.verify|verify} messages.
         * @param {remote.Unit$Properties} message Unit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Unit message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {remote.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.remote.Unit();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Unit message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {remote.Unit} Unit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Unit message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Unit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an Unit message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.Unit} Unit
         */
        Unit.fromObject = function fromObject(object) {
            if (object instanceof $root.remote.Unit)
                return object;
            return new $root.remote.Unit();
        };

        /**
         * Creates an Unit message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link remote.Unit.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {remote.Unit} Unit
         */
        Unit.from = Unit.fromObject;

        /**
         * Creates a plain object from an Unit message. Also converts values to other types if specified.
         * @param {remote.Unit} message Unit
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Unit.toObject = function toObject() {
            return {};
        };

        /**
         * Creates a plain object from this Unit message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Unit.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Unit to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Unit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Unit;
    })();

    remote.Remoting = (function() {

        /**
         * Constructs a new Remoting service.
         * @exports remote.Remoting
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Remoting(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (Remoting.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Remoting;

        /**
         * Creates new Remoting service using the specified rpc implementation.
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {Remoting} RPC service. Useful where requests and/or responses are streamed.
         */
        Remoting.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link Remoting#receive}.
         * @typedef Remoting_receive_Callback
         * @type {function}
         * @param {?Error} error Error, if any
         * @param {remote.Unit} [response] Unit
         */

        /**
         * Calls Receive.
         * @param {remote.MessageBatch|Object.<string,*>} request MessageBatch message or plain object
         * @param {Remoting_receive_Callback} callback Node-style callback called with the error, if any, and Unit
         * @returns {undefined}
         */
        Remoting.prototype.receive = function receive(request, callback) {
            return this.rpcCall(receive, $root.remote.MessageBatch, $root.remote.Unit, request, callback);
        };

        /**
         * Calls Receive.
         * @name Remoting#receive
         * @function
         * @param {remote.MessageBatch|Object.<string,*>} request MessageBatch message or plain object
         * @returns {Promise<remote.Unit>} Promise
         * @variation 2
         */

        return Remoting;
    })();

    return remote;
})();

$root.actor = (function() {

    /**
     * Namespace actor.
     * @exports actor
     * @namespace
     */
    var actor = {};

    actor.PID = (function() {

        /**
         * Properties of a PID.
         * @typedef actor.PID$Properties
         * @type {Object}
         * @property {string} [Address] PID Address.
         * @property {string} [Id] PID Id.
         */

        /**
         * Constructs a new PID.
         * @exports actor.PID
         * @constructor
         * @param {actor.PID$Properties=} [properties] Properties to set
         */
        function PID(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PID Address.
         * @type {string}
         */
        PID.prototype.Address = "";

        /**
         * PID Id.
         * @type {string}
         */
        PID.prototype.Id = "";

        /**
         * Creates a new PID instance using the specified properties.
         * @param {actor.PID$Properties=} [properties] Properties to set
         * @returns {actor.PID} PID instance
         */
        PID.create = function create(properties) {
            return new PID(properties);
        };

        /**
         * Encodes the specified PID message. Does not implicitly {@link actor.PID.verify|verify} messages.
         * @param {actor.PID$Properties} message PID message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PID.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Address != null && message.hasOwnProperty("Address"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Address);
            if (message.Id != null && message.hasOwnProperty("Id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Id);
            return writer;
        };

        /**
         * Encodes the specified PID message, length delimited. Does not implicitly {@link actor.PID.verify|verify} messages.
         * @param {actor.PID$Properties} message PID message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PID.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PID message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.PID} PID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PID.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actor.PID();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Address = reader.string();
                    break;
                case 2:
                    message.Id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PID message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.PID} PID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PID.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PID message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        PID.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Address != null && message.hasOwnProperty("Address"))
                if (!$util.isString(message.Address))
                    return "Address: string expected";
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (!$util.isString(message.Id))
                    return "Id: string expected";
            return null;
        };

        /**
         * Creates a PID message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PID} PID
         */
        PID.fromObject = function fromObject(object) {
            if (object instanceof $root.actor.PID)
                return object;
            var message = new $root.actor.PID();
            if (object.Address != null)
                message.Address = String(object.Address);
            if (object.Id != null)
                message.Id = String(object.Id);
            return message;
        };

        /**
         * Creates a PID message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.PID.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PID} PID
         */
        PID.from = PID.fromObject;

        /**
         * Creates a plain object from a PID message. Also converts values to other types if specified.
         * @param {actor.PID} message PID
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PID.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Address = "";
                object.Id = "";
            }
            if (message.Address != null && message.hasOwnProperty("Address"))
                object.Address = message.Address;
            if (message.Id != null && message.hasOwnProperty("Id"))
                object.Id = message.Id;
            return object;
        };

        /**
         * Creates a plain object from this PID message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PID.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this PID to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        PID.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PID;
    })();

    actor.PoisonPill = (function() {

        /**
         * Properties of a PoisonPill.
         * @typedef actor.PoisonPill$Properties
         * @type {Object}
         */

        /**
         * Constructs a new PoisonPill.
         * @exports actor.PoisonPill
         * @constructor
         * @param {actor.PoisonPill$Properties=} [properties] Properties to set
         */
        function PoisonPill(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new PoisonPill instance using the specified properties.
         * @param {actor.PoisonPill$Properties=} [properties] Properties to set
         * @returns {actor.PoisonPill} PoisonPill instance
         */
        PoisonPill.create = function create(properties) {
            return new PoisonPill(properties);
        };

        /**
         * Encodes the specified PoisonPill message. Does not implicitly {@link actor.PoisonPill.verify|verify} messages.
         * @param {actor.PoisonPill$Properties} message PoisonPill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoisonPill.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified PoisonPill message, length delimited. Does not implicitly {@link actor.PoisonPill.verify|verify} messages.
         * @param {actor.PoisonPill$Properties} message PoisonPill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PoisonPill.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PoisonPill message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.PoisonPill} PoisonPill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoisonPill.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actor.PoisonPill();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PoisonPill message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.PoisonPill} PoisonPill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PoisonPill.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PoisonPill message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        PoisonPill.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a PoisonPill message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PoisonPill} PoisonPill
         */
        PoisonPill.fromObject = function fromObject(object) {
            if (object instanceof $root.actor.PoisonPill)
                return object;
            return new $root.actor.PoisonPill();
        };

        /**
         * Creates a PoisonPill message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.PoisonPill.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.PoisonPill} PoisonPill
         */
        PoisonPill.from = PoisonPill.fromObject;

        /**
         * Creates a plain object from a PoisonPill message. Also converts values to other types if specified.
         * @param {actor.PoisonPill} message PoisonPill
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PoisonPill.toObject = function toObject() {
            return {};
        };

        /**
         * Creates a plain object from this PoisonPill message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PoisonPill.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this PoisonPill to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        PoisonPill.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PoisonPill;
    })();

    actor.Watch = (function() {

        /**
         * Properties of a Watch.
         * @typedef actor.Watch$Properties
         * @type {Object}
         * @property {actor.PID$Properties} [watcher] Watch watcher.
         */

        /**
         * Constructs a new Watch.
         * @exports actor.Watch
         * @constructor
         * @param {actor.Watch$Properties=} [properties] Properties to set
         */
        function Watch(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Watch watcher.
         * @type {(actor.PID$Properties|null)}
         */
        Watch.prototype.watcher = null;

        /**
         * Creates a new Watch instance using the specified properties.
         * @param {actor.Watch$Properties=} [properties] Properties to set
         * @returns {actor.Watch} Watch instance
         */
        Watch.create = function create(properties) {
            return new Watch(properties);
        };

        /**
         * Encodes the specified Watch message. Does not implicitly {@link actor.Watch.verify|verify} messages.
         * @param {actor.Watch$Properties} message Watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Watch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.watcher != null && message.hasOwnProperty("watcher"))
                $root.actor.PID.encode(message.watcher, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Watch message, length delimited. Does not implicitly {@link actor.Watch.verify|verify} messages.
         * @param {actor.Watch$Properties} message Watch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Watch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Watch message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Watch} Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Watch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actor.Watch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.watcher = $root.actor.PID.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Watch message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Watch} Watch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Watch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Watch message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Watch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.watcher != null && message.hasOwnProperty("watcher")) {
                var error = $root.actor.PID.verify(message.watcher);
                if (error)
                    return "watcher." + error;
            }
            return null;
        };

        /**
         * Creates a Watch message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Watch} Watch
         */
        Watch.fromObject = function fromObject(object) {
            if (object instanceof $root.actor.Watch)
                return object;
            var message = new $root.actor.Watch();
            if (object.watcher != null) {
                if (typeof object.watcher !== "object")
                    throw TypeError(".actor.Watch.watcher: object expected");
                message.watcher = $root.actor.PID.fromObject(object.watcher);
            }
            return message;
        };

        /**
         * Creates a Watch message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Watch.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Watch} Watch
         */
        Watch.from = Watch.fromObject;

        /**
         * Creates a plain object from a Watch message. Also converts values to other types if specified.
         * @param {actor.Watch} message Watch
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Watch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.watcher = null;
            if (message.watcher != null && message.hasOwnProperty("watcher"))
                object.watcher = $root.actor.PID.toObject(message.watcher, options);
            return object;
        };

        /**
         * Creates a plain object from this Watch message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Watch.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Watch to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Watch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Watch;
    })();

    actor.Unwatch = (function() {

        /**
         * Properties of an Unwatch.
         * @typedef actor.Unwatch$Properties
         * @type {Object}
         * @property {actor.PID$Properties} [watcher] Unwatch watcher.
         */

        /**
         * Constructs a new Unwatch.
         * @exports actor.Unwatch
         * @constructor
         * @param {actor.Unwatch$Properties=} [properties] Properties to set
         */
        function Unwatch(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Unwatch watcher.
         * @type {(actor.PID$Properties|null)}
         */
        Unwatch.prototype.watcher = null;

        /**
         * Creates a new Unwatch instance using the specified properties.
         * @param {actor.Unwatch$Properties=} [properties] Properties to set
         * @returns {actor.Unwatch} Unwatch instance
         */
        Unwatch.create = function create(properties) {
            return new Unwatch(properties);
        };

        /**
         * Encodes the specified Unwatch message. Does not implicitly {@link actor.Unwatch.verify|verify} messages.
         * @param {actor.Unwatch$Properties} message Unwatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unwatch.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.watcher != null && message.hasOwnProperty("watcher"))
                $root.actor.PID.encode(message.watcher, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Unwatch message, length delimited. Does not implicitly {@link actor.Unwatch.verify|verify} messages.
         * @param {actor.Unwatch$Properties} message Unwatch message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unwatch.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Unwatch message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Unwatch} Unwatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unwatch.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actor.Unwatch();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.watcher = $root.actor.PID.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Unwatch message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Unwatch} Unwatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unwatch.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Unwatch message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Unwatch.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.watcher != null && message.hasOwnProperty("watcher")) {
                var error = $root.actor.PID.verify(message.watcher);
                if (error)
                    return "watcher." + error;
            }
            return null;
        };

        /**
         * Creates an Unwatch message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Unwatch} Unwatch
         */
        Unwatch.fromObject = function fromObject(object) {
            if (object instanceof $root.actor.Unwatch)
                return object;
            var message = new $root.actor.Unwatch();
            if (object.watcher != null) {
                if (typeof object.watcher !== "object")
                    throw TypeError(".actor.Unwatch.watcher: object expected");
                message.watcher = $root.actor.PID.fromObject(object.watcher);
            }
            return message;
        };

        /**
         * Creates an Unwatch message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Unwatch.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Unwatch} Unwatch
         */
        Unwatch.from = Unwatch.fromObject;

        /**
         * Creates a plain object from an Unwatch message. Also converts values to other types if specified.
         * @param {actor.Unwatch} message Unwatch
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Unwatch.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.watcher = null;
            if (message.watcher != null && message.hasOwnProperty("watcher"))
                object.watcher = $root.actor.PID.toObject(message.watcher, options);
            return object;
        };

        /**
         * Creates a plain object from this Unwatch message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Unwatch.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Unwatch to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Unwatch.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Unwatch;
    })();

    actor.Terminated = (function() {

        /**
         * Properties of a Terminated.
         * @typedef actor.Terminated$Properties
         * @type {Object}
         * @property {actor.PID$Properties} [who] Terminated who.
         * @property {boolean} [AddressTerminated] Terminated AddressTerminated.
         */

        /**
         * Constructs a new Terminated.
         * @exports actor.Terminated
         * @constructor
         * @param {actor.Terminated$Properties=} [properties] Properties to set
         */
        function Terminated(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Terminated who.
         * @type {(actor.PID$Properties|null)}
         */
        Terminated.prototype.who = null;

        /**
         * Terminated AddressTerminated.
         * @type {boolean}
         */
        Terminated.prototype.AddressTerminated = false;

        /**
         * Creates a new Terminated instance using the specified properties.
         * @param {actor.Terminated$Properties=} [properties] Properties to set
         * @returns {actor.Terminated} Terminated instance
         */
        Terminated.create = function create(properties) {
            return new Terminated(properties);
        };

        /**
         * Encodes the specified Terminated message. Does not implicitly {@link actor.Terminated.verify|verify} messages.
         * @param {actor.Terminated$Properties} message Terminated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Terminated.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.who != null && message.hasOwnProperty("who"))
                $root.actor.PID.encode(message.who, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.AddressTerminated != null && message.hasOwnProperty("AddressTerminated"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.AddressTerminated);
            return writer;
        };

        /**
         * Encodes the specified Terminated message, length delimited. Does not implicitly {@link actor.Terminated.verify|verify} messages.
         * @param {actor.Terminated$Properties} message Terminated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Terminated.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Terminated message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Terminated} Terminated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Terminated.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actor.Terminated();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.who = $root.actor.PID.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.AddressTerminated = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Terminated message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Terminated} Terminated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Terminated.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Terminated message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Terminated.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.who != null && message.hasOwnProperty("who")) {
                var error = $root.actor.PID.verify(message.who);
                if (error)
                    return "who." + error;
            }
            if (message.AddressTerminated != null && message.hasOwnProperty("AddressTerminated"))
                if (typeof message.AddressTerminated !== "boolean")
                    return "AddressTerminated: boolean expected";
            return null;
        };

        /**
         * Creates a Terminated message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Terminated} Terminated
         */
        Terminated.fromObject = function fromObject(object) {
            if (object instanceof $root.actor.Terminated)
                return object;
            var message = new $root.actor.Terminated();
            if (object.who != null) {
                if (typeof object.who !== "object")
                    throw TypeError(".actor.Terminated.who: object expected");
                message.who = $root.actor.PID.fromObject(object.who);
            }
            if (object.AddressTerminated != null)
                message.AddressTerminated = Boolean(object.AddressTerminated);
            return message;
        };

        /**
         * Creates a Terminated message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Terminated.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Terminated} Terminated
         */
        Terminated.from = Terminated.fromObject;

        /**
         * Creates a plain object from a Terminated message. Also converts values to other types if specified.
         * @param {actor.Terminated} message Terminated
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Terminated.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.who = null;
                object.AddressTerminated = false;
            }
            if (message.who != null && message.hasOwnProperty("who"))
                object.who = $root.actor.PID.toObject(message.who, options);
            if (message.AddressTerminated != null && message.hasOwnProperty("AddressTerminated"))
                object.AddressTerminated = message.AddressTerminated;
            return object;
        };

        /**
         * Creates a plain object from this Terminated message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Terminated.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Terminated to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Terminated.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Terminated;
    })();

    actor.Stop = (function() {

        /**
         * Properties of a Stop.
         * @typedef actor.Stop$Properties
         * @type {Object}
         */

        /**
         * Constructs a new Stop.
         * @exports actor.Stop
         * @constructor
         * @param {actor.Stop$Properties=} [properties] Properties to set
         */
        function Stop(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Stop instance using the specified properties.
         * @param {actor.Stop$Properties=} [properties] Properties to set
         * @returns {actor.Stop} Stop instance
         */
        Stop.create = function create(properties) {
            return new Stop(properties);
        };

        /**
         * Encodes the specified Stop message. Does not implicitly {@link actor.Stop.verify|verify} messages.
         * @param {actor.Stop$Properties} message Stop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stop.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Stop message, length delimited. Does not implicitly {@link actor.Stop.verify|verify} messages.
         * @param {actor.Stop$Properties} message Stop message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Stop.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Stop message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {actor.Stop} Stop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stop.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.actor.Stop();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Stop message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {actor.Stop} Stop
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Stop.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Stop message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Stop.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Stop message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Stop} Stop
         */
        Stop.fromObject = function fromObject(object) {
            if (object instanceof $root.actor.Stop)
                return object;
            return new $root.actor.Stop();
        };

        /**
         * Creates a Stop message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link actor.Stop.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {actor.Stop} Stop
         */
        Stop.from = Stop.fromObject;

        /**
         * Creates a plain object from a Stop message. Also converts values to other types if specified.
         * @param {actor.Stop} message Stop
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Stop.toObject = function toObject() {
            return {};
        };

        /**
         * Creates a plain object from this Stop message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Stop.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Stop to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Stop.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Stop;
    })();

    return actor;
})();

module.exports = $root;
