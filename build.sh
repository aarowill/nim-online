#!/usr/bin/env bash
set -e

cd client
./build.sh

cd ../api
docker build -t aarowill/nim-api .
