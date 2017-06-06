import * as $protobuf from "protobufjs";

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
