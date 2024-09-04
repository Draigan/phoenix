import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type SettingsState = {
  maxLetters: number;
  wordCategory: string;
}


const initialState: SettingsState = {
  maxLetters: 3,
  wordCategory: 'wordsByLength',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMaxLetters: (state, action: PayloadAction<{ maxLetters: number }>) => {
      state.maxLetters = action.payload.maxLetters;
    },
    setWordCategory: (state, action: PayloadAction<{ wordCategory: string }>) => {
      state.wordCategory = action.payload.wordCategory;
    },
  },
});

export const { setMaxLetters, setWordCategory } = settingsSlice.actions;
export default settingsSlice.reducer;
