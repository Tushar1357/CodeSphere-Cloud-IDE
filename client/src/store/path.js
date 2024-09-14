import {createSlice} from "@reduxjs/toolkit"

const pathSlice = createSlice({
  name:"path",
  initialState: {currentPath: '/'},
  reducers: {
    changePath: (state,action)=>{
      state.currentPath = action.payload
    }
  }
})

export const pathActions = pathSlice.actions
export default pathSlice