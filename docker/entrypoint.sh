#!/bin/bash

echo "Set SERVER_PORT to the NGINX config"
sed -i -e "s,___SERVER_PORT___,$SERVER_PORT,g" /etc/nginx/conf.d/default.conf.template
mv /etc/nginx/conf.d/default.conf.template /etc/nginx/conf.d/default.conf
echo "SERVER_PORT=$SERVER_PORT set to the NGINX config"

source env.sh
mv env.js static/js/

mv index.html public/index.html
rm index.html.template
source index.sh
mv public/index.html index.html
rm -R public

nginx -g 'daemon off;'