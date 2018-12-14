#!/bin/bash
BIN_PATH=../../bin

rm -rf crypto-config
rm -rf channel-artifacts
mkdir -p channel-artifacts
mkdir -p crypto-config

${BIN_PATH}/cryptogen generate --config=./crypto-config.yaml
${BIN_PATH}/configtxgen -profile TwoOrgsOrdererGenesis -channelID byfn-sys-channel -outputBlock ./channel-artifacts/genesis.block
${BIN_PATH}/configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID papernet
${BIN_PATH}/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/magnetocorpMSPanchors.tx -channelID papernet -asOrg magnetocorpMSP
${BIN_PATH}/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/digibankMSPanchors.tx -channelID papernet -asOrg digibankMSP
