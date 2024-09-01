import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: "cheese",
  reducers: {
    change: (state) => {
      const updated = state + 1;
      localStorage.setItem('points', updated.toString());
      return updated;
    },
  },
});

export const { change } = dataSlice.actions;
export default dataSlice.reducer;
