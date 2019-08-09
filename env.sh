#!/bin/bash

echo "Set PUBLIC_URL and REACT_APP_NAME to index.html"
rm -rf public/index.html
cp public/index.html.template public/index.html
sed -i -e "s,___PUBLIC_URL___,$PUBLIC_URL,g" public/index.html
sed -i -e "s,___REACT_APP_NAME___,$REACT_APP_NAME,g" public/index.html
echo "PUBLIC_URL=$PUBLIC_URL and REACT_APP_NAME=$REACT_APP_NAME set to index.html"

echo "Creating env.js"
# Recreate config file
rm -rf ./env.js
touch ./env.js

# Add assignment 
echo "window.env = {" >> ./env.js

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}
  
  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> ./env.js
done < .env

echo "}" >> ./env.js
echo "env.js created"