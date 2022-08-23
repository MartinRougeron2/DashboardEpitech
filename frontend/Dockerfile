FROM node:lts-alpine
RUN npm install -g http-server
RUN npm install -g @quasar/cli
WORKDIR /dashboard
COPY /dashboard/package*.json ./
RUN npm install
COPY /dashboard/ .
COPY "dashboard/.env" .
RUN npm run build
EXPOSE 5000
CMD [ "npm", "run", "start" ]
