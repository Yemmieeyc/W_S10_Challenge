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