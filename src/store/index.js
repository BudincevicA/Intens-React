import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  { reducer: rootReducer },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
