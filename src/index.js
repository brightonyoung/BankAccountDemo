import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as sagas from "./sagas";
import reducer from "./reducers";

import "./__mocks__/mockApi";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

if (sagas && Object.keys(sagas).length > 0) {
  Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
