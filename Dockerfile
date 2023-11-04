FROM node:18
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 5000
CMD [ "npm", "run", "start:production" ]