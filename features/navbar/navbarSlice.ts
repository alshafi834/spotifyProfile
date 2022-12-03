import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface navState {
  activeNav: string;
}

const initialState: navState = {
  activeNav: "Home",
};

export const navbarSlice = createSlice({
  name: "activNav",
  initialState,
  reducers: {
    updateActiveNav: (state, action: PayloadAction<string>) => {
      state.activeNav = action.payload;
    },
  },
});

export const { updateActiveNav } = navbarSlice.actions;
export default navbarSlice.reducer;
