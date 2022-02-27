#!/usr/bin/env bash
set -e

echo Building aarowill/nim-caddy:build

docker build -t aarowill/nim-caddy:build . -f Dockerfile.build

docker container create --name extract aarowill/nim-caddy:build
docker container cp extract:/app/build ./build
docker container rm -f extract

echo Building aarowill/nim-caddy:latest

docker build -t aarowill/nim-caddy:latest .
rm -r build
