#set -ev

docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c '{"Args":["transaction2","INFO"]}' -n logging-example 2>&1

