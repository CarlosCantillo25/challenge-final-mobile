import { createReducer } from "@reduxjs/toolkit"
import productsActions from "../actions/productsActions"
let { read_products} =productsActions
let initialState = {
    products: []
}
const productsReducer = createReducer(initialState, (builder) => builder
    .addCase(read_products.fulfilled, (state, action)=>{
        let newState = {
            ...state,
            products: action.payload
        }
        return newState
    })
    )
export default productsReducer