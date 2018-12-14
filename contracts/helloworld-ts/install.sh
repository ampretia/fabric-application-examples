set -ev
docker exec cli peer chaincode install -n hellonet -v 1 -p /opt/gopath/src/github.com/contracts/helloworld-ts -l node
