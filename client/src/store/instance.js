import { createSlice } from '@reduxjs/toolkit';

const instanceSlice = createSlice({
  name: "instance",
  initialState: {currentInstance: ""},
  reducers: {
    updateInstance: (state,action)=>{
      state.currentInstance = action.payload
    }
  }
})

export const instanceActions = instanceSlice.actions
export default instanceSlice

