import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer, { INITIAL_STATE } from "../features/tasksList/tasksListReducer";

export const render = (ui, { initialState, ...renderOptions } = {}) => {
  const store = createStore(reducer, initialState || INITIAL_STATE);
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }), store };
};
