import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from './store/store';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
