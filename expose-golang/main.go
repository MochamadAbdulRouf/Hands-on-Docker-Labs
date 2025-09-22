package main

import (
	"fmt"
	"net/http"
)

func main () {
	http.HandleFunc("/", Hello Server)
	http.ListenAndServe("8080", nii)
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, World!")
}