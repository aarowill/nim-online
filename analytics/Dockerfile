# syntax=docker/dockerfile:1

# Heavily inspired by
# https://github.com/baethon/docker-goatcounter/blob/42bcaf51f2f172a1acede34fe852cf9643bd7265/Dockerfile

#
# Build
#
FROM golang:1.17-bullseye AS build

ARG GOAT_COUNTER_BRANCH=release-2.2

RUN git clone https://github.com/aarowill/goatcounter.git
RUN cd goatcounter \
  && git checkout $GOAT_COUNTER_BRANCH \
  && go build ./cmd/goatcounter

#
# Deploy
#
FROM debian:bullseye-slim

WORKDIR /goatcounter

ENV GOATCOUNTER_DB='sqlite+/goatcounter/db/goatcounter.sqlite3'

RUN apt-get update \
  && apt-get install -y ca-certificates \
  && update-ca-certificates --fresh

COPY --from=build /go/goatcounter/goatcounter /usr/bin/goatcounter
COPY goatcounter ./
COPY entrypoint /entrypoint

VOLUME ["/goatcounter/db"]
EXPOSE 8080

ENTRYPOINT ["/entrypoint"]
CMD ["/goatcounter/goatcounter"]
