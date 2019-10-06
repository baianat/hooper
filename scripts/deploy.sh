#!/bin/bash

# abort on errors
set -e

npm version patch
npm run build
npm publish
git push