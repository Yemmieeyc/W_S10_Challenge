import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     fullName: '',
  size: 'All',
  toppings: [],
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,

status: 'idle',
error: null,
}

const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        setFullName: (state, action) =>{
            state.fullName = action.payload
        },
        setSize(state, action) {
            state.size = action.payload
        },
        addTopping(state, action) {
            console.log("action:", action)
            console.log("state:", state)
            state.toppings.push(action.payload)
        },
        removeToppings(state, action) {
            state.toppings = state.toppings.filter((topping) => topping !== action.payload)
        },
        resetOrder(state){
            state.fullName = "";
            state.size = "";
            state.toppings = [];
        },
        setFilterSize(state, action){
            state.filterSize = action.payload
        },

    },
})

export const { setFullName, setSize, addTopping, removeTopping, resetOrder, setFilterSize } = orderListSlice.actions;
export default orderListSlice.reducer;