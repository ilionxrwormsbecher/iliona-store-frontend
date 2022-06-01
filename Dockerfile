FROM node:16.3.0 as build-stage
WORKDIR /app

# Set env variables
ENV REACT_APP_API_URL="|REACT_APP_API_URL|" 
ENV REACT_APP_STOREFRONT_PORT="|REACT_APP_STOREFRONT_PORT|"
ENV REACT_APP_BLOB_STORAGE_URL="|REACT_APP_BLOB_STORAGE_URL|" 

#copy the package.json plus lockfile. use the frozen install command to make sure nothing changes from the package*.json.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# make sure to install react-scrips as global to the machine thats building the package.
RUN npm install react-scripts@5.0.0 -g

# Copy the files and run the build.
COPY . ./
RUN npm run build

# Copy the files over to Nginx
FROM nginx:stable
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY startup.sh /opt/store/startup.sh

# Copy the default nginx.conf and post build script.
COPY default.conf /etc/nginx/conf.d/default.conf
CMD ["bash","/opt/store/startup.sh"]