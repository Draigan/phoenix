import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WordState = {
  currentWord: string;
  audio: string;
  pictures: string[];
}

const initialState: WordState = {
  currentWord: 'cheese',
  audio: '',
  pictures: [],
};

const wordSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setToWord: (state, action: PayloadAction<{ currentWord: string; audio: string; pictures: string[] }>) => {
      console.log(action.payload, 'payload');
      state.currentWord = action.payload.currentWord;
      state.audio = action.payload.audio;
      state.pictures = action.payload.pictures;
    },
  },
});

export const { setToWord } = wordSlice.actions;
export default wordSlice.reducer;
