import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ======================= Login =======================
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
        const res = await fetch('http://192.168.8.144:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        const data = await res.json();
        if(!res.ok){
            return thunkAPI.rejectWithValue(data.message || 'Unknown error occurred. Please try again');
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
)

// ======================= Register =======================
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
        const res = await fetch('http://192.168.8.144:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        const data = await res.json();
        if(!res.ok){
            return thunkAPI.rejectWithValue(data.message || 'Unknown error occurred. Please try again');
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
)

// ======================= Get User Data =============================
export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, thunkAPI) => {
    try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            return thunkAPI.rejectWithValue('No authentication token found');
        }
        const res = await fetch('http://192.168.8.144:4000/auth/getUserData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.status === 401 || res.status === 403){
          sessionStorage.removeItem('authToken');
          return thunkAPI.rejectWithValue('Unauthorized.');
        }
        const data = await res.json();
        if(!res.ok){
            return thunkAPI.rejectWithValue(data.message || 'Unknown error occurred. Please try again');
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const token = typeof window !== 'undefined' ? sessionStorage.getItem('authToken') : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!token,
    token: token,
    loading: false,
    error: null,
    registered: false,
    message: null,
    userData: null,
  },
  reducers:{
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userData = null;
      sessionStorage.removeItem('authToken');
    }
  },
  extraReducers: (builder) => {
    builder
    // ======================= Login =======================
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        sessionStorage.setItem('authToken', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ======================= Register =======================
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null
        state.registered = true
        state.message = action.payload.message
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ======================= Get User Data =============================
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userData = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if(action.payload === 'Unauthorized.'){
        state.isAuthenticated = false;
        state.token = null;
        state.userData = null;
        sessionStorage.removeItem('authToken');
        }
      })
  },
});

export default authSlice.reducer;