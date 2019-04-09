#!/bin/bash

set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${ROOT}

echo "APP: ${APP}"
echo "APP_ENV: ${APP_ENV}"
echo "ROOT: ${ROOT}"

yarn install --no-emoji --no-progress --non-interactive && NODE_ENV=production yarn run build
