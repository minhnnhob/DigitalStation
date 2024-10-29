import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  applyDefaults: [],
  applyDetails: null,
  loading: null,
  error: null,
};

const applyJob = createAsyncThunk(
  "apply/applyJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/recruitment/apply",
        jobData,
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

const getOwnRecruitment = createAsyncThunk(
  "recruitment/getOwnRecruitment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/recruitment/my_recuitment",
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

const getRecruitmentById = createAsyncThunk(
  "recruitment/getRecruitmentById",
  async (recruitmentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recruitment/my_recuitment/${recruitmentId}`,
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

const confirmInterview = createAsyncThunk(
  "recruitment/confirmInterview",
  async (recruitmentId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/recruitment/${recruitmentId}/confirmInterview`,
        {},
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

const addFeedback = createAsyncThunk(
  "recruitment/addFeedback",
  async ({ applicationId, feedback }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/recruitment/${applicationId}/addInterviewFeedback`,
        feedback,
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

const recruitmentState = createSlice({
  name: "recruitment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applyJob.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(applyJob.fulfilled, (state, action) => {
      state.applyDefaults = action.payload;
      state.loading = false;
    });
    builder.addCase(applyJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder
      .addCase(getOwnRecruitment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOwnRecruitment.fulfilled, (state, action) => {
        state.applyDefaults = action.payload;
        state.loading = false;
      })
      .addCase(getOwnRecruitment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getRecruitmentById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecruitmentById.fulfilled, (state, action) => {
        state.applyDetails = action.payload;
        state.loading = false;
      })
      .addCase(getRecruitmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(confirmInterview.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmInterview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(confirmInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addFeedback.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recruitmentState.reducer;
export { applyJob, getOwnRecruitment, getRecruitmentById, confirmInterview,addFeedback };
