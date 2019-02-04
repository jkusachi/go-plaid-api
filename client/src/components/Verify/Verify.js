import React, { Component } from "react";
import axios from "axios";

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
    console.log("Verify", this.props);
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
    const { onConnect, accounts } = this.props;
    const { transactions = [] } = this.state;
    return (
      <React.Fragment>
        <h1>Please verify the transactions below</h1>
        <h3>We want to be 100% certain this is the correct account</h3>

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
          </div>
          {transactions.slice(0, 20).map(t => (
            <div className="row" key={t.transaction_id}>
              <div className="item">{t.date}</div>
              <div className="item uppercase bold">{t.name}</div>
              <div className="item italic">{t.category.join(", ")}</div>
              <div className="item">${t.amount}</div>
            </div>
          ))}
        </div>

        <div className="super-padded-button">
          <button
            className="zsg-button"
            onClick={onConnect}
            style={{
              marginRight: "1rem",
              background: "red",
              color: "white"
            }}
          >
            No, these is not my most recent history
          </button>
          <button className="zsg-button_alt" onClick={onConnect}>
            Yes, this is correct!
          </button>
        </div>
      </React.Fragment>
    );
  }
}
