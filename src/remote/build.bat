%USERPROFILE%\AppData\Roaming\npm\node_modules\grpc-tools\bin\protoc.exe remote.proto -I. -I.. --plugin=protoc-gen-grpc=%USERPROFILE%\AppData\Roaming\npm\node_modules\grpc-tools\bin\grpc_node_plugin.exe --js_out=import_style=commonjs,binary:..\remote --grpc_out=..\remote --plugin=protoc-gen-grpc=%USERPROFILE%\AppData\Roaming\npm\grpc_tools_node_protoc_plugin.cmd 