#!/bin/bash

echo "Set PUBLIC_URL to all built files"
find ./ -type f -name "*.*" -exec sed -i -e "s,___PUBLIC_URL___,$PUBLIC_URL,g" {} \;
echo "PUBLIC_URL=$PUBLIC_URL set to all built files"

echo "Set REACT_APP_NAME to all built files"
find ./ -type f -name "*.*" -exec sed -i -e "s,___REACT_APP_NAME___,$REACT_APP_NAME,g" {} \;
echo "REACT_APP_NAME=$REACT_APP_NAME set to all built files"