```bash
cd fabric-samples/basic-network
./start.sh

# (magnetocorp admin)$ 
cd commercial-paper/ organization/magnetocorp/configuration/cli/
monitor_docker.sh net_basic

cd commercial-paper/organization/magnetocorp/configuration/cli/
docker-compose -f docker-compose.yml up -d cliMagnetoCorp

docker exec cliMagnetoCorp peer chaincode install -n papercontract -v 0 -p /opt/gopath/src/github.com/contract -l node
docker exec cliMagnetoCorp peer chaincode instantiate -n papercontract -v 0 -l node -c '{"Args":["org.papernet.commercialpaper:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

#(magnetocorp user)$ 
cd commercial-paper/organization/magnetocorp/application/
node addToWallet.js
node issue.js

# (digibank admin)$ 
cd commercial-paper/organization/digibank/contract/
node addToWallet.js
node buy.js
node redeem.js
```