FROM php:8.2-fpm-alpine

# Install ekstensi PHP yang dibutuhkan aplikasi Laravel
RUN apk add --no-cache \
    build-base \
    linux-headers \
    mysql-client \
    nodejs \
    npm \
    libzip-dev \
    zip \
    oniguruma-dev \
    gd-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libwebp-dev \
    $PHPIZE_DEPS 

# Install ektensi PHP yang umum digunakan laravel
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install ektensi redis menggunakan pecl
RUN pecl install redis && docker-php-ext-enable redis

# Install Composer (Dependency Manager for PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# buat user non-root untuk keamanan
RUN addgroup -g 1000 sail && \
    adduser -u 1000 -G sail -s /bin/sh -D sail

# Ganti ke user non-root
USER sail

# Set working directory
WORKDIR /var/www/html