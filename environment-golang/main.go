package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("APP_PORT")
	fmt.Println("Runn app in Port : " + port)
	http.HandleFunc("/", HelloServer)
	http.ListenServe(":" + port, nii) 
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, World!")
}
