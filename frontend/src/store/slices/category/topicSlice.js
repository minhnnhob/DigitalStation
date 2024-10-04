import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../../lib/axios';


// Thunks for asynchronous API calls
 const fetchAllTopics = createAsyncThunk('topics/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await api.get('http://localhost:4000/api/topics');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

 const createNewTopic = createAsyncThunk('topics/create', async (newTopicData, thunkAPI) => {
  try {
    const response = await api.post('http://localhost:4000/api/topics', newTopicData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

 const fetchArtworksByTopic = createAsyncThunk('topics/fetchArtworks', async (slug, thunkAPI) => {
  try {
    const response = await api.get(`http://localhost:4000/api/topics/${slug}/artworks`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const topicSlice = createSlice({
  name: 'topic',
  initialState: {
    topics: [],
    artworks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all topics
    builder
      .addCase(fetchAllTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchAllTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create new topic
    builder
      .addCase(createNewTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics.push(action.payload);
      })
      .addCase(createNewTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch artworks by topic
    builder
      .addCase(fetchArtworksByTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtworksByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload.artworks;
      })
      .addCase(fetchArtworksByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topicSlice.reducer;
export { fetchAllTopics, createNewTopic, fetchArtworksByTopic };

