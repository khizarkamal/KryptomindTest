// src/features/dataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface DataState {
  data: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DataState = {
  data: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get("https://randomuser.me/api/?results=10");
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.data.results = state?.data?.results?.filter((item: any) => {
        return item?.login?.uuid !== action?.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { deleteUser } = dataSlice.actions;
export default dataSlice.reducer;
