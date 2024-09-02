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

store.dispatch(fetchInitialData());

export type RootState = ReturnType<typeof store.getState>;
export default store;
