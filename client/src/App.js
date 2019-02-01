import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Begin from "./components/Begin/Begin";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/underwriter/home" component={Home} />
          <Route path="/underwriter/begin" component={Begin} />
        </div>
      </Router>
    );
  }
}

export default App;
