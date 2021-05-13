FROM node:14.16.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]