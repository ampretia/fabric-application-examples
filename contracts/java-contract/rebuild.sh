./gradlew clean build shadowJar
CORE_PEER_ADDRESS=localhost:7052 CORE_CHAINCODE_ID_NAME=mycc:0 java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=7896 -jar build/libs/chaincode.jar
