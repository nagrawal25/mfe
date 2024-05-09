#!/bin/sh
set -o nounset -o errexit
cd `dirname $0`

echo '### Install container dependencies'
cd container
npm ci

echo '### Install TODO dependencies'
cd ../todo-list-mfe
npm ci