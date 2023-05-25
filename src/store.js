import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const initialState = {
  theme: "dark",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage: "local",
};

const store = configureStore({
  reducer: persistReducer(reducer, persistConfig),
});

export default store;
