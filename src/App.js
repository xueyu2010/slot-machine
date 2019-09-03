import React, { Component } from "react";
import "./App.css";
import { Home } from "./screen";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { withCookies, Cookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CookiesProvider>
        <Provider store={store}>
          <div className="App">
            <Home />
          </div>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default App;
