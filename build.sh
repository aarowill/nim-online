#!/bin/bash -e

cd client
./build.sh

cd ../api
docker build -t aarowill/nim-api .
