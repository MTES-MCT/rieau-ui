#!/bin/bash
set -e

echo "window.env = `jo \`env | grep REACT_APP_\` end=1`" > static/js/env.js
nginx -g "daemon off;"