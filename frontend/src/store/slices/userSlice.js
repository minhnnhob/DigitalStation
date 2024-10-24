import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fetchCurrentUserLoading: false,
  loading: false,
  loggedIn: false,
  id: null,
  email: null,
  name: null,
  userInfor: [],
  error: null,
  profilePicture: null,
  role: null,
};

const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", async () => {
  try {
    const response = await axios.get(`http://localhost:4000/api/users/infor`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
});

const login = createAsyncThunk("user/login", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/login",
      user,
      { withCredentials: true }
    );
    // console.log(response.data);

    return response.data;
  } catch (error) {
    user.error = error.response.data;
    throw new Error(error.response.data);
  }
});

// Update user profile

const register = createAsyncThunk("user/register", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/register",
      user,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error(error.response.data);
  }
});

const logout = createAsyncThunk("user/logout", async () => {
  try {
    await axios.get("http://localhost:4000/api/users/logout", {
      withCredentials: true,
    });

    console.log("logged out");
  } catch (error) {
    throw new Error(error.message);
  }
});

const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/users", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.loading = true;
      state.userInfor = action.payload;
      state.profilePicture = action.payload.profilePicture;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfor = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.fetchCurrentUserLoading = true;
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.fetchCurrentUserLoading = false;
        state.loading = false;
        state.loggedIn = true;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.role = action.payload.role;
        state.profilePicture = action.payload.profilePicture;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.fetchCurrentUserLoading = false;
        state.loading = false;
        state.loggedIn = false;
        state.id = null;
        state.email = null;
        state.name = null;
      });

    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.id = action.payload.userId;
        state.email = action.payload.email;
        state.role = action.payload.userType;
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.role = action.payload.role;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = false;
        state.id = null;
        state.email = null;
        state.role = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const { updateUser } = userSlice.actions;
export { login, register, logout, fetchCurrentUser, fetchUserInfo };
