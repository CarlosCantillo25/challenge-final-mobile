import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const read_products = createAsyncThunk(
    'read_phoneTabs',async () => {
        console.log()
        try {
            let {data} = await axios.get("http://localhost:8082/api/products")
            return data.response
        } catch (error) {
            console.log(error)
            return null;
        }
    }
)


const productsActions = { read_products }
export default productsActions