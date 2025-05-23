import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, logoutAPI, checkAuthAPI, extendSessionAPI } from "./authApi";
import { toast } from "react-toastify";

// Thunks for authentication actions
export const login = createAsyncThunk(
  "studentAuth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginAPI(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "studentAuth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerAPI(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "studentAuth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("cart");
      const data = await logoutAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Convert checkAuth to createAsyncThunk
export const checkAuth = createAsyncThunk(
  "studentAuth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {      
      const response = await checkAuthAPI();
      
      return response.user;
    } catch (error) {
      
      if (error.response?.status === 403) {
        console.log("403 error detected, returning rejectWithValue.");
        return rejectWithValue({ status: 403, message: "Unauthorized" });
      }
      return rejectWithValue(error.message || "Failed to check authentication");
    }
  }
);

export const extendSession = createAsyncThunk(
  "studentAuth/extendSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await extendSessionAPI();
      if (response.data.success) {
        localStorage.setItem(
          "accessTokenExpiry", 
          Date.now() + (response.data.accessTokenExpiresIn * 1000)
        );
        return response.data;
      }
      return rejectWithValue("Failed to extend session");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
  authInitialized: false,
};

const studentAuthSlice = createSlice({
  name: "studentAuth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Add manual auth actions
    authSuccess: (state, action) => {
      state.user = action.payload;
      state.authInitialized = true;
      state.status = "succeeded";
      state.error = null;
    },
    authFailure: (state) => {
      state.user = null;
      state.authInitialized = true;
      state.status = "failed";
    }
  },
  extraReducers: (builder) => {
    builder
      // Login actions
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.authInitialized = true;
        toast.success("Successfully logged in!");
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Register actions
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.authInitialized = true;
        toast.success("Account registered successfully!");
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      // CheckAuth actions
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.authInitialized = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.authInitialized = true;
        state.error = action.payload;
        state.user = null;
        toast.error("Session expired. Please log in again.");
      })
      // Logout actions
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.authInitialized = true;
        toast.success("Logged out successfully.");
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Logout failed. Please try again.");
      })
      .addCase(extendSession.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Session extended successfully");
      })
      .addCase(extendSession.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.authInitialized = true;
        toast.error("Session extension failed. Please login again.");
      });
  },
});

export const { clearError, authSuccess, authFailure } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;