FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install -g @angular/cli && npm install
RUN apt-get update \
    && apt-get install -y --no-install-recommends chromium


ENV CHROME_BIN=chromium

#Expose port and start application
EXPOSE 4200
