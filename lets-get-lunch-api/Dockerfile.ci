FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .

RUN npm install gulp-cli -g && npm install

#Expose port and start application
EXPOSE 8080
