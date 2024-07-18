import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filterState',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer