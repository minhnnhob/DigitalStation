import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all tags
const fetchAllTags = createAsyncThunk("tags/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:4000/api/tags");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Fetch tags by topic ID
const fetchTagsByTopic = createAsyncThunk(
  "tags/fetchByTopic",
  async (topicId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/tags/topic/${topicId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch tag by slug
const fetchTagBySlug = createAsyncThunk(
  "tags/fetchBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/tags/${slug}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a new tag
const createTag = createAsyncThunk("tags/create", async (name) => {
    console.log(name);
    try {
        console.log(name);
    const response = await axios.post("http://localhost:4000/api/tags", {name},{
        withCredentials: true,
    });
    
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    tag: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all tags
    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch tags by topic ID
    builder
      .addCase(fetchTagsByTopic.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTagsByTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTagsByTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch tag by slug
    builder
      .addCase(fetchTagBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTagBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.tag = action.payload;
      })
      .addCase(fetchTagBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create new tag
    builder
      .addCase(createTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = [...state.tags, action.payload];
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tagSlice.reducer;
export { fetchAllTags, fetchTagsByTopic, fetchTagBySlug, createTag };
