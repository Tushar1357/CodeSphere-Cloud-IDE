import { createSlice } from '@reduxjs/toolkit';

const outputSlice = createSlice({
  name:"output",
  initialState: {currentOutput: ""},
  reducers: {
    changeOutput: (state,action)=>{
      state.currentOutput = action.payload
    }
  }
})

export const outputActions = outputSlice.actions
export default outputSlice