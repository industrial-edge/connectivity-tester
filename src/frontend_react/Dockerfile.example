# Copyright 2022 Siemens AG
# This file is subject to the terms and conditions of the MIT License.  
# See LICENSE file in the top-level directory

# This Dockerfile builds the React front end for nginx.
# It also proxies /api requests to api:5000

# Build step #1: build the React front end
FROM node:18 AS build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
COPY ./src ./src
COPY ./public ./public

RUN apt update && apt install python -y

RUN npm install
RUN npm run build

# Build step #2: build an nginx container
FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html/conntest
COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf

# Change user to non-root
RUN addgroup -S edge && adduser -S -G edge edge
RUN chown -R edge:edge /var/cache/nginx && \
    chown -R edge:edge /var/log/nginx && \
    chown -R edge:edge /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R edge:edge /var/run/nginx.pid
USER edge
