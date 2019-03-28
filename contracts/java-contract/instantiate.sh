set -ev
docker exec cli peer chaincode instantiate -n mycc -v 0 -l java -c '{"Args":["setupLedger"]}' -C mychannel   