import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
        // const res = await fetch('http://localhost:5000/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userData),
        // })
        // const data = await res.json();
        // if(!res.ok){
        //     throw new Error(data.message || 'Failed to login');
        // }
        // return data;
        if(userData.username === 'admin' && userData.password === 'password') {
        return { token: 'dummy-auth-token'}
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null
  },
  reducers:{
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        sessionStorage.setItem('authToken', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;