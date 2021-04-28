# This is where image for the server A is defined.

FROM node:10

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
