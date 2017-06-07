#rm -rf generated && mkdir -p generated && protoc --plugin=protoc-gen-ts=node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:generated --ts_out=service=true:generated -I src src/actor.proto
mkdir -p tmp

pbjs='node_modules/protobufjs/cli/bin/pbjs -t static-module -w commonjs'
pbts='node_modules/protobufjs/cli/bin/pbts'

$pbjs -o examples/remote/messages_pb.js examples/remote/messages.proto
$pbts -o examples/remote/messages_pb.d.ts examples/remote/messages_pb.js

