import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./slice";

const store = configureStore({reducer: {cats: catReducer}});

export default store;