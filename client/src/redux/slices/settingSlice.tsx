import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  maxLetters: number;
  wordCategory: string;
  rewardUrl: string;
  pointsTowin: number;
}

const initialState: SettingsState = {
  maxLetters: 3,
  wordCategory: 'wordsByLength',
  rewardUrl: 'https://www.youtube.com/watch?v=4kRSDTpN18w',
  pointsTowin: 10,
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
    setRewardUrl: (state, action: PayloadAction<{ rewardUrl: string }>) => {
      state.rewardUrl = action.payload.rewardUrl;
    },
    setPointsToWin: (state, action: PayloadAction<{ setPointsToWin: number }>) => {
      state.pointsTowin = action.payload.setPointsToWin;
    },
  },
});

export const { setMaxLetters, setWordCategory, setRewardUrl, setPointsToWin } = settingsSlice.actions;
export default settingsSlice.reducer;
