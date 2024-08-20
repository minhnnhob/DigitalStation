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
    console.log(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
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
  await axios.post("http://localhost:4000/api/auth/logout", null, {
    withCredentials: true,
  });
});

const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/users/66bdb7c0b76a90fc4b0296e4",
      
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
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
  },
});

export default userSlice.reducer;
export { login, register, logout, fetchCurrentUser };
