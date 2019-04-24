
### Clone the example repository locally:
```
git clone https://github.com/ampretia/fabric-application-examples.git
```

We'll be using the very latest Fabric v2.0.0-alpha images - so we need to get these, first the very latest docker images, and then the binaries

```
cd fabric-application-examples/infrastructure
curl -sSL http://bit.ly/2ysbOFE | bash -s -- -s 2.0.0-alpha 2.0.0-alpha 0.4.15
```

For even more cutting edge images that the alpha, use the script `./getEdgeFabricDocker.sh` to get the docker images.

### Start as very basic Fabric topology - in a console window that you can leave open monitoring the docker images

```
cd basic-network
./start.sh
./monitordocker.sh
```

### Build the Java Contract APIs and Docker container

In a different window and directory
```
git fetch https://gerrit.hyperledger.org/r/fabric-chaincode-java refs/changes/78/28978/14 && git cherry-pick FETCH_HEAD
git fetch https://gerrit.hyperledger.org/r/fabric-chaincode-java refs/changes/80/30980/1 && git checkout FETCH_HEAD
./gradlew :fabric-chaincode-shim:classes :fabric-chaincode-shim:install 
./gradlew fabric-chaincode-docker:buildImage  
# get a cup of tea
```

[first is the implementations, second some fixes on top those]


### Build the java contract:

```
cd ../../contracts/java-contract
./gradlew clean build shadowJar
```

### Deploy the Smart Contract

```
docker exec -it cli bash
peer lifecycle chaincode package pc0.tar.gz --path /opt/gopath/src/github.com/contracts/java-contract/ --lang java --label pc_0
peer lifecycle chaincode install pc0.tar.gz
export CC_PACKAGE_ID=$(peer lifecycle chaincode queryinstalled 2>&1 | awk -F "[, ]+" '/Label: /{print $3}') && echo $CC_PACKAGE_ID
peer lifecycle chaincode approveformyorg --channelID mychannel --name pc_0 --version 0.0.3 --package-id $CC_PACKAGE_ID --sequence 1 --waitForEvent
peer lifecycle chaincode commit -o orderer.example.com:7050 --channelID mychannel --name pc_0 --version 0.0.3 --sequence 1 --waitForEvent
```

You can now invoke the tranasction functions
```
peer chaincode invoke -o orderer.example.com:7050 --channelID mychannel --name pc_0 --version 0.0.3 -c '{"Args":["GreetingContract:setupledger"]}'
```


