#!/bin/sh
sed -r 's/C\:\\[^,]+/"&"/g' "$1"  | sed -r '/C\:./ { s/\\/\//g }' > "$1.fix"
node --prof-process "$1.fix" > "$1.processed"
