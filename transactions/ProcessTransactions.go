package transactions

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jkusachi/go-playground/common"
)

func ProcessTransactions(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ProcessTransactions")

	url := fmt.Sprintf("%s%s", os.Getenv("API_HOST"), "/transactions/get")
	var t TransactionsGetPayload
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal(err)
	}

	endDate := time.Now().Format("2006-01-02")
	startDate := time.Now().AddDate(0, -1, 0).Format("2006-01-02")
	payload := map[string]interface{}{
		"client_id":    os.Getenv("CLIENT_ID"),
		"secret":       os.Getenv("SECRET"),
		"access_token": t.AccessToken,
		"start_date":   startDate,
		"end_date":     endDate,
	}
	jsonBody, _ := json.Marshal(payload)

	body, err := common.MakeJSONPostRequest(url, jsonBody)
	if err != nil {
		log.Fatal(err)
	}

	var f PlaidResponse
	json.Unmarshal(body, &f)

	accountData := []PlaidCustomAccount{}
	transactionMap := map[string][]PlaidTransaction{}

	// map account IDs O(n)
	for _, curAccount := range f.Accounts {
		transactionMap[curAccount.AccountID] = []PlaidTransaction{}
	}

	// iterate through transactions O(n)
	for _, curTransaction := range f.Transactions {
		transactionMap[curTransaction.AccountID] = append(transactionMap[curTransaction.AccountID], curTransaction)
	}

	// map account O(n)
	for _, curAccount := range f.Accounts {
		accountData = append(accountData, PlaidCustomAccount{
			Account:      curAccount,
			Transactions: transactionMap[curAccount.AccountID],
		})
	}

	data, _ := json.Marshal(accountData)
	w.Write(data)
	// w.Write(body)

}

func Demo(w http.ResponseWriter, r *http.Request) {

}
