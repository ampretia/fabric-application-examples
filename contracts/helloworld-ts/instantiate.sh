set -ev
docker exec cli peer chaincode instantiate -n hellonet -v 1 -l node -c '{"Args":["Greeting:instantiate"]}' -C mychannel   