import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'https://enzo.draigan.com/phoenixdata';

type DataItem = {
  data: {
    audio: string;
    pictures: string[];
    word: string;
  }[];
  list: string[];
}
export type DataState = {
  data: {
    [key: string]: DataItem;
  }
  wordsByLength: {
    [length: string]: {
      data: {
        audio: string;
        pictures: string[];
        word: string;
      }[];
      list: string[];
    };
  };
  status: string;
};

// Async thunk for fetching initial data
export const fetchInitialData = createAsyncThunk('data/fetchInitialData', async () => {
  const response = await fetch(backendURL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('from server: ', data);
  return data;
});

const initialState: DataState = {
  data: {
    allWords: {
      data: [],
      list: [],
    },
  },
  wordsByLength: {},
  status: 'idle',
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.status = 'failed';
        console.error(action.error.message);
      });
  },
});

export default dataSlice.reducer;
