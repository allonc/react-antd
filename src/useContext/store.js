import React, { createContext, useReducer } from "react";
import bookReducer from "./Book";
const AppContext = createContext();
const { Provider } = AppContext;

export function AppProvider(props) {
  const { book, add, addList } = bookReducer();
  return <Provider value={{ book, add, addList }}>{props.children}</Provider>;
}

export default AppContext;
