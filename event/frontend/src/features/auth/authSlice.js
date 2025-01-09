import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH_URL}/auth`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});
export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH_URL}/delete`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (userDetails) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_AUTH_URL}/update/${userDetails.id}`, userDetails);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  });

                 

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        authError: null,
        authLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.authLoading = true;
                state.authError = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.authError = null;
                state.authLoading = false;
            })

            .addCase(login.rejected, (state, action) => {
                state.authError = action.payload;
            })

            .addCase(logout.pending, (state, action) => {
                state.authLoading = true;
                state.authError = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.authError = null;
                state.authLoading = false;
            })

            .addCase(logout.rejected, (state, action) => {
                state.authError = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
              })

              .addCase(updateUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.authError = null;
                state.authLoading = false;
              })
              .addCase(updateUser.rejected, (state, action) => {
                state.authError = action.payload;
                state.authLoading = false;
              });
    },
});

export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthError = (state) => state.auth.authError;

export default authSlice.reducer;
