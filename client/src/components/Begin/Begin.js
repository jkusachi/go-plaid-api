import React from "react";

export default function Begin({ onConnect }) {
  return (
    <React.Fragment>
      <h1>Ready to Begin?</h1>
      <h3>Don't worry, this will only take a second</h3>

      <p>Zillows underwriting process works in 4 easy steps.</p>
      <ol>
        <li>Connect to your main bank account</li>
        <li>Verify that the transaction history is correct</li>
        <li>
          Add any explanations to any transaction anomolies. For instance, if we
          see an out-of-the-ordinary Deposit or Withdrawal, you will have a
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
        <button className="zsg-button_primary" onClick={onConnect}>
          Connect to your Bank
        </button>
      </div>
    </React.Fragment>
  );
}
