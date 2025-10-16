# BUILD STAGE 1

# Image golang ini memiliki alat kompilasi untuk Go-Lang yang lengkap
FROM golang:1.18-alpine as builder
WORKDIR /app/
COPY main.go /app/
RUN go build -o /app/main /app/main.go


# BUILD STAGE 2
FROM alpine:3
WORKDIR /app/

# Mengambil hasil file main dari komplilasi di stage 1
COPY --from=builder /app/main /app/

# Perintah untuk menjalankan aplikasi
CMD /app/main