import { configureStore } from "@reduxjs/toolkit";
import pathSlice from "./path";
import codeSlice from "./code";
import outputSlice from "./output";
import instanceSlice from "./instance";


const store = configureStore({
  reducer: {
    path : pathSlice.reducer,
    code : codeSlice.reducer,
    output: outputSlice.reducer,
    instance: instanceSlice.reducer
  }
})


export default store