import React from "react";

export default function ConnectionSuccess({ onContinue }) {
  return (
    <React.Fragment>
      <h1>Great! You successfully linked your bank account</h1>
      <h3>Look, you dont need to send any bank statements now!</h3>

      <p>
        Next, we will verify our transactions to make sure we pulled the right
        data
      </p>
      <div className="super-padded-button">
        <button className="zsg-button_primary" onClick={onContinue}>
          Continue to Verify My Transactions
        </button>
      </div>
    </React.Fragment>
  );
}
