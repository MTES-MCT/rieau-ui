#!/bin/bash

echo "Set PUBLIC_URL and REACT_APP_NAME to index.html"
sed -i -e "s,___PUBLIC_URL___,$PUBLIC_URL,g" public/index.html
sed -i -e "s,___REACT_APP_NAME___,$REACT_APP_NAME,g" public/index.html
echo "PUBLIC_URL=$PUBLIC_URL and REACT_APP_NAME=$REACT_APP_NAME set to index.html"