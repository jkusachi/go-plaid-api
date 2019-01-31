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

	var f interface{}
	jsonErr := json.Unmarshal(body, &f)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}
	m := f.(map[string]interface{})

	output, err := json.Marshal(m)
	w.Write(output)
}

func GetAccessToken(w http.ResponseWriter, r *http.Request) {

	var t GetAccessTokenPayload
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(t.PublicToken)
}