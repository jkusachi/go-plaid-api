import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import { ThemeProvider } from "styled-components";
import { ThemeFoundation } from "@zillow/foundation";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route path="/underwriter/home" component={Home} />
          <Route path="/underwriter/begin" component={Main} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
