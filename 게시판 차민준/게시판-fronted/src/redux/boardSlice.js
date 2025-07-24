import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { boardWrite, DeleteBoards, getBoards, updateBoard } from '../../api/api'

export const createWriteThunk = createAsyncThunk('board/write', async (writeData, { rejectWithValue }) => {
   try {
      const response = await boardWrite(writeData)
      return response.data.board
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const fetchBoardsThunk = createAsyncThunk('board/read', async (page, { rejectWithValue }) => {
   try {
      console.log('page : ', page)

      const response = await getBoards(page)

      console.log(response)

      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

export const deleteBoardsThunk = createAsyncThunk('board/delete', async (id, { rejectWithValue }) => {
   try {
      const response = await DeleteBoards(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})
export const updateBoardThunk = createAsyncThunk('board/updateBoard', async (data, { rejectWithValue }) => {
   try {
      const { id, boardData } = data
      const response = await updateBoard(id, boardData)

      return response.data.board
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const boardSlice = createSlice({
   name: 'board',
   initialState: {
      board: null,
      boards: [],
      pagination: null,
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createWriteThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createWriteThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload
         })
         .addCase(createWriteThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      builder
         .addCase(fetchBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
            // console.log(action.payload.boards)
            state.loading = false
            state.boards = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      builder
         .addCase(deleteBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBoardsThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      builder
         .addCase(updateBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload
         })
         .addCase(updateBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default boardSlice.reducer
