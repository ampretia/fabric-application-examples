set -ev
docker exec cli peer chaincode install -n mycc -v 0 -p /opt/gopath/src/github.com/chaincode/java-contract -l java
