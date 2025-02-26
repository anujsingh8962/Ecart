import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import searchReducer from "./searchSlice"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    search: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
