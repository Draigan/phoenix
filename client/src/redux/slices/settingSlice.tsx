import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WordCategory = 'all' | 'animals' | 'colours';

type SettingsState = {
  maxLetters: number;
  wordCategory: WordCategory;
}


const initialState: SettingsState = {
  maxLetters: 3,
  wordCategory: 'all',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMaxLetters: (state, action: PayloadAction<{ maxLetters: number }>) => {
      state.maxLetters = action.payload.maxLetters;
    },
    setWordCategory: (state, action: PayloadAction<{ wordCategory: WordCategory }>) => {
      state.wordCategory = action.payload.wordCategory;
    },
  },
});

export const { setMaxLetters } = settingsSlice.actions;
export default settingsSlice.reducer;
