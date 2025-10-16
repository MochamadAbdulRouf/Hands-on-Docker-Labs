# MULTISTAGE DOCKERFILE
Go-Lang memiliki fitur untuk melakukan kompilasi kode program Go-Lang menjadi binary file nantinya tidak butuh image Go-Lang lagi.Jadi di Labs ini saya akan melakukan proses kompilasi kode program Go-Lang yang ada di file "main.go".

## IMPLEMENTASI

1. Melakukan build Image
```bash
rouf@docker-client:~/multistage-docker$ docker build -t mochabdulrouf/golang-app .
[+] Building 11.3s (13/13) FINISHED                                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                                              0.1s
 => => transferring dockerfile: 226B                                                                                              0.0s
 => WARN: FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 2)                                                    0.1s
 => [internal] load metadata for docker.io/library/alpine:3                                                                       1.5s
 => [internal] load metadata for docker.io/library/golang:1.18-alpine                                                             1.4s
 => [internal] load .dockerignore                                                                                                 0.0s
 => => transferring context: 2B                                                                                                   0.0s
 => [builder 1/4] FROM docker.io/library/golang:1.18-alpine@sha256:77f25981bd57e60a510165f3be89c901aec90453fd0f1c5a45691f6cb1528  0.0s
 => [stage-1 1/3] FROM docker.io/library/alpine:3@sha256:4b7ce07002c69e8f3d704a9c5d6fd3053be500b7f1c69fc0d80990c2ad8dd412         0.0s
 => CACHED [stage-1 2/3] WORKDIR /app/                                                                                            0.0s
 => [internal] load build context                                                                                                 0.2s
 => => transferring context: 262B                                                                                                 0.0s
 => CACHED [builder 2/4] WORKDIR /app/                                                                                            0.0s
 => [builder 3/4] COPY main.go /app/                                                                                              0.4s
 => [builder 4/4] RUN go build -o /app/main /app/main.go                                                                          7.5s
 => [stage-1 3/3] COPY --from=builder /app/main /app/                                                                             0.4s
 => exporting to image                                                                                                            0.4s
 => => exporting layers                                                                                                           0.3s
 => => writing image sha256:7b557545c91970b824c298bd1a1c9147b66f57a2658e9e8d5302f87833a5a767                                      0.0s
 => => naming to docker.io/mochabdulrouf/golang-app                                                                               0.0s

 2 warnings found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 10)
 - FromAsCasing: 'as' and 'FROM' keywords' casing do not match (line 2)
 ```

 2. Melihat hasil image yang telah di build
 ```bash
 rouf@docker-client:~/multistage-docker$ docker images
REPOSITORY                       TAG                     IMAGE ID       CREATED          SIZE
mochabdulrouf/golang-app         latest                  7b557545c919   10 seconds ago   14.6MB
```

3. Menjalankan container dari image aplikasi Go-Lang
```bash
rouf@docker-client:~/multistage-docker$ docker run -d -p 8080:8080 mochabdulrouf/golang-app:latest
6e56a543c9d6686cf38fd6698ca1be3d2effb6b5d117963e77c4ffb0ae0c41c4
```

4. Memverifikasi apakah container berhasil running
```bash
rouf@docker-client:~/multistage-docker$ docker ps
CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS          PORTS                                         NAMES
6e56a543c9d6   mochabdulrouf/golang-app:latest   "/bin/sh -c /app/main"   19 seconds ago   Up 19 seconds   0.0.0.0:8080->8080/tcp, [::]:8080->8080/tcp   kind_clarke
```

5. Pemeriksaan status Aplikasi Go-Lang berhasil berjalan 
```bash
rouf@docker-client:~/multistage-docker$ docker exec -it 6e /bin/sh
/app # ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 /app/main
   18 root      0:00 /bin/sh
   24 root      0:00 ps aux
/app #
```