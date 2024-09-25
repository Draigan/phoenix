import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  maxLetters: number;
  wordCategory: string;
  rewardUrl: string;
  pointsToWin: number;
}

let initialState: SettingsState;

function fetchFromStorage() {
  const data = localStorage.getItem('settings');
  if (data === null) {
    return null;
  }
  const parsed = JSON.parse(data)
  return parsed;
}
function putToStorage(settings: SettingsState) {
  const data = JSON.stringify(settings);
  localStorage.setItem('settings', data);
}

if (fetchFromStorage() === null) {
  initialState = {
    maxLetters: 4,
    wordCategory: 'wordsByLength',
    rewardUrl: 'https://www.youtube.com/watch?v=4kRSDTpN18w',
    pointsToWin: 30,
  };
  putToStorage(initialState);
} else {
  initialState = fetchFromStorage();
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMaxLetters: (state, action: PayloadAction<{ maxLetters: number }>) => {
      state.maxLetters = action.payload.maxLetters;
      putToStorage(state);
    },
    setWordCategory: (state, action: PayloadAction<{ wordCategory: string }>) => {
      state.wordCategory = action.payload.wordCategory;
      putToStorage(state);
    },
    setRewardUrl: (state, action: PayloadAction<{ rewardUrl: string }>) => {
      state.rewardUrl = action.payload.rewardUrl;
      putToStorage(state);
    },
    setPointsToWin: (state, action: PayloadAction<number>) => {
      let value = action.payload
      if (value === 0) {
        value = 1;
      }
      state.pointsToWin = value;
      putToStorage(state);
    },
  },
});

export const { setMaxLetters, setWordCategory, setRewardUrl, setPointsToWin } = settingsSlice.actions;
export default settingsSlice.reducer;
