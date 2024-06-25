import { createSlice } from '@reduxjs/toolkit'


const sizeFilter = createSlice({
  name: 'sizeFilter',
  initialState: 'All',
  reducers: {
    setSizeFilter: (state, action) => action.payload
  },
})




export const {setSizeFilter} = sizeFilter.actions
export default sizeFilter.reducer