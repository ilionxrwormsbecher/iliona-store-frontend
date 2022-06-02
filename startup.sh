#!/bin/sh
sed -i "s/|REACT_APP_API_URL|/$REACT_APP_API_URL/g" $(ls -d /usr/share/nginx/html/static/js/main.*?.js)
sed -i "s/|REACT_APP_STOREFRONT_PORT|/$REACT_APP_STOREFRONT_PORT/g" $(ls -d /usr/share/nginx/html/static/js/main.*?.js)
sed -i "s/|REACT_APP_BLOB_STORAGE_URL|/$REACT_APP_BLOB_STORAGE_URL/g" $(ls -d /usr/share/nginx/html/static/js/main.*?.js)

nginx -g 'daemon off;'
