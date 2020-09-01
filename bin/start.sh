#!/usr/bin/env bash

SCRIPT_PATH="$(dirname $(dirname "$0"))"

if ! ps aux | grep "[n]ode $SCRIPT_PATH/index.js" > /dev/null; then
  nohup $SCRIPT_PATH/index.js > $SCRIPT_PATH/output.log &
fi

unset SCRIPT_PATH
