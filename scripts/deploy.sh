#!/bin/bash

echo 'ℹ️  Update npm modules ℹ️'
npm install
echo 'ℹ️  Start build ℹ️'
rm -r ./dist

npm run build
echo '✅ End build ✅'

echo 'ℹ️ Deploying ℹ️'

aws s3 sync dist/ s3://songsin-web-bucket

echo '✅ Successfully deployed ✅'
rm -r ./dist
