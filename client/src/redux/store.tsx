import { configureStore } from '@reduxjs/toolkit';
import pointsReducer from './slices/pointsSlice';
import dataReducer, { fetchInitialData } from './slices/dataSlice';
import wordsReducer from './slices/wordSlice';

const store = configureStore({
  reducer: {
    points: pointsReducer,
    data: dataReducer,
    words: wordsReducer,
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
