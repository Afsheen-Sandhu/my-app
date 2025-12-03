import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  isOpen: boolean;
}

const initialState: SearchState = {
  isOpen: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSearch: (state) => {
      state.isOpen = true;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSearch, openSearch, closeSearch } = searchSlice.actions;

export const selectIsSearchOpen = (state: { search: SearchState }) =>
  state.search.isOpen;

export default searchSlice.reducer;


