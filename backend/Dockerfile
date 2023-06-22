FROM php:8.1-fpm

RUN apt-get update;

RUN apt-get update && apt-get install -y \
        build-essential \
         curl \
         git \
         netcat \
         net-tools \
         unzip \
         vim \
         wget \
         libssl-dev \
         libcurl4-openssl-dev \
         pkg-config \
         zlib1g-dev

RUN pecl install mongodb
RUN docker-php-ext-enable mongodb

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/backend

CMD composer install;  php-fpm

EXPOSE 9000

