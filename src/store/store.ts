import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./reducers/crud";

export const store = configureStore({
  reducer: crudReducer,
});

export const makeStore = () => {
  return store;
};
