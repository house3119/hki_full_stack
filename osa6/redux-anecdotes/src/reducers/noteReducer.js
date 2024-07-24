import { createSlice } from "@reduxjs/toolkit"

const noteSlice = createSlice({
  name: 'noteState',
  initialState: {note: 'Initial Note', visible: false},
  reducers: {
    changeNote(state, action) {
      state.note = action.payload
      state.visible = true
    },
    hideNote(state) {
      state.visible = false
    }
  }
})

export const { changeNote, hideNote } = noteSlice.actions
export default noteSlice.reducer