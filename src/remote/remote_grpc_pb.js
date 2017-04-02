// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var remote_pb = require('./remote_pb.js');
var actor_pb = require('../actor_pb.js');

function serialize_remote_MessageBatch(arg) {
  if (!(arg instanceof remote_pb.MessageBatch)) {
    throw new Error('Expected argument of type remote.MessageBatch');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_remote_MessageBatch(buffer_arg) {
  return remote_pb.MessageBatch.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_remote_Unit(arg) {
  if (!(arg instanceof remote_pb.Unit)) {
    throw new Error('Expected argument of type remote.Unit');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_remote_Unit(buffer_arg) {
  return remote_pb.Unit.deserializeBinary(new Uint8Array(buffer_arg));
}


var RemotingService = exports.RemotingService = {
  receive: {
    path: '/remote.Remoting/Receive',
    requestStream: true,
    responseStream: true,
    requestType: remote_pb.MessageBatch,
    responseType: remote_pb.Unit,
    requestSerialize: serialize_remote_MessageBatch,
    requestDeserialize: deserialize_remote_MessageBatch,
    responseSerialize: serialize_remote_Unit,
    responseDeserialize: deserialize_remote_Unit,
  },
};

exports.RemotingClient = grpc.makeGenericClientConstructor(RemotingService);
