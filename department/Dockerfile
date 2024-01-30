FROM node:21-alpine
WORKDIR /department
COPY package*.json ./
USER root
RUN yarn install
RUN yarn global add nodemon
COPY --chown=node:node . .