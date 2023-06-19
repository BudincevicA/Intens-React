import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Toolbar></Toolbar>
      </div>
    </Provider>
  );
}

export default App;
