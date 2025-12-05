import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  isOpen: boolean;
  query: string;
}

const initialState: SearchState = {
  isOpen: false,
  query: "",
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
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { toggleSearch, openSearch, closeSearch, setQuery } =
  searchSlice.actions;

export const selectIsSearchOpen = (state: { search: SearchState }) =>
  state.search.isOpen;

export const selectSearchQuery = (state: { search: SearchState }) =>
  state.search.query;

export default searchSlice.reducer;
