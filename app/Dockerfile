FROM node:18

# Create app directory
RUN mkdir /usr/src/app
RUN npm install -g ts-node;
RUN npm install -g typescript;

COPY ./package*.json /usr/src/app/
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install

RUN npm install pm2@latest -g
# Bundle app source
COPY ./ /usr/src/app
EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]

# CMD [ "node", "start" ]
