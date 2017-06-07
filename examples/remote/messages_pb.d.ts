import * as $protobuf from "protobufjs";

/**
 * Namespace messages.
 * @exports messages
 * @namespace
 */
export namespace messages {

    type HelloRequest$Properties = {};

    /**
     * Constructs a new HelloRequest.
     * @exports messages.HelloRequest
     * @constructor
     * @param {messages.HelloRequest$Properties=} [properties] Properties to set
     */
    class HelloRequest {

        /**
         * Constructs a new HelloRequest.
         * @exports messages.HelloRequest
         * @constructor
         * @param {messages.HelloRequest$Properties=} [properties] Properties to set
         */
        constructor(properties?: messages.HelloRequest$Properties);

        /**
         * Creates a new HelloRequest instance using the specified properties.
         * @param {messages.HelloRequest$Properties=} [properties] Properties to set
         * @returns {messages.HelloRequest} HelloRequest instance
         */
        public static create(properties?: messages.HelloRequest$Properties): messages.HelloRequest;

        /**
         * Encodes the specified HelloRequest message. Does not implicitly {@link messages.HelloRequest.verify|verify} messages.
         * @param {messages.HelloRequest$Properties} message HelloRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: messages.HelloRequest$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HelloRequest message, length delimited. Does not implicitly {@link messages.HelloRequest.verify|verify} messages.
         * @param {messages.HelloRequest$Properties} message HelloRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: messages.HelloRequest$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HelloRequest message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {messages.HelloRequest} HelloRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): messages.HelloRequest;

        /**
         * Decodes a HelloRequest message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {messages.HelloRequest} HelloRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): messages.HelloRequest;

        /**
         * Verifies a HelloRequest message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {messages.HelloRequest} HelloRequest
         */
        public static fromObject(object: { [k: string]: any }): messages.HelloRequest;

        /**
         * Creates a HelloRequest message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link messages.HelloRequest.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {messages.HelloRequest} HelloRequest
         */
        public static from(object: { [k: string]: any }): messages.HelloRequest;

        /**
         * Creates a plain object from a HelloRequest message. Also converts values to other types if specified.
         * @param {messages.HelloRequest} message HelloRequest
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: messages.HelloRequest, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this HelloRequest message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this HelloRequest to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type HelloResponse$Properties = {
        Message?: string;
    };

    /**
     * Constructs a new HelloResponse.
     * @exports messages.HelloResponse
     * @constructor
     * @param {messages.HelloResponse$Properties=} [properties] Properties to set
     */
    class HelloResponse {

        /**
         * Constructs a new HelloResponse.
         * @exports messages.HelloResponse
         * @constructor
         * @param {messages.HelloResponse$Properties=} [properties] Properties to set
         */
        constructor(properties?: messages.HelloResponse$Properties);

        /**
         * HelloResponse Message.
         * @type {string}
         */
        public Message: string;

        /**
         * Creates a new HelloResponse instance using the specified properties.
         * @param {messages.HelloResponse$Properties=} [properties] Properties to set
         * @returns {messages.HelloResponse} HelloResponse instance
         */
        public static create(properties?: messages.HelloResponse$Properties): messages.HelloResponse;

        /**
         * Encodes the specified HelloResponse message. Does not implicitly {@link messages.HelloResponse.verify|verify} messages.
         * @param {messages.HelloResponse$Properties} message HelloResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: messages.HelloResponse$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HelloResponse message, length delimited. Does not implicitly {@link messages.HelloResponse.verify|verify} messages.
         * @param {messages.HelloResponse$Properties} message HelloResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: messages.HelloResponse$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HelloResponse message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {messages.HelloResponse} HelloResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): messages.HelloResponse;

        /**
         * Decodes a HelloResponse message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {messages.HelloResponse} HelloResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): messages.HelloResponse;

        /**
         * Verifies a HelloResponse message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a HelloResponse message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {messages.HelloResponse} HelloResponse
         */
        public static fromObject(object: { [k: string]: any }): messages.HelloResponse;

        /**
         * Creates a HelloResponse message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link messages.HelloResponse.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {messages.HelloResponse} HelloResponse
         */
        public static from(object: { [k: string]: any }): messages.HelloResponse;

        /**
         * Creates a plain object from a HelloResponse message. Also converts values to other types if specified.
         * @param {messages.HelloResponse} message HelloResponse
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: messages.HelloResponse, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this HelloResponse message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this HelloResponse to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
