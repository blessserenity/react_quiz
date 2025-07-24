import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerMember, loginMember, logoutMember, checkAuthStatus } from '../../api/api'

export const registerMemberThunk = createAsyncThunk('auth/registerMember', async (memberData, { rejectWithValue }) => {
   try {
      console.log('memberData : ', memberData)
      const response = await registerMember(memberData)
      return response.data.user
   } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data.message)
   }
})

export const loginMemberThunk = createAsyncThunk('auth/loginMember', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginMember(credentials)
      return response.data.member
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const logoutMemberThunk = createAsyncThunk('auth/logoutMember', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutMember()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      member: null,
      isAuthenticated: true,
      loading: true,
      error: null,
   },
   reducers: {
      clearAuthError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(registerMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.member = action.payload
         })
         .addCase(registerMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(loginMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.member = action.payload
            state.isAuthenticated = true
         })
         .addCase(loginMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.member = action.payload
         })
         .addCase(logoutMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutMemberThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.member = null
         })
         .addCase(logoutMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.member = action.payload.member || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            // state.isAuthenticated = false
            state.member = null
         })
   },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer
