import React, { Component } from "react";
import cx from "classnames";
import axios from "axios";
import n from "numeral";
import "./Report.css";
import { stat } from "fs";
export default class Report extends Component {
  state = {
    accounts: []
  };
  componentDidMount() {
    const { access_token } = this.props;
    axios
      .post("http://localhost:3001/transactions/process", {
        client_id: process.env.REACT_APP_CLIENT_ID,
        secret: process.env.REACT_APP_SECRET,
        access_token
      })
      .then(resp => {
        this.setState(resp.data);
      });
  }

  render() {
    const { onContinue } = this.props;
    const { accounts } = this.state;

    return (
      <React.Fragment>
        <h1>Your Transaction Report</h1>
        <h3>An overall Summary of your accounts</h3>

        <div className="spending-highlights">
          <h2>Spending Highlights</h2>
        </div>

        <div className="accounts-list">
          <h2>Account Information</h2>
          {accounts.map(account => {
            const stats = account.stats || {};
            const transactions = account.transactions || [];
            return (
              <div className="account-report" key={account.account.account_id}>
                <h3 className="header">{account.account.name}</h3>
                <div className="report-data">
                  <div>
                    <label>Available Balance: </label>{" "}
                    {n(account.account.balances.available).format("$0,0.00")}
                  </div>
                  <div>
                    <label>Current Balance: </label>{" "}
                    {n(account.account.balances.current).format("$0,0.00")}
                  </div>
                  <div>
                    <label>Average Transaction per 90 days: </label>{" "}
                    {n(stats.average).format("$0,0.00")}
                  </div>
                  <div>
                    <label>Spend Percentage: </label> {stats.spend_percentage}
                  </div>
                  <div>
                    <label>Total: </label> {n(stats.total).format("$0,0.00")}
                  </div>
                  <div>
                    <label>Total In: </label>{" "}
                    {n(stats.total_in).format("$0,0.00")}
                  </div>
                  <div>
                    <label>Total Out: </label>{" "}
                    {n(stats.total_out).format("$0,0.00")}
                  </div>
                  <div>
                    <label>Transactions over $1,000: </label>{" "}
                    {stats.transactions_over_1000}
                  </div>
                  <div>
                    <label>Transactions over $200: </label>{" "}
                    {stats.transactions_over_200}
                  </div>
                </div>
                <div className="report-transactions">
                  <div className="table">
                    <div className="row header">
                      <div className="item">Date</div>
                      <div className="item">Location</div>
                      <div className="item">Categories</div>
                      <div className="item">Amount</div>
                      <div className="item">Account</div>
                    </div>
                    {transactions.slice(0, 20).map(t => (
                      <div className="row" key={t.transaction_id}>
                        <div className="item">{t.date}</div>
                        <div className="item uppercase bold">{t.name}</div>
                        <div className="item italic">
                          {t.category.join(", ")}
                        </div>
                        <div
                          className={cx({
                            item: true,
                            credit: t.amount > 0,
                            debit: t.amount < 0
                          })}
                        >
                          {n(t.amount).format("$0,0.00")}
                        </div>
                        <div className="item">{account.account.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="super-padded-button">
          <button
            className="zsg-button"
            style={{
              marginRight: "1rem",
              background: "red",
              color: "white"
            }}
          >
            Cancel, Return to Home
          </button>
          <button className="zsg-button_alt" onClick={onContinue}>
            Submit to Underwriting
          </button>
        </div>
      </React.Fragment>
    );
  }
}
