FROM node:17-alpine as back-all-stage
WORKDIR /
COPY package.json .
RUN npm install
COPY . .
COPY ".env" .
EXPOSE 3000
CMD [ "npm", "run", "serve" ]
