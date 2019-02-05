package transactions

type TransactionsGetPayload struct {
	AccessToken string `json:"access_token"`
}

type PlaidResponse struct {
	Accounts          []PlaidAccount     `json:"accounts"`
	Item              PlaidItem          `json:"item"`
	RequestID         string             `json:"request_id"`
	TotalTransactions int                `json:"total_transactions"`
	Transactions      []PlaidTransaction `json:"transactions"`
}

type PlaidAccount struct {
	AccountID    string       `json:"account_id"`
	Balances     PlaidBalance `json:"balances"`
	Mask         string       `json:"mask"`
	Name         string       `json:"name"`
	OfficialName string       `json:"official_name"`
	Subtype      string       `json:"subtype"`
	Type         string       `json:"type"`
}

type PlaidBalance struct {
	Available              int         `json:"available"`
	Current                int         `json:"current"`
	IsoCurrencyCode        string      `json:"iso_currency_code"`
	Limit                  interface{} `json:"limit"`
	UnofficialCurrencyCode interface{} `json:"unofficial_currency_code"`
}

type PlaidItem struct {
	AvailableProducts []string    `json:"available_products"`
	BilledProducts    []string    `json:"billed_products"`
	Error             interface{} `json:"error"`
	InstitutionID     string      `json:"institution_id"`
	ItemID            string      `json:"item_id"`
	Webhook           string      `json:"webhook"`
}

type PlaidTransaction struct {
	AccountID       string      `json:"account_id"`
	AccountOwner    interface{} `json:"account_owner"`
	Amount          float64     `json:"amount"`
	Category        []string    `json:"category"`
	CategoryID      string      `json:"category_id"`
	Date            string      `json:"date"`
	IsoCurrencyCode string      `json:"iso_currency_code"`
	Location        struct {
		Address     interface{} `json:"address"`
		City        interface{} `json:"city"`
		Lat         interface{} `json:"lat"`
		Lon         interface{} `json:"lon"`
		State       interface{} `json:"state"`
		StoreNumber interface{} `json:"store_number"`
		Zip         interface{} `json:"zip"`
	} `json:"location"`
	Name        string `json:"name"`
	PaymentMeta struct {
		ByOrderOf        interface{} `json:"by_order_of"`
		Payee            interface{} `json:"payee"`
		Payer            interface{} `json:"payer"`
		PaymentMethod    interface{} `json:"payment_method"`
		PaymentProcessor interface{} `json:"payment_processor"`
		PpdID            interface{} `json:"ppd_id"`
		Reason           interface{} `json:"reason"`
		ReferenceNumber  interface{} `json:"reference_number"`
	} `json:"payment_meta"`
	Pending                bool        `json:"pending"`
	PendingTransactionID   interface{} `json:"pending_transaction_id"`
	TransactionID          string      `json:"transaction_id"`
	TransactionType        string      `json:"transaction_type"`
	UnofficialCurrencyCode interface{} `json:"unofficial_currency_code"`
}

type Stats struct {
	Average              float64 `json:"average"`
	Total                float64 `json:"total"`
	TransactionsOver1000 int     `json:"transactions_over_1000"`
	TransactionsOver200  int     `json:"transactions_over_200"`
	TotalIn              float64 `json:"total_in"`
	TotalOut             float64 `json:"total_out"`
	SpendPercentage      float64 `json:"spend_percentage"`
}

type PlaidCustomAccount struct {
	Account      PlaidAccount       `json:"account"`
	Transactions []PlaidTransaction `json:"transactions"`
	Stats        Stats              `json:"stats"`
}

type CustomResponse struct {
	Accounts       []PlaidCustomAccount `json:"accounts"`
	TypeCounts     interface{}          `json:"type_counts"`
	CategoryCounts interface{}          `json:"category_counts"`
}
