./gradlew clean build shadowJar
CORE_PEER_ADDRESS=localhost:17059 CORE_CHAINCODE_ID_NAME=java-helloworld:0.0.3 java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=7896 -jar build/libs/chaincode.jar
