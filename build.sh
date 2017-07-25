#!/bin/bash

cd src

npm install

okorkill "Error installing npm production packages."

zip -r "../dist/taco.zip" * # The zip file will have the short checksum of the commit as a name.

cd ../

echo "Done your build is in dist/taco.zip"

rm -rf build # Clean up

exit 0
