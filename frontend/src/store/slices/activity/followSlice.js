// src/features/follow/followSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId, { getState }) => {
    const { user } = getState().auth;
    const response = await axios.post("/api/follow", {
      followerId: user._id,
      followingId: userId,
    });
    return response.data;
  }
);

const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId, { getState }) => {
    const { user } = getState().auth;
    const response = await axios.post("/api/unfollow", {
      followerId: user._id,
      followingId: userId,
    });
    return response.data;
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState: { following: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.fulfilled, (state, action) => {
        // Handle the follow logic
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        // Handle the unfollow logic
      });
  },
});

export default followSlice.reducer;
export { followUser, unfollowUser };
