import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './slices/pointsSlice';
import dataReducer, { fetchInitialData } from './slices/dataSlice';
import wordsReducer from './slices/wordSlice';
import settingsReducer from './slices/settingSlice';

const store = configureStore({
  reducer: {
    points: pointsReducer,
    data: dataReducer,
    words: wordsReducer,
    settings: settingsReducer,
  },
});

(async () => {
  try {
    await store.dispatch(fetchInitialData());
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

export type RootState = ReturnType<typeof store.getState>;
export default store;
