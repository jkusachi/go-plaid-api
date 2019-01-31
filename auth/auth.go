package auth

import (
	"os"
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/jkusachi/go-playground/common"
)

func AuthGet(w http.ResponseWriter, r *http.Request) {
	
	url := fmt.Sprintf("%s%s", os.Getenv("API_HOST"), "/auth/get")
	payload := map[string]interface{}{
		"client_id": os.Getenv("CLIENT_ID"),
		"secret": os.Getenv("SECRET"),
		"access_token":os.Getenv("ACCESS_TOKEN"),		
	}
	jsonBody, _ := json.Marshal(payload)
	body, err := common.MakeJSONPostRequest(url, jsonBody)
	if err != nil {
		log.Fatal(err)
	}

	w.Write(body)
}

func GetAccessToken(w http.ResponseWriter, r *http.Request) {

	var t GetAccessTokenPayload
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s", os.Getenv("SECRET"))

	url := fmt.Sprintf("%s%s", os.Getenv("API_HOST"), "/item/public_token/exchange")
	payload := map[string]interface{}{
		"client_id": os.Getenv("CLIENT_ID"),
		"secret": os.Getenv("SECRET"),
		"public_token": t.PublicToken,
	}

	jsonBody, err := json.Marshal(payload)
	if err != nil {
		log.Fatal(err)
	}

	resp, err := common.MakeJSONPostRequest(url, jsonBody)
	if err != nil {
		log.Fatal(err)
	}
	w.Write(resp)
}