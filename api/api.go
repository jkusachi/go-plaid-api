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

	// r.HandleFunc("/", healthcheck)

	// This will serve files under http://localhost:8000/static/<filename>
	// fs := http.FileServer(http.Dir("static"));
	// r.PathPrefix("/static/").Handler(fs)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./static/")))




	r.HandleFunc("/get_access_token", auth.GetAccessToken)
	r.HandleFunc("/auth/get", auth.AuthGet)
	r.HandleFunc("/transactions/get", transactions.GetTransactions)

}
