#!/bin/bash

VERSION=`node -p "require('./package.json').version"`
DATE=`date +%Y-%m-%d-%H:%M:%S`

echo "Exporting markdown files for version $VERSION"

typedoc --options typedoc.json --plugin typedoc-plugin-markdown --out documentation

cd documentation/

find . -name '*.md' ! -name 'all-in-one.md' -exec cat {} \; > all-in-one.md

# Write the version and date to the top of the file

sed -i '' '1s/^/---\n\n/' all-in-one.md
sed -i '' '1s/^/date: '$DATE'\n/' all-in-one.md
sed -i '' '1s/^/version: '$VERSION'\
/' all-in-one.md
sed -i '' '1s/^/---\n/' all-in-one.md
