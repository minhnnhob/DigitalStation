import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fetchCurrentUserLoading: false,
  loading: false,
  loggedIn: false,
  id: null,
  email: null,
  role: null,
  error: null,
};

const login = createAsyncThunk("user/login", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/users/login",
      user,
      { withCredentials: true }
    );
    // console.log(response.data);
    window.location.href = "/";
    return response.data;
  } catch (error) {
    user.error = error.response.data;
    throw new Error(error.response.data);
  }
});

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
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.id = null;
      state.email = null;
      state.role = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
export { login, register, logout, fetchCurrentUser };
