import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filterStuff',
  initialState: '',
  reducers: {
    filter(state, action) {
      return action.payload
    }
  }
})

export const { filter } = filterSlice.actions
export default filterSlice.reducer