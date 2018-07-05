export GOPATH=/home/matthew/go
export DEVMODE=true 
export PATH=${GOPATH}/src/github.com/hyperledger/fabric/build/bin:$PATH
export CORE_CHAINCODE_ID_NAME=mycontract4:v1
export CORE_PEER_MSPCONFIGPATH=${GOPATH}/src/github.com/hyperledger/fabric-samples/basic-network/crypto-config/peerOrganizations/org1.example.com/users/Admin\@org1.example.com/msp
export CORE_PEER_LOCALMSPID=Org1MSP 
export FABRIC_CFG_PATH=${GOPATH}/src/github.com/hyperledger/fabric/sampleconfig
