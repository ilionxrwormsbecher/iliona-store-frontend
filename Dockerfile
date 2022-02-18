
FROM node:16

ENV REACT_APP_API_KEY=test

WORKDIR /app


COPY package.json .

RUN npm install

COPY . . 

EXPOSE 3000


CMD ["npm", "start"]