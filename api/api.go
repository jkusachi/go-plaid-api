package api

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jkusachi/go-playground/auth"
	"github.com/jkusachi/go-playground/transactions"
)

func healthcheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Health OK")
}

func Setup(r *mux.Router) {

	// r.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/build/")))

	buildHandler := http.StripPrefix("/underwriter/home", http.FileServer(http.Dir("client/build")))
	r.PathPrefix("/underwriter/home").Handler(buildHandler)

	beginHandler := http.StripPrefix("/underwriter/begin", http.FileServer(http.Dir("client/build")))
	r.PathPrefix("/underwriter/begin").Handler(beginHandler)

	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("client/build/static")))
	r.PathPrefix("/static/").Handler(staticHandler)

	r.HandleFunc("/health", healthcheck).Methods("GET")
	r.HandleFunc("/get_access_token", auth.GetAccessToken).Methods("POST")
	r.HandleFunc("/auth/get", auth.AuthGet).Methods("POST")
	r.HandleFunc("/transactions/get", transactions.GetTransactions).Methods("POST")
	r.HandleFunc("/transactions/process", transactions.ProcessTransactions).Methods("POST")
	r.HandleFunc("/transactions/demo", transactions.Demo).Methods("POST")

}
