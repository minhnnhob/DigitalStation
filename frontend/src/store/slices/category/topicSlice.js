import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../lib/axios";

// Thunks for asynchronous API calls
const fetchAllTopics = createAsyncThunk(
  "topics/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("http://localhost:4000/api/topics");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const createNewTopic = createAsyncThunk(
  "topics/create",
  async (newTopicData, thunkAPI) => {
    console.log(newTopicData);
    try {
      const response = await api.post(
        "http://localhost:4000/api/topics",
        newTopicData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const updateTopic = createAsyncThunk(
  "topics/update",
  async (topicData, { rejectWithValue }) => {
    const { id, data } = topicData;
    console.log(topicData)
    data.forEach((value, key) => {
      console.log(key, value);
    });
    try {
      const response = await api.put(
        `http://localhost:4000/api/topics/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteTopic = createAsyncThunk(
  "topics/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `http://localhost:4000/api/topics/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchArtworksByTopic = createAsyncThunk(
  "topics/fetchArtworks",
  async (slug, thunkAPI) => {
    try {
      const response = await api.get(
        `http://localhost:4000/api/topics/${slug}/artworks`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const topicSlice = createSlice({
  name: "topic",
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

    // Delete topic
    builder
      .addCase(deleteTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = state.topics.filter(
          (topic) => topic._id !== action.payload._id
        );
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update topic
    builder
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = state.topics.map((topic) =>
          topic._id === action.payload._id ? action.payload : topic
        );

        console.log(action.payload);

      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topicSlice.reducer;
export {
  fetchAllTopics,
  createNewTopic,
  fetchArtworksByTopic,
  deleteTopic,
  updateTopic,
};
