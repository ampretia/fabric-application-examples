set -ev

docker stop $(docker ps -aq) || true
docker rm $(docker ps -aq) || true
docker rmi $(docker images dev* -q) || true
docker volume prune -f || true
docker network prune -f || true


