import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Begin from "../Begin/Begin";
import ConnectionSuccess from "../ConnectionSuccess/ConnectionSuccess";
import Verify from "../Verify/Verify";
import Report from "../Report/Report";
import Finish from "../Finish/Finish";

import "./Main.css";

class Main extends Component {
  state = {
    // step: "BEGIN",
    // access_token: null,
    // item_id: null,
    // request_id: null,
    step: "REPORT",
    access_token: "access-sandbox-adeabee9-b9e8-41e7-b076-877348de027d",
    item_id: "LBDJkjq8VaHgL11kJlzeTjbrLNPXvriPMX5Da",
    request_id: "M3NQOl3GyAufmaq"
  };

  handleSuccess = public_token => {
    axios
      .post("http://localhost:3001/get_access_token", {
        public_token
      })
      .then(resp => {
        const { access_token, item_id, request_id } = resp.data;
        console.log("Success\n", resp.data);
        this.setState({
          step: "CONNECTION_SUCCESS",
          public_token,
          access_token,
          item_id,
          request_id
        });
      });
  };

  onConnect = () => {
    const handler = window.Plaid.create({
      apiVersion: "v2",
      clientName: "Zillow Underwriting",
      env: process.env.REACT_APP_PLAID_ENV,
      product: ["transactions"],
      key: process.env.REACT_APP_PLAID_PUBLIC_KEY,
      // webhook: 'https://your-domain.tld/plaid-webhook',
      onSuccess: this.handleSuccess
    });
    handler.open();
  };

  render() {
    const { step, access_token } = this.state;
    return (
      <main className="content-main padded-top">
        {step === "BEGIN" && <Begin onConnect={this.onConnect} />}
        {step === "CONNECTION_SUCCESS" && (
          <ConnectionSuccess
            onContinue={() => {
              this.setState({
                step: "VERIFY"
              });
            }}
          />
        )}
        {step === "VERIFY" && (
          <Verify
            access_token={access_token}
            onContinue={() => {
              this.setState({
                step: "REPORT"
              });
            }}
          />
        )}
        {step === "REPORT" && (
          <Report
            access_token={access_token}
            onContinue={() => {
              this.setState({
                step: "FINISH"
              });
            }}
          />
        )}
        {step === "FINISH" && <Finish />}
      </main>
    );
  }
}

export default Main;
