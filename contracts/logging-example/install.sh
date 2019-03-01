set -ev
docker exec cli peer chaincode install -n logging-example -v 1 -p /opt/gopath/src/github.com/contracts/logging-example -l node
