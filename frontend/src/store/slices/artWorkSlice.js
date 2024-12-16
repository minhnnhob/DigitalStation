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
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/artworks",
        { params },
        { withCredentials: true }
      );

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
      const response = await axios.post(
        `http://localhost:4000/api/artworks/explore/`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchArtwprkOfUser = createAsyncThunk(
  "artwork/fetchArtworkOfUser",
  async (id,{rejectWithValue}) => {
    console.log(id)
    try {
      const response = await axios.get(
        `http://localhost:4000/api/artworks/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const fetchArtwork = createAsyncThunk(
  "artwork/fetchArtwork",
  async (artworkId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/artworks/artwork/${artworkId}`
      );

      return response.data;
    } catch (error) {
      return console.error(error);
    }
  }
);

const createArtwork = createAsyncThunk(
  "artwork/createArtwork",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/artworks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateArtwork = createAsyncThunk(
  "artwork/updateArtwork",
  async (formData, { rejectWithValue }) => {
    console.log(formData.artworkId);
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/artworks/${formData.artworkId}`,
        formData.formData,
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

const deleteArtwork = createAsyncThunk(
  "artwork/deleteArtwork",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/artworks/${id}`,
        {
          withCredentials: true,
        }
      );

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArtwork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArtwork.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = [...state.artworks, action.payload];
      })
      .addCase(createArtwork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchArtwork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtwork.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload;
   
      })
      .addCase(fetchArtwork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchArtwprkOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArtwprkOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload.artworks;
      })
      .addCase(fetchArtwprkOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

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

    builder
      .addCase(deleteArtwork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArtwork.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = state.artworks.filter(
          (artwork) => artwork._id !== action.payload
        );
      })
      .addCase(deleteArtwork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateArtwork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArtwork.fulfilled, (state, action) => {
        state.loading = false;
        state.artworks = action.payload
        console.log(action.payload);
      })
      .addCase(updateArtwork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default artworkState.reducer;


export {
  fetchArtworks,
  fetchArtworkUser,
  fetchArtwprkOfUser,
  fetchArtwork,
  createArtwork,
  deleteArtwork,
  updateArtwork,
};
