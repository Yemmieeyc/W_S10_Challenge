import { configureStore } from '@reduxjs/toolkit'
import { orderListApi } from './orderListApi';
import orderListReducer from './orderListSlice'

const exampleReducer = (state = { count: 0 }) => {
  return state;
};
export const resetStore = () =>
  configureStore({
    reducer: {
      orderList: orderListReducer,
      [orderListApi.reducerPath]: orderListApi.reducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(
        orderListApi.middleware
        // if using RTK Query for your networking: add your middleware here
        // if using Redux Thunk for your networking: you can ignore this
      ),
  });
export const store = resetStore();


// // const exampleReducer = (state = { count: 0 }) => {
// //   return state
// // }

// export const resetStore = () => configureStore({
//   reducer: {
//     //example: exampleReducer,
//     // add your reducer(s) here
//     form: formReducer,
//     sizeFilter: sizeFilterReducer,
//     [pizzaOrderApi.reducerPath]: pizzaOrderApi.reducer,
//   },
//   middleware: getDefault => getDefault().concat(
//     // if using RTK Query for your networking: add your middleware here
//     pizzaOrderApi.middleware,
//     // if using Redux Thunk for your networking: you can ignore this
//   ),
// })

// export const store = resetStore()
