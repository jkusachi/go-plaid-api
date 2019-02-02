import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class App extends Component {
  render() {
    return (
      <main className="content-wrapper">
        <div className="top">
          <div className="headline">
            <h1 className="zsg-content_collapsed">The Best Technology.</h1>
            <h1>The Easiest Underwriting.</h1>
            <h3>
              Get piece of mind using The Zillow&trade; Underwriting Program.
            </h3>
            <p className="desc">
              No more phone calls, no more bank statements to PDF or fax in.
              With Zillow&trade;'s Underwriting Program, you can see your
              eligibility in securing a home loan instantly, safely, and easily.
            </p>
            <form action="/underwriter/begin/">
              <button className="zsg-button_primary">
                Start the Underwriting Process
              </button>
            </form>
          </div>
        </div>

        <div className="zsg-content-section sc-dxgOiQ chppGt">
          <div className="selling-step-wrapper">
            <div className="sc-kpOJdX kAVorH">
              <div className="sc-kGXeez duVHaf">
                {/*<h2 className="step-number">1</h2>*/}
                <h3>No Hassles, No Bank Statements</h3>
                <p>
                  Submit your bank history easy and online. No more printing
                  bank statements at home. Everything is done securely and
                  safely.
                </p>
                <span />
              </div>
            </div>
            <svg className="sc-kgoBCf fXJcYd">
              <line className="mobile" x1="50%" x2="50%" y1="0" y2="100%" />
              <line className="desktop left" x1="0" x2="0" y1="0" y2="100%" />
              <line
                className="desktop right"
                x1="100%"
                x2="100%"
                y1="0"
                y2="100%"
              />
            </svg>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
