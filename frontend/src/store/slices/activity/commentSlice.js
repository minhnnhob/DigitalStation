// src/features/comment/commentSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

 const addComment = createAsyncThunk(
  'comment/addComment',
  async ({ artworkId, comment }, { getState }) => {
    const { user } = getState().auth;
    const response = await axios.post('/api/comment', {
      userId: user._id,
      artworkId,
      comment,
    });
    return response.data;
  }
);

 const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (artworkId) => {
    const response = await axios.get(`/api/comments/${artworkId}`);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: { comments: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.newComment);
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload.comments;
      });
  },
});

export default commentSlice.reducer;
export { addComment, fetchComments };
