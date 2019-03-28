## Version 2.0-master branch level infrastructure

These are notes on how to setup a master branch level Fabric Infrastructure

- Draft documentation on the updated byfn network 
  - https://logs.hyperledger.org/production/vex-yul-hyp-jenkins-3/fabric-docs-build-x86_64/1522/html/build_network.html#install-and-define-a-chaincode
- The updated byfn that will support this ->
  - https://gerrit.hyperledger.org/r/#/c/30236/
  - Cherry pick this on top of the master level fabric-samples repo

## This directory

- bin: built copy of the v2 master binaries
- getEdgeFabricDocker.sh : script to get the latest v2 master branch docker images
- two-orgs:  a two org, tls enabled infrastructure
- monitordocker.sh: the script to monitor all docker containers on a given network

