import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

const initialState = {
  name: "",
  email: "",
  role: "user",
  events: [],
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  '/auth/login',
  async (userData, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", userData);
      if (!res?.success) {
        throw new Error('Failed to login');
      }
      const { data } = res;
      if (data?.token) {
        localStorage.setItem("drsfbuadcjk", data?.token);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (userData, thunkAPI) => {
    try {
      const data = await api.post("/auth/register", userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  '/auth/verify',
  async (thunkAPI) => {
    try {
      const res = await api.get("/auth/verify");

      if (!res?.success) {
        return thunkAPI.rejectWithValue(error.message);
      }

      const { data } = res;

      if (!data?.token) {
        return thunkAPI.rejectWithValue(error.message);
      }
      localStorage.setItem("drsfbuadcjk", data?.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    addUserEvent: (state, action) => {
      if (!state.events) {
        state.events = [];
      }

      if (!state.events.includes(action.payload?._id)) {
        state.events.push(action.payload?._id);
      }
    },
    removeUserEvent: (state, action) => {
      state.events = state.events.filter(eventId => eventId !== action.payload?._id);
    },
    removeUser: (state) => {
      state.name = "";
      state.email = "";
      state.role = "user";
      state.loading = false;
      state.error = null;
      localStorage.removeItem("drsfbuadcjk");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.events = action.payload.events;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.events = action.payload.events;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setUser, removeUser, addUserEvent } = userSlice.actions;
export default userSlice.reducer;
