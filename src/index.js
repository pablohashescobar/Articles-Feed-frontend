import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/createStore";
import { PersistGate } from "redux-persist/integration/react";

import Loading from "./component/Loading";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
