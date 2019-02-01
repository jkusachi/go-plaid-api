package api

import (
	"net/http"
	"github.com/gorilla/mux"
	"github.com/jkusachi/go-playground/auth"
	"github.com/jkusachi/go-playground/transactions"
	"fmt"
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

	r.HandleFunc("/health", healthcheck)
	r.HandleFunc("/get_access_token", auth.GetAccessToken)
	r.HandleFunc("/auth/get", auth.AuthGet)
	r.HandleFunc("/transactions/get", transactions.GetTransactions)

}
