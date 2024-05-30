cd apidocs
npm run build
cd ../frontend
npm run build
cd ../backend
node --env-file=.env server