import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const followUser = createAsyncThunk(
  "follow/followUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/follow",
        { followerId, followingId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async ({ followerId, followingId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/api/follow",
        {
          data: { followerId, followingId },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchFollowers = createAsyncThunk(
  "follow/fetchFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/follow/followers/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchFollowing = createAsyncThunk(
  "follow/fetchFollowing",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/follow/following/${userId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState: { followers: [], following: [], status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.fulfilled, (state, action) => {
        state.following.push(action.payload);
        state.status = "success";
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (follow) => follow.followingId !== action.payload.followingId
        );
        state.status = "success";
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
        state.status = "success";
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
        state.status = "success";
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default followSlice.reducer;
export { followUser, unfollowUser, fetchFollowers, fetchFollowing };