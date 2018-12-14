#set -ev 
docker exec cli peer chaincode invoke --orderer orderer.example.com:7050 --channelID mychannel -c '{"Args":["org.hyperledger.fabric:GetMetadata"]}' -n tradenet 2>&1 | gawk -e 'match($0, /payload:(.*)$/, a) {print a[1]}' | jq 'fromjson'    
