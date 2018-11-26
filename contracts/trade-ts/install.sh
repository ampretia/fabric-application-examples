set -ev
docker exec cli peer chaincode install -n tradenet -v 1 -p /opt/gopath/src/github.com/trade-ts -l node