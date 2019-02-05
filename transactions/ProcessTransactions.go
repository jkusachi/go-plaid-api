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
	startDate := time.Now().AddDate(0, -3, 0).Format("2006-01-02")
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
	transactionMap := make(map[string][]PlaidTransaction)
	typeCount := make(map[string]int)
	categoryCount := make(map[string]int)

	// map account IDs O(n)
	for _, curAccount := range f.Accounts {
		transactionMap[curAccount.AccountID] = []PlaidTransaction{}
	}

	// iterate through transactions O(n)
	for _, curTransaction := range f.Transactions {
		transactionMap[curTransaction.AccountID] = append(transactionMap[curTransaction.AccountID], curTransaction)
		var transactionType = curTransaction.TransactionType
		typeCount[transactionType] = typeCount[transactionType] + 1
		firstCategory := curTransaction.Category[0]
		category := firstCategory
		if len(curTransaction.Category) > 1 {
			secondCategory := curTransaction.Category[1]
			categoryCount[secondCategory] = categoryCount[secondCategory] + 1
		}
		if len(curTransaction.Category) > 2 {
			thirdCategory := curTransaction.Category[2]
			categoryCount[thirdCategory] = categoryCount[thirdCategory] + 1
		}
		categoryCount[category] = categoryCount[category] + 1

	}

	// map account O(n)
	for _, curAccount := range f.Accounts {
		total := 0
		curTransactions := transactionMap[curAccount.AccountID]
		for _, t := range curTransactions {
			total += t.Amount
		}

		accountData = append(accountData, PlaidCustomAccount{
			Account:      curAccount,
			Transactions: curTransactions,
			Stats: Stats{
				Total:   total,
				Average: float64(total) / float64(len(curTransactions)),
			},
		})
	}

	response := CustomResponse{
		Accounts:       accountData,
		TypeCounts:     typeCount,
		CategoryCounts: categoryCount,
	}

	data, _ := json.Marshal(response)
	w.Write(data)

}

func Demo(w http.ResponseWriter, r *http.Request) {

}
