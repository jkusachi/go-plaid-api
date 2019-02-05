import React from "react";
import "./Begin.css";

export default function Begin({ onConnect }) {
  return (
    <React.Fragment>
      <h1>Ready to Begin?</h1>
      <h3>Don't worry, this will only take a second</h3>

      <p className="easy-steps">
        Zillows underwriting process works in 4 easy steps.
      </p>
      <ol className="begin-steps">
        <li>
          <label>Connect to your bank</label>
        </li>
        <li>Verify transactions</li>
        <li>Review & Explain</li>
        <li>Submit your Application</li>
      </ol>
      <div className="ready">
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
      </div>
    </React.Fragment>
  );
}
