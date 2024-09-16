// src/store/slices/artworkSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  artworks: [],
  loading: false,
  error: null,
};

// Define async actions for fetching, adding, updating, and deleting artworks
const fetchArtworks = createAsyncThunk(
  "artwork/fetchArtworks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/artworks");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchArtworkUser = createAsyncThunk(
  "artwork/fetchArtworkUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/artworks/explore", {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const artworkState = createSlice({
  name: "artwork",
  initialState,
  reducers: {
    deleteArtwork: (state, action) => {
      state.artworks = state.artworks.filter(
        (artwork) => artwork._id !== action.payload
      );
    },
    createArtwork: (state, action) => {
      state.artworks = [action.payload, ...state.artworks];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload.artworks;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    builder
      .addCase(fetchArtworkUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtworkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload.artworks;
      })
      .addCase(fetchArtworkUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default artworkState.reducer;
export const { updateArtwork, deleteArtwork, createArtwork } =
  artworkState.actions;
export { fetchArtworks,fetchArtworkUser };
