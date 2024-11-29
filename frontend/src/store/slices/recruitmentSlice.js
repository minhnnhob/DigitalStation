import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  applyDefaults: [],
  applyDetails: null,
  recruitmentByJob: [],
  recruitmentDetails: null,
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
  async (applicantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recruitment/applicant/${applicantId}`,
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

const getOwnRecruitmentById = createAsyncThunk(
  "recruitment/getOwnRecruitmentById",
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recruitment/${applicationId}/detail_recuitment`,
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

const getRecruitmentByJob = createAsyncThunk(
  "recruitment/getRecruitmentByJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/recruitment/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log("jobId", jobId);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const updateRecruitment = createAsyncThunk(
  "recruitment/updateRecruitment",
  async (recruitmentData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/recruitment/${recruitmentData._id}/updateStatus`,
        recruitmentData,
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

const scheduleInterview = createAsyncThunk(
  "recruitment/scheduleInterview",
  async ({ applicationId, interviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/recruitment/${applicationId}/scheduleInterview`,
        interviewData,
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
        state.recruitmentDetails = action.payload;
 
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

    builder
      .addCase(getRecruitmentByJob.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecruitmentByJob.fulfilled, (state, action) => {
        state.recruitmentByJob = action.payload;
        console.log("recruitmentByJob", action.payload);
        state.loading = false;
      })
      .addCase(getRecruitmentByJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateRecruitment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecruitment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateRecruitment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(scheduleInterview.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getOwnRecruitmentById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOwnRecruitmentById.fulfilled, (state, action) => {
        state.applyDetails = action.payload;
        state.loading = false;
      })
      .addCase(getOwnRecruitmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recruitmentState.reducer;
export {
  applyJob,
  getOwnRecruitment,
  getRecruitmentById,
  confirmInterview,
  addFeedback,
  getRecruitmentByJob,
  updateRecruitment,
  scheduleInterview,
  getOwnRecruitmentById,
};
