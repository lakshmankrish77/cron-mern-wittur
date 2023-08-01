FROM node:16.17.1

WORKDIR /cron-mern-wittur

COPY package*.json ./

RUN npm install

COPY . .

# Use script specified in package.json
CMD ["node", "cron.js"]