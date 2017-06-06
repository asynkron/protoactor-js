#rm -rf generated && mkdir -p generated && protoc --plugin=protoc-gen-ts=node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:generated --ts_out=service=true:generated -I src src/actor.proto
mkdir -p tmp

pbjs='node_modules/protobufjs/cli/bin/pbjs -t static-module -w commonjs'
pbts='node_modules/protobufjs/cli/bin/pbts'

$pbjs -o src/actor_pb.js src/actor.proto
$pbts -o src/actor_pb.d.ts src/actor_pb.js

$pbjs -o src/remote_pb.js -p src src/remote/remote.proto
$pbts -o src/remote/remote_pb.d.ts src/remote_pb.js

