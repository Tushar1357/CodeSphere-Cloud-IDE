import { createSlice, current } from '@reduxjs/toolkit';

const codeSlice = createSlice({
  name:"code",
  initialState: {currentCode: ""},
  reducers: {
    changeCode: (state,action)=>{
      state.currentCode = action.payload
    }
  }
})

export const codeActions = codeSlice.actions
export default codeSlice
