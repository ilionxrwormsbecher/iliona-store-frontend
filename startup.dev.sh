sed -i 's/|REACT_APP_API_URL|/http:\/\/localhost:8001\//g' $(ls -d /usr/share/nginx/html/static/js/main.*?.js)
sed -i 's/|REACT_APP_STOREFRONT_PORT|/10002/g' $(ls -d /usr/share/nginx/html/static/js/main.*?.js)
sed -i 's/|REACT_APP_BLOB_STORAGE_URL|/https:\/\/ilionadev1001.blob.core.windows.net\/app-store-logos\//g' $(ls -d /usr/share/nginx/html/static/js/main.*?.js)

nginx -g 'daemon off;'