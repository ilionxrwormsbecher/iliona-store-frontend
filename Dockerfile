
FROM node:16-alpine

ENV REACT_APP_API_KEY=test

WORKDIR /app


COPY package.json .

RUN npm install
RUN npm install react-scripts@5.0.0 -g --silent 
RUN npm install -g serve --save

COPY . .

EXPOSE 3000


CMD ["npm", "run", "starts-prod"]