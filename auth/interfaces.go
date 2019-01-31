package auth

type GetAccessTokenPayload struct {
	PublicToken string `json:"public_token"`
}

type accessTokenResponse struct {
	AccessToken string `json:"access_token"`
	ItemID string `json:"item_id"`
	Error string `json:"error"`
}

