
FROM node:16

WORKDIR /app

ARG api_url=""
ARG storefront_port=""
ARG blob_storage_url=""

ENV REACT_APP_API_URL=$api_url 
ENV REACT_APP_STOREFRONT_PORT=$storefront_port 
ENV REACT_APP_BLOB_STORAGE_URL=$blob_storage_url 

COPY package.json .

RUN npm install
RUN npm install react-scripts@5.0.0 -g --silent 
RUN npm install -g serve --save

COPY . .

EXPOSE 3000

RUN ["npm", "run", "build"]
ENTRYPOINT ["npm", "run", "starts-prod"]