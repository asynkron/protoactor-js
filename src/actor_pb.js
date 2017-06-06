/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

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
