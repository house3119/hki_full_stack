import { createSlice } from "@reduxjs/toolkit"

const noteSlice = createSlice({
  name: 'noteState',
  initialState: 'Initial State for Notes - TEST',
  reducers: {
    mockFunc(state, action) {
        return state
    }
  }
})

export const { mockFunc } = noteSlice.actions
export default noteSlice.reducer