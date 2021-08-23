package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		image, handler, err := r.FormFile("image")

		defer image.Close()

		f, err := os.OpenFile(handler.Filename, os.O_WRONLY|os.O_CREATE, 0777)
		if err != nil {
			fmt.Println(err)
			return
		}
		defer f.Close()
		io.Copy(f, image)
	})
	fmt.Println("Server is listening...")
	http.ListenAndServe(":26002", nil)

}
