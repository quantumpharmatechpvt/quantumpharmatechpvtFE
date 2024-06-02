import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiClient } from '@/components/middleware/axiosClient';


const initialState = {
  loading: 'idle'
};
export const fetchClientUsers = createAsyncThunk(
    'usersSlice/fetchClientUsers',
    async (data) => {
      const response = await ApiClient.get('/users');
      return response.data;
    }
  );
const invoiceSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    clearSlice: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientUsers.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchClientUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
      })
      .addCase(fetchClientUsers.rejected, (state) => {
        state.loading = 'failed';
      });
  }
});

export const { clearSlice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
