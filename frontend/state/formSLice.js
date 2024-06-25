import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     fullName: '',
  size: '',
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,

status: 'idle',
error: null,
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormField: (state, action) =>{
            state[action.payload.field] = action.payload.value
        },
        setTopping: (state, action) => {
            state.toppings[action.payload.topping] = action.payload.checked
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        resetForm: () => initialState

    },
})

export const { setFormField, setTopping, setStatus, setError, resetForm} = formSlice.actions
export default formSlice.reducer