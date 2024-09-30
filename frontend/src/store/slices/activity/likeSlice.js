// src/features/like/likeSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  likes: [],
  loading: false,
  error: null,
};

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
  async (data) => {
    // console.log(data.artworkId, data.id);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/like/like",
        {
          userId: data.id,
          artworkId: data.artworkId,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
  //
);

const unlikeArtwork = createAsyncThunk("like/unlikeArtwork", async (data) => {
  console.log(data.id, data.artworkId);
  try {
    const response = await axios.post(
      "http://localhost:4000/api/like/unlike",
      {
        userId: data.id,
        artworkId: data.artworkId,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
});

const likeSlice = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(likeArtwork.fulfilled, (state, action) => {
      state.likes = action.payload;
    });

    builder.addCase(unlikeArtwork.fulfilled, (state, action) => {
      state.likes = action.payload;
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
