package transactions

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
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
		curTransaction.Amount = curTransaction.Amount * -1
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
		var total float64 = 0
		transactionsOver1000 := 0
		transactionsOver200 := 0
		var totalIn float64 = 0
		var totalOut float64 = 0
		curTransactions := transactionMap[curAccount.AccountID]
		for _, t := range curTransactions {
			total += float64(t.Amount)
			if t.Amount >= 1000 {
				transactionsOver1000++
			}
			if t.Amount >= 200 {
				transactionsOver200++
			}
			if t.Amount > 0 {
				totalIn += float64(t.Amount)
			}
			if t.Amount < 0 {
				totalOut += float64(t.Amount)
			}
		}

		accountData = append(accountData, PlaidCustomAccount{
			Account:      curAccount,
			Transactions: curTransactions,
			Stats: Stats{
				Total:                total,
				Average:              float64(total) / float64(len(curTransactions)),
				TransactionsOver1000: transactionsOver1000,
				TransactionsOver200:  transactionsOver200,
				TotalIn:              totalIn,
				TotalOut:             totalOut,
				SpendPercentage:      math.Abs(totalOut / totalIn),
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
