package main

import (
	"os"
	"fmt"
	"net/http"
	"log"
	"github.com/joho/godotenv"
	"github.com/gorilla/mux"	
	"github.com/jkusachi/go-playground/api"	
)	


func main() {

	// load dotenv
	err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
	}
	
	fmt.Printf("ProcessID: %d", os.Getpid())
	fmt.Println("Starting server at http://localhost:3001")

	r := mux.NewRouter()

	api.Setup(r)

	http.Handle("/", r)
	http.ListenAndServe(":3001", nil)

}
