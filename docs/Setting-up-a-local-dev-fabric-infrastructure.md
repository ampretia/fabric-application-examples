# Setting up local Fabric Infrastructure

This tutorial downloading and creating Hyperledger Fabric instance, configuring the Hyperledger Fabric instance for development mode.

## Downloading Hyperledger Fabric 1.3.0
You'll need to download the latest Hyperledger Fabric docker images, and also it is helpful to have the `fabric-samples` repository.

Create a working directory where you can store some setup scripts, and where the samples directory will be.


1. Create a working directoy - location and name at your discretion of course; 

```bash
mkdir -p ~/dev-expr
cd ~/dev-expr
```

2. Run these commands to get the Hyperledger Fabric 1.3.0 bootstrap script

```bash
curl -sSO https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh
chmod +x bootstrap.sh
```

4. Run the bootstrap.sh script to get the docker containers needed

```bash
./bootstrap.sh 1.4.0-rc1   
```

## Enabling development mode
Development mode requires you to run the smart contract container locally, instead of the peer creating a Docker container. By running the smart contract locally, you can access logs easily, and can bring up new smart contract versions quickly.

For simplicity, we're going to use the Hyperledger Fabric basic-network sample. The basic-network sample is a simple Hyperledger Fabric implementation, including a peer, a certificate authority, and an orderer.

The basic-network sample is included the `basic-network` directory of the `fabric-samples` directory. The `docker-composer.yaml` file must be edited to enable development mode.
1. Navigate to the `basic-network` directory.
2. Open the `docker-compose.yaml` file.
3. Using a text editor, find the following lines:

```yaml
command: peer node start
# command: peer node start --peer-chaincodedev=true
```

4. Comment out, or delete, `command: peer node start` and remove the comment around `command: peer node start --peer-chaincodedev=true`. It should look as follows:

```yaml
# command: peer node start
command: peer node start --peer-chaincodedev=true
```

5. The peer also needs to have the port that chaincode containers talk back to the peer on exposed. This isn't normally required due to the way the peer starts up the docker container for the chaincode. In development mode however, you are taking on the responsibility to start/stop the chaincode.

Adjust the ports for the peer to be as follows by adding in `7052:7052` - this should be just below the line you've already changed.

```yaml
    ports:
      - 7051:7051
      - 7052:7052
      - 7053:7053
```

If however you wish to keep in production mode, then don't alter the docker-compose file at all!

### Starting the Hyperledger Fabric basic-network
The next step is start Hyperledger Fabric instance. We start according to the configuration specified in the basic-network sample.
1. Navigate to the `basic-network` directory, (if not already there)
2. To start the Hyperledger Fabric instance, run the following command:

```bash
./start.sh
```

`start` will also shut down the running fabric if needed first

### Monitoring Fabric  
It can be very useful, (and educational) to closely monitor the output of the docker containers. the `docker logs` command can do this - but has a drawback that you need to know the container id first. As Fabric creates docker containers for running smart contacts, this can be tricky. 

The following script uses a utility called `logspout` to be able to capture all the docker output in a single window. Each container's output is colour coded.

```bash
#!/bin/bash

# This script uses the logspout and http stream tools to let you watch the docker containers
# in action.
#
# More information at https://github.com/gliderlabs/logspout/tree/master/httpstream

if [ -z "$1" ]; then
   DOCKER_NETWORK=net_basic
else 
   DOCKER_NETWORK="$1"
fi

echo Starting monitoring on all containers on the network ${DOCKER_NETWORK}   

docker kill logspout 2> /dev/null 1>&2 || true
docker rm logspout 2> /dev/null 1>&2 || true

docker run -d --name="logspout" \
	--volume=/var/run/docker.sock:/var/run/docker.sock \
	--publish=127.0.0.1:8000:80 \
	--network  ${DOCKER_NETWORK} \
	gliderlabs/logspout  
sleep 3
curl http://127.0.0.1:8000/logs
```

## Next steps

- [Basic introduction to contract programming](./Into-to-1.4-contract-programming.md)