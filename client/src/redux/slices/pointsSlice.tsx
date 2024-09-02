import { createSlice } from '@reduxjs/toolkit';

const pointsSlice = createSlice({
  name: 'points',
  initialState: Number(localStorage.getItem('points')),
  reducers: {
    increment: (state) => {
      const updated = state + 1;
      localStorage.setItem('points', updated.toString());
      return updated;
    },
  },
});

export const { increment } = pointsSlice.actions;
export default pointsSlice.reducer;
