Copy-Item ".env.example" ".env"

cd back
npm install

cd ..

cd front
npm install

cd ..

docker compose --profile dev up -d --build
docker compose --profile dev run --rm back-dev node seed.js


