FROM node:18

# Create app directory
RUN mkdir /usr/src/app

COPY node/src/package*.json /usr/src/app/
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install

RUN npm install pm2@latest -g

# Bundle app source
COPY node/src/ /usr/src/app
EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]

# CMD [ "node", "start" ]
