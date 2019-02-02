import React, { Component } from "react";

export default class Report extends Component {
  render() {
    const { onContinue } = this.props;
    return (
      <React.Fragment>
        <h1>Your Transaction Report</h1>
        <h3>An overall Summary of your accounts</h3>

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
