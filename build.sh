#!/usr/bin/env bash
set -e

cd client
docker build -t aarowill/nim-caddy:latest

cd ../api
docker build -t aarowill/nim-api:latest .
