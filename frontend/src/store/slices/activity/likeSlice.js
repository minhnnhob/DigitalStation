// src/features/like/likeSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchLikesByArtwork = createAsyncThunk(
  "like/fetchLikesByArtwork",
  async (artworkId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/like/artwork/${artworkId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const likeArtwork = createAsyncThunk(
  "like/likeArtwork",
  async (artworkId, userId, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:4000/api/like/like", {
        userId: userId,
        artworkId: artworkId,
      });
      console.log(artworkId,userId);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const unlikeArtwork = createAsyncThunk(
  "like/unlikeArtwork",
  async (artworkId, { getState }) => {
    const { user } = getState().auth;
    const response = await axios.post("/api/like/unlike", {
      userId: user._id,
      artworkId,
    });
    return response.data;
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: { likes: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeArtwork.fulfilled, (state, action) => {
        state.likes = [...state.likes, action.payload.like];
      })
      .addCase(unlikeArtwork.fulfilled, (state, action) => {
        state = state.filter((like) => like._id !== action.payload.like._id);
      });

    builder
    .addCase(fetchLikesByArtwork.fulfilled, (state, action) => {
      state.likes = action.payload;
    })
    .addCase(fetchLikesByArtwork.rejected, (state, action) => {
      state.status = "failed";
    })
    .addCase(fetchLikesByArtwork.pending, (state, action) => {
        state.status = "loading";
    });
  },
});

export default likeSlice.reducer;
export { fetchLikesByArtwork, likeArtwork, unlikeArtwork };
