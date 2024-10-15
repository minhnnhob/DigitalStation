import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  studios: [],
  selectedStudio: null,
  loading: false,
  error: null,
};

const fetchStudios = createAsyncThunk(
  "studio/fetchStudios",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/studio",
        { params },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchStudio = createAsyncThunk(
  "studio/fetchStudio",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/studio/${id}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studioState = createSlice({
  name: "studio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudios.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudios.fulfilled, (state, action) => {
        state.loading = false;
        state.studios = action.payload;
      })
      .addCase(fetchStudios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
        .addCase(fetchStudio.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchStudio.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedStudio = action.payload;
        })
        .addCase(fetchStudio.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
  },
});

export default studioState.reducer;
export { fetchStudios, fetchStudio };
