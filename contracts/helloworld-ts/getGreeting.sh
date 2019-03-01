#set -ev

docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c '{"Args":["getGreeting"]}' -n hellonet 2>&1| gawk -e 'match($0, /payload:(.*)$/, a) {print a[1]}' | jq 'fromjson'

#docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel-2 -c '{"Args":["getGreeting"]}' -n hellonet 2>&1| gawk -e 'match($0, /payload:(.*)$/, a) {print a[1]}' | jq 'fromjson'

