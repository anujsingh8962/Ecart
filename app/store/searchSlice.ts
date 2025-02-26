import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchedQuery: string | null;
}

const initialState: SearchState = {
    searchedQuery: '',
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
});

export const { setSearchedQuery } = searchSlice.actions;
export default searchSlice.reducer;
