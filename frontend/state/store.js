import { configureStore } from '@reduxjs/toolkit'
import { pizzaOrderApi } from './pizzaOrderApi'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    // add your reducer(s) here
    [pizzaOrderApi.reducerPath]: pizzaOrderApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    // if using RTK Query for your networking: add your middleware here
    pizzaOrderApi.middleware,
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()
