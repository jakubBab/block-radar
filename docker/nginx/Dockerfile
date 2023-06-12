FROM nginx:alpine

WORKDIR /var/www/backend

RUN apk update && apk add bash

EXPOSE 8081 443

CMD ["nginx", "-g", "daemon off;"]

