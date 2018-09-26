

mkdir -p /tmp/directory/node_modules
cp package.json ${tmp}

npm install --prefix ${tmp} --production
sdk package up

meta data...
then can deploy it
