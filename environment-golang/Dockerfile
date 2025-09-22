FROM golang:1.18-alpine
# Buat environment variable untuk port aplikasi
ENV APP_PORT=8080       

RUN mkdir app
COPY main.go app 

# EXPOSE port aplikasi menggunakan environment variable yang telah dibuat
EXPOSE ${APP_PORT}
CMD go run app/main.go
