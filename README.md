# Plaid API

## Disclaimer!

This was built in 1-2 days having no prior golang knowledge. The React components here are a mess. Im sure the golang is too.

### Requirements to run

There is a `.env.sample` provided

You will need to enter in your own values and then rename the file to `.env`

### Supported Endpoints

`/`
Test Endpoint

`POST /get_access_token`  
Retrieves an access token

`POST /auth/get`

[https://plaid.com/docs/#auth](https://plaid.com/docs/#auth)

`POST /transactions/get`  
[https://plaid.com/docs/#transactions](https://plaid.com/docs/#transactions)
