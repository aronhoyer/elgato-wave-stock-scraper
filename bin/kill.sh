#!/usr/bin/env bash

SCRIPT_PATH="$(dirname $(dirname "$0"))"

kill -9 $(ps aux | grep "[n]ode $SCRIPT_PATH/index.js" | pgrep node)
