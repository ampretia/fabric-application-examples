#!/bin/bash
#set -ev
ARG1=${1:-Hello}
docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c $(cat data.json) -n hellonet 2>&1

#| gawk -e 'match($0, /payload:(.*)$/, a) {print a[1]}' | jq 'fromjson'
