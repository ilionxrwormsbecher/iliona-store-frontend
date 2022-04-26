
# FROM node:16

# ENV REACT_APP_API_KEY=test

# WORKDIR /app


# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 3000


# CMD ["npm", "start"]


# # #############################   Stage 0, Build the app   #####################
# # pull official base image
# FROM node:16 as build-stage
# # set working directory
# WORKDIR /app
# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# # install app dependencies
# COPY package*.json ./
# #RUN npm install
# RUN npm install

# # add app
# COPY . ./

# #build for production
# RUN npm run-script build

# # #### Stage 1, push the compressed  built app into nginx ####
# FROM nginx:1.17

# COPY --from=build-stage /app/build/ /usr/share/nginx/html






FROM node:16
# set working directory
RUN mkdir /usr/src/reactapp
WORKDIR /usr/src/reactapp
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/reactapp/node_modules/.bin:$PATH

COPY . /usr/src/reactapp
RUN npm install -g npm@8.7.0` to update!
RUN npm install --silent 
USER root
RUN npm install react-scripts@5.0.0 -g --silent 
RUN npm install -g serve --save
# start app
CMD ["npm", "starts-pod"]