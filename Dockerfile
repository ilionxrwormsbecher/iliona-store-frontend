
FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install react-scripts@5.0.0 -g --silent 
RUN npm install -g serve --save

COPY . .

EXPOSE 3000

RUN ["npm", "run", "build"]

ENTRYPOINT ["npm", "run", "starts-prod"]