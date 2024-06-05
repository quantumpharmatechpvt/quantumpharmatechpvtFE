import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "@/components/middleware/axiosClient";

export type CostCenterState = {
  loading: string;
  cartProducts: [];
  cardProducts1: [];
  cardProducts2: [];
  orders:[];
};
const initialState: CostCenterState = {
  loading: "idle",
  cartProducts: [],
  cardProducts1: [],
  cardProducts2: [],
  orders:[]
};

const productsSlice: any = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
    setCartProducts1: (state, action) => {
      state.cardProducts1 = action.payload;
    },
    setCartProducts2: (state, action) => {
      state.cardProducts2 = action.payload;
    },
    setOrders: (state, action) => {
        state.orders = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setCartProducts, setCartProducts1, setCartProducts2,setOrders } =
  productsSlice.actions;

export default productsSlice.reducer;
