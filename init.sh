#!/bin/sh

npx prisma db push --preview-feature
npx prisma generate

npm start

