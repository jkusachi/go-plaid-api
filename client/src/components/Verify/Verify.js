import React, { Component } from "react";
import cx from "classnames";
import n from "numeral";
import axios from "axios";
import keyBy from "lodash/keyBy";

export default class Verify extends Component {
  static defaultProps = {
    accounts: []
  };

  state = {
    accounts: [],
    transactions: []
  };

  componentDidMount() {
    const { access_token } = this.props;
    axios
      .post("http://localhost:3001/transactions/get", {
        client_id: process.env.REACT_APP_CLIENT_ID,
        secret: process.env.REACT_APP_SECRET,
        access_token
        // start_date: startDate,
        // end_date: endDate
      })
      .then(resp => {
        console.log("transactions get\n", resp.data);
        console.log("resp.data.transactions", resp.data.transactions);
        this.setState({
          transactions: resp.data.transactions,
          accounts: resp.data.accounts
        });
      });
  }

  render() {
    const { onContinue } = this.props;
    const { accounts = [], transactions = [] } = this.state;

    const keyedAccounts = keyBy(accounts, "account_id");
    return (
      <React.Fragment>
        <h1>Please verify the transactions below</h1>
        <h3>We want to be 100% certain this is the correct account</h3>

        <h2>Accounts</h2>
        <p>
          We were able to link your accounts to your profile. Please verify the
          accounts below are correct
        </p>
        <div className="accounts-list">
          {accounts.map(account => (
            <div className="account">{account.name}</div>
          ))}
        </div>

        <h2>Transactions</h2>

        <p>Here are the 20 most recent transactions for your account.</p>
        <p>
          {" "}
          Please verify these transactions below to ensure this is the correct
          transaction history
        </p>

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
              <div className="item italic">{t.category.join(", ")}</div>
              <div
                className={cx({
                  item: true,
                  debit: t.amount > 0,
                  credit: t.amount < 0
                })}
              >
                {n(t.amount * -1).format("$0,0.00")}
              </div>
              <div className="item">
                {keyedAccounts[t.account_id]
                  ? keyedAccounts[t.account_id].name
                  : ""}
              </div>
            </div>
          ))}
        </div>

        <div className="super-padded-button">
          <button
            className="zsg-button"
            onClick={onContinue}
            style={{
              marginRight: "1rem",
              background: "red",
              color: "white"
            }}
          >
            No, this account data is not correct
          </button>
          <button className="zsg-button_alt" onClick={onContinue}>
            Yes, this is correct!
          </button>
        </div>
      </React.Fragment>
    );
  }
}
