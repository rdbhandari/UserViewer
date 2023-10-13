import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// action to fetch data from backend server
export const fetchUserData = createAsyncThunk(
  "fetchUserData",
  async ({ currentPage, limit, query, sortBy, orderBy }) => {
    let data = {};
    let url = `http://localhost:3000?_page=${currentPage}&_limit=${limit}&q=${query}&_sort=${sortBy}&_order=${orderBy}`;
    await axios
      .get(url)
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        throw error;
      });
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userdata: {},
    totalCount: 0,
    isLoading: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userdata = action.payload.data;
        state.totalCount = action.payload.totalCount;
        state.isLoading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {});
  },
});

export default userSlice.reducer;
