import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Begin.css";

class Begin extends Component {
  constructor() {
    super();

    this.handler = window.Plaid.create({
      apiVersion: "v2",
      clientName: "Plaid Quickstart",
      env: "sandbox",
      product: ["transactions"],
      key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
      // webhook: 'https://your-domain.tld/plaid-webhook',
      onSuccess: function(public_token) {
        axios
          .post("http://localhost:3000/get_access_token", {
            public_token: public_token
          })
          .then(resp => {
            console.log("resp", resp.data);
          });
      }
    });
  }

  onConnect = () => {
    this.handler.open();
  };

  render() {
    return (
      <main className="content-main padded-top">
        <h1>Ready to Begin?</h1>
        <h3>Don't worry, this will only take a second</h3>

        <p>Zillows underwriting process works in 4 easy steps.</p>
        <ol>
          <li>Connect to your main bank account</li>
          <li>Verify that the transaction history is correct</li>
          <li>
            Add any explanations to any transaction anomolies. For instance, if
            we see an out-of-the-ordinary Deposit or Withdrawal, you will have a
            chance to provide an explanation or reason
          </li>
          <li>Submit you Application</li>
        </ol>
        <h3>Ready to Get Started?</h3>
        <p>
          If you're ready, lets connect to your bank to get the process started.
          To begin, click the button below.
        </p>
        <div>
          <button className="zsg-button_primary" onClick={this.onConnect}>
            Connect to your Bank
          </button>
        </div>
      </main>
    );
  }
}

export default Begin;
