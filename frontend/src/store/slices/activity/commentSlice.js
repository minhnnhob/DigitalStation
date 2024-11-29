// src/features/comment/commentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const addComment = createAsyncThunk(
  "comment/addComment",
  async (data, { getState, rejectWithValue }) => {
    try {
      // Retrieve user data from the state
      const user = getState().user.id;

      if (!user || !user.id) {
        console.log("User must be logged in to add a comment");
      }
      const response = await axios.post("/api/comments", {
        userId: user,
        artworkId: data.artworkId,
        comment: data.comment,
        parentId: data.parentId,
      },{
        withCredentials: true
      });
      console.log(response);
      return response.data;
    } catch (error) {
      // Return a custom error message if available or the generic error message
      console.log("check", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add comment");
    }
  }
);

const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (artworkId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/comments/artwork/${artworkId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      // Pass error message or any response details to rejected action
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [], status: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        
        // Destructure the returned comment and user data from action.payload
        const  newComment = action.payload.newComment;

        // Build the new comment object with the user details
        
        if (newComment.parentId) {
          // Find the parent comment to add the reply
          const parentComment = state.comments.find(
            (comment) => comment._id === newComment.parentId
          );
          if (parentComment) {
            parentComment.replies = parentComment.replies || [];
            parentComment.replies.push(newComment);
          }
        } else {
          // Add as a new comment if there’s no parentId
          state.comments.unshift(newComment);
        }
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "success";
        state.comments = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default commentSlice.reducer;
export { addComment, fetchComments };
