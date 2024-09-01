import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

type DataState = {
  audio: string;
  pictures: string[];
  word: string;
  status: string;
} | null;

export const fetchInitialData = createAsyncThunk('data/fetchInitialData', async () => {
  const response = await fetch('http://localhost:9999');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { audio: '', pictures: [], word: '', status: 'idle' } as DataState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        if (state) {
          state.status = 'loading';
        }
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        return {
          ...state = action.payload,
          status: 'succeeded',
        };
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        if (state) {
          state.status = 'failed';
        }
        console.error(action.error.message);
      });
  },
});

export default dataSlice.reducer;
