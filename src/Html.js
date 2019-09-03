import React, { Component } from "react";
import "./App.css";
import { Home } from "./screen";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { withCookies, Cookies } from "react-cookie";

class Html extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Slot App</title>
        </head>
        <body>
          <div id="root" />
          <div> {this.props.markup} </div>
        </body>
      </html>
    );
  }
}

export default Html;
