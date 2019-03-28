# How to run the example

This is how, pesonally, as a developer and contributor I would run this example

Assume in the `fabric-application-examples/infrastructure` direcotyr

Essential the first time, or if you're not sure what images are available, to clear out docker containers, volumes, and images
```
docker kill $(docer ps -q) && docker rm $(docker ps -aq)
docker rmi $(docker images -q ) --force   # this is EVERYTHING be warned... 
docker volume prune -f
docker network prune -f
```

Then get the latest 'edge' or 'master' branch docker images (patience as previous step deleted them all)
```
./getEdgeFabricDocker.sh
# time passes
hyperledger/fabric-tools     amd64-master        c5ab6b163f3d        9 hours ago         469MB
hyperledger/fabric-tools     latest              c5ab6b163f3d        9 hours ago         469MB
hyperledger/fabric-ccenv     2.0.0               0a3c764a1d85        9 hours ago         638MB
hyperledger/fabric-ccenv     amd64-master        0a3c764a1d85        9 hours ago         638MB
hyperledger/fabric-ccenv     latest              0a3c764a1d85        9 hours ago         638MB
hyperledger/fabric-ca        amd64-master        f5a580d68827        9 hours ago         53MB
hyperledger/fabric-ca        latest              f5a580d68827        9 hours ago         53MB
hyperledger/fabric-orderer   amd64-master        12db70502ae9        9 hours ago         39.7MB
hyperledger/fabric-orderer   latest              12db70502ae9        9 hours ago         39.7MB
hyperledger/fabric-peer      amd64-master        d8b6b0e0ce44        9 hours ago         46.6MB
hyperledger/fabric-peer      latest              d8b6b0e0ce44        9 hours ago         46.6MB
hyperledger/fabric-baseos    2.0.0               3914d1d37fd7        9 hours ago         6.92MB
hyperledger/fabric-baseos    amd64-master        3914d1d37fd7        9 hours ago         6.92MB
hyperledger/fabric-baseos    latest              3914d1d37fd7        9 hours ago         6.92MB
hyperledger/fabric-nodeenv   2.0.0               4de323fc5f34        5 days ago          256MB
hyperledger/fabric-nodeenv   amd64-master        4de323fc5f34        5 days ago          256MB
hyperledger/fabric-nodeenv   latest              4de323fc5f34        5 days ago          256MB
hyperledger/fabric-javaenv   2.0.0               ce36cf04a789        2 weeks ago         410MB
hyperledger/fabric-javaenv   amd64-master        ce36cf04a789        2 weeks ago         410MB
hyperledger/fabric-javaenv   latest              ce36cf04a789        2 weeks ago         410MB
```

Create the crypto-material
```
cd two-orgs/commercial-paper-network
./create.sh
```

Start the containers and get the channel setup (note that I would like to move the channel setup away from this script; it doesn't show the actions required by the admins in the organizations)

```
./start-tls.sh
# wait
 docker ps
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                                                                              NAMES
aaa5554d603c        hyperledger/fabric-tools     "/bin/bash"              14 seconds ago      Up 12 seconds                                                                                          cli
644e9d7513de        hyperledger/fabric-peer      "peer node start --p…"   16 seconds ago      Up 13 seconds       0.0.0.0:7051-7053->7051-7053/tcp                                                   peer1.magnetocorp.example.com
912771f761bf        hyperledger/fabric-peer      "peer node start --p…"   17 seconds ago      Up 15 seconds       7051/tcp, 0.0.0.0:8051->8051/tcp, 0.0.0.0:8052->7052/tcp, 0.0.0.0:8053->7053/tcp   peer5.digibank.example.com
e5731e9747b1        hyperledger/fabric-orderer   "orderer"                40 seconds ago      Up 19 seconds       0.0.0.0:7050->7050/tcp                                                             orderer1.magnetocorp.example.com
a419225431d8        hyperledger/fabric-ca        "sh -c 'fabric-ca-se…"   40 seconds ago      Up 19 seconds       0.0.0.0:7054->7054/tcp                                                             camagnetocorp
953983fca174        hyperledger/fabric-couchdb   "tini -- /docker-ent…"   40 seconds ago      Up 17 seconds       4369/tcp, 9100/tcp, 0.0.0.0:6984->5984/tcp                                         couchdb5
3cd95af9b955        hyperledger/fabric-ca        "sh -c 'fabric-ca-se…"   40 seconds ago      Up 18 seconds       0.0.0.0:8054->7054/tcp                                                             cadigibank
b0b40a9d2623        hyperledger/fabric-couchdb   "tini -- /docker-ent…"   40 seconds ago      Up 16 seconds       4369/tcp, 9100/tcp, 0.0.0.0:5984->5984/tcp                                         couchdb1
```

At this point would suggest starting the monitor script in this terinal window, and then opening another two windows to act as admins from two orgs.

```
cd ../..  # back to the infrastructure directory
./monitordocker.sh commercialpaper-net
```

Open up two additional terminal windows, one in the directory of
`infrastructure/two-orgs/organization/magnetocorp/configuration/cli/` and the other in `infrastructure/two-orgs/organization/digibank/configuration/cli/`

In *magnetocorp* issue
```
docker-compose up -d && docker exec -it cliMagnetoCorp bash
PS1='magnetocorp> '
```
Last bit so the prompt is set to avoid confusion

```
docker-compose up -d && docker exec -it cliDigiBank bash
PS1='digibank> '
```

In BOTH issue the commands to package the contract and install it
```
peer lifecycle chaincode package pc0.tar.gz --path /opt/gopath/src/github.com/contract --lang node --label pc_0
peer lifecycle chaincode install pc0.tar.gz
```

In BOTH get the id of the installed contract

```
peer lifecycle chaincode queryinstalled
Get installed chaincodes on peer:
Package ID: pc_0:09ecc1badc5fe52c0b7386cb5c3a8ed8ca5da09ef03148d78067e45c292b27e6, Label: pc_0
```

In BOTH, set the variable `CC_PACKAGE_ID` to equal whatever is showd as the pacakge id, eg
```
 export CC_PACKAGE_ID=pc_0:09ecc1badc5fe52c0b7386cb5c3a8ed8ca5da09ef03148d78067e45c292b27e6
```

And while we here.. set the following as well - just to make the next set of commands eaiser
```
export CHANNEL_NAME=papernet
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/magnetocorp.example.com/orderers/orderer1.magnetocorp.example.com/msp/tlscacerts/tlsca.magnetocorp.example.com-cert.pem
```

In BOTH the admins need to approve for the their organization this chaincode
```
peer lifecycle chaincode approveformyorg --channelID $CHANNEL_NAME --name papercontract -v 0 --package-id $CC_PACKAGE_ID --sequence 1 --policy "AND ('Org1MSP.member')" --waitForEvent --tls --cafile ${ORDERER_CA}
```

In ONE only, say magnetocorp the admin can commit the chaincode

```
peer lifecycle chaincode commit -o orderer1.magnetocorp.example.com:7050  --channelID $CHANNEL_NAME --name papercontract --version 0 --sequence 1 --init-required --tls true --cafile $ORDERER_CA --waitForEvent --peerAddresses peer1.magnetocorp.example.com:7051 --tlsRootCertFiles  /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/magnetocorp.example.com/peers/peer1.magnetocorp.example.com/tls/ca.crt  --peerAddresses peer5.digibank.example.com:8051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/digibank.example.com/peers/peer5.digibank.example.com/tls/ca.crt
```



