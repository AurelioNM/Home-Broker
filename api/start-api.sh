yarn install --ignore-engines

docker-compose up -d
echo ==============
echo Dockers running...
docker ps

echo Migrations running...
yarn migration-dev:run

npm run start:dev