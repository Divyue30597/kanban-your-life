import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type boards = {
  name: string;
  link: string;
};

const initialState: boards[] = [];

const boardsSlice = createSlice({
  name: "boards",
  initialState: localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards")!)
    : initialState,
  reducers: {
    createBoards: {
      reducer: (state, action: PayloadAction<boards>) => {
        state.push(action.payload);
        localStorage.setItem("boards", JSON.stringify(state));
      },
      prepare: (name: string) => {
        return {
          payload: {
            name,
            link: name.toLowerCase().split(" ").join("-"),
          },
        };
      },
    },
    getBoards(state) {
      return state.payload;
    },
  },
});

export const { createBoards, getBoards } = boardsSlice.actions;

export default boardsSlice.reducer;
