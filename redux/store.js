import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/product";
import productsReducer from "./reducers/productsReducer";
import productRedu from "./reducers/product";
import userReducer from "./reducers/user";


export const store = configureStore({
    reducer: {
        product: productRedu,
        products: productsReducer,
        user: userReducer,
      },
})