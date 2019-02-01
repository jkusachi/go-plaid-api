import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="content-wrapper">
        <div className="top">
          <div className="headline">
            <h1 className="zsg-content_collapsed">The Best Technology.</h1>
            <h1>The Easiest Underwriting.</h1>
            <h3>
              Get piece of mind using Zillow&trade;'s Underwriting Program.
            </h3>
            <p className="desc">
              No more phone calls, no more bank statements to PDF or fax in.
              With Zillow&trade;'s Underwriting Program, you can see your
              eligibility in securing a home loan instantly, safely, and easily.
            </p>
            <button className="zsg-button_primary">
              Start the Underwriting Process
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
