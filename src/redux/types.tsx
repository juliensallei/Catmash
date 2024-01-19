import { catSlice } from "./slice";

export type RootState = {
  cats: ReturnType<typeof catSlice.reducer>;
};