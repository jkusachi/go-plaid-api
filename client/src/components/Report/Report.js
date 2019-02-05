import React, { Component } from "react";
import cx from "classnames";
import axios from "axios";
import n from "numeral";
import "./Report.css";
import { stat } from "fs";
export default class Report extends Component {
  state = {
    accounts: [],
    show: {},
    type_counts: {}
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
    const { accounts, show, type_counts } = this.state;

    return (
      <React.Fragment>
        <h1>Your Transaction Report</h1>
        <h3>An overall Summary of your accounts</h3>

        <div className="spending-highlights">
          <h2>Spending Highlights</h2>

          <div className="spending-highlight">
            <label>Special: {type_counts.special || 0}</label>
            <p>Rransactions that relate to banks, e.g. fees or deposits. </p>
          </div>
          <div className="spending-highlight">
            <label>Made at Retail Locations: {type_counts.place || 0}</label>
            <p>Rransactions that were made at a physical location </p>
          </div>
          <div className="spending-highlight">
            <label>Made Online: {type_counts.digital || 0}</label>
            <p>Rransactions that were made online</p>
          </div>
        </div>

        <div className="accounts-list">
          <h2>Account Information</h2>
          {accounts.map(account => {
            const stats = account.stats || {};
            const transactions = account.transactions || [];

            let riskType;
            if (stats.spend_percentage > 0 && stats.spend_percentage <= 0.15) {
              riskType = "excellent";
            } else if (
              stats.spend_percentage < 0.25 &&
              stats.spend_percentage > 0.15
            ) {
              riskType = "good";
            } else if (
              stats.total_out + stats.total_in < 0 &&
              stats.total_in !== 0
            ) {
              riskType = "problematic";
            } else if (stats.total_in === 0 && transactions.length < 5) {
              riskType = "potential_savings";
            } else if (stats.total_in === 0 && transactions.length >= 5) {
              riskType = "high_risk";
            }

            return (
              <div className="account-report" key={account.account.account_id}>
                <h3 className="header">{account.account.name}</h3>
                <div className="report-details">
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
                  <div className="report-risk">
                    <h3 className="header">Account Risk Summary</h3>

                    <div className="report-risk-details">
                      {riskType === "excellent" && (
                        <div>
                          <strong>Your Spend Level is Excellent!</strong>
                          <br />
                          This account has spent less than 15% of the money
                          coming in vs. money coming out.
                        </div>
                      )}
                      {riskType === "good" && (
                        <div>
                          <strong>Your Spend Level is Good</strong>
                          <br />
                          This account has spent less than 25% of the money
                          coming in vs. money coming out.
                        </div>
                      )}
                      {riskType === "problematic" && (
                        <div>
                          <strong>Your Spend Level is Problematic</strong>
                          <br />
                          Unfortunately it looks like you have overspent in
                          terms of money in vs. money out. While this is not a
                          deal breaker, we will need to consult your other
                          accounts
                        </div>
                      )}
                      {riskType === "potential_savings" && (
                        <div>
                          <strong>Your Spend Level is Unknown</strong>
                          <br />
                          There doesn't seem to be a lot of transactions for
                          this account. We can assume this is a money market
                          account or CD
                        </div>
                      )}
                      {riskType === "high_risk" && (
                        <div>
                          <strong>Your Spend Level is High Risk</strong>
                          <br />
                          There are a lot of outgoing transactions, but no money
                          coming in. This most likely resembles a credit card.
                          This tells us that you might not be paying down your
                          credit card on time.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="zsg-button show-btn"
                  onClick={() => {
                    this.setState({
                      show: {
                        [`${account.account.account_id}`]: !show[
                          `${account.account.account_id}`
                        ]
                      }
                    });
                  }}
                >
                  {show[`${account.account.account_id}`]
                    ? "Hide Transactions"
                    : "Show Transactions"}
                </button>
                {show[`${account.account.account_id}`] && (
                  <div className="report-transactions">
                    <div className="table">
                      <div className="row header">
                        <div className="item">Date</div>
                        <div className="item">Location</div>
                        <div className="item">Categories</div>
                        <div className="item">Amount</div>
                        <div className="item">Explanation</div>
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
                          <div>
                            <input
                              type="text"
                              placeholder="Provide an Explanation"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
