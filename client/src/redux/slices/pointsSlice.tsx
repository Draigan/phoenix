import { createSlice } from '@reduxjs/toolkit';

// Initialize points to 0 in local storage before anything
const points = localStorage.getItem('points');
if (points === null) {
  localStorage.setItem('points', '0');
}

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
