# Instalamos Nnode js
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN yarn install
COPY ./ .
RUN yarn build
EXPOSE 8081
# NGINX para levantar un servidor de estaticos.
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf