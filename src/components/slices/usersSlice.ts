import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "@/components/middleware/axiosClient";


export type CostCenterState = {
  loading: string;
  createCostCenterModalOpen: boolean;
  editCostCenterModalOpen: boolean;
  users: [];
};
const initialState: CostCenterState = {
  loading: "idle",
  createCostCenterModalOpen: false,
  editCostCenterModalOpen: false,
  users: [],
};

export const fetchClientUsers = createAsyncThunk(
  "usersSlice/fetchClientUsers",
  async (data) => {
    const response = await ApiClient.get("/users");
    return response.data;
  }
);
export const addClientUser = createAsyncThunk(
  "usersSlice/addClientUser",
  async (data: any) => {
    let url = encodeURI(`/user`);
    const body = {
      id: parseInt(data.id) ,
      name: data.name,
      age: parseInt(data.age),
      email: data.email,
      address: data.addr,
      phoneNo: parseInt(data.phno),
      password: data.psw,
    };
    console.log(data);
    try {
      const response = await ApiClient.post(url, body);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const updateClientUser = createAsyncThunk(
  "usersSlice/updateClientUser",
  async (data: any) => {
    let url = encodeURI(`/user/${parseInt(data.id)}`);
    const body = {
      // id: parseInt(data.id) ,
      name: data.name,
      age: parseInt(data.age),
      email: data.email,
      address: data.addr,
      phoneNo: parseInt(data.phno),
      password: data.psw,
    };
    console.log(data);
    try {
      const response = await ApiClient.put(url, body);
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const invoiceSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setCreateCostCenterModalOpen: (state, action) => {
      state.createCostCenterModalOpen = action.payload;
    },
    setEditCostCenterModalOpen: (state, action) => {
      state.editCostCenterModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientUsers.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchClientUsers.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchClientUsers.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { setCreateCostCenterModalOpen, setEditCostCenterModalOpen } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
