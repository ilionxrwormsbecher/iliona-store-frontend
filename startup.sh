#!/bin/sh
sed -i 's/|REACT_APP_API_URL|/VALUE/g' $(ls -d /usr/share/nginx/html/static/js/main.*?.js)
sed -i 's/|REACT_APP_STOREFRONT_PORT|/VALUE/g' $(ls -d /usr/share/nginx/html/static/js/main.*?.js)
sed -i 's/|REACT_APP_BLOB_STORAGE_URL|/VALUE/g' $(ls -d /usr/share/nginx/html/static/js/main.*?.js)

nginx -g 'daemon off;'