import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Routes from "./routes";

function App() {
  return (
    <Provider store={makeStore()}>
      <ToastContainer />
      <Routes />
    </Provider>
  );
}

export default App;
