package common

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/http"
)

func MakeJSONPostRequest(url string, payload []byte) ([]byte, error) {

	apiClient := http.Client{}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewReader(payload)  )

	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("Content-Type", "application/json")

	res, getErr := apiClient.Do(req)
	if getErr != nil {
		log.Fatal(getErr)
	}

	return ioutil.ReadAll(res.Body)
}
	