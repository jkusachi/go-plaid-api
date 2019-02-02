package transactions

import (
	"github.com/jkusachi/go-playground/common"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
	"os"
)

func GetTransactions(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf("%s%s", os.Getenv("API_HOST"), "/transactions/get")

	
	var t TransactionsGetPayload
	err := json.NewDecoder(r.Body).Decode(&t);
	if err != nil {
		log.Fatal(err)
	}
	
	endDate := time.Now().Format("2006-01-02")
	startDate := time.Now().AddDate(0, -1, 0).Format("2006-01-02")

	payload := map[string]interface{}{
		"client_id": os.Getenv("CLIENT_ID"),
		"secret": os.Getenv("SECRET"),
		"access_token": t.AccessToken,
		"start_date": startDate,
		"end_date": endDate,
	}
	jsonBody, _ := json.Marshal(payload)
	body, err := common.MakeJSONPostRequest(url, jsonBody)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(body)
}
