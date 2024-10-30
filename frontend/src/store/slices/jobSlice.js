// src/features/jobs/jobSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
const fetchAllJobs = createAsyncThunk(
  //studioJob
  "jobs/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const { filters } = getState().job;

    const params = {
      ...filters,
    };

    try {
      const response = await axios.get(
        "http://localhost:4000/api/jobs",
        { params },
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

const fetchJobById = createAsyncThunk(
  "jobs/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/jobs/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const createJob = createAsyncThunk(
  "jobs/create",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/jobs",
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

const getOwnJobs = createAsyncThunk(
  "jobs/getOwnJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/jobs/owned/Jobs",
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

const updateJob = createAsyncThunk(
  "jobs/update",
  async ({ jobId, jobData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/jobs/${jobId}`,
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

const deleteJob = createAsyncThunk(
  "jobs/delete",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/jobs/${jobId}`,
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

// Job Slice
const jobState = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    selectedJob: null,
    filters: {},
    loading: true,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
        console.log("state.selectedJob", state.selectedJob);
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = [...state.jobs, action.payload];
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getOwnJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOwnJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobsWithRecruitmentCount;
      
      })
      .addCase(getOwnJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
        
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    builder
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobState.reducer;
export { fetchAllJobs, fetchJobById, createJob, getOwnJobs , updateJob, deleteJob };
export const { setFilters } = jobState.actions;
