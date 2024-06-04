import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type board = {
  id: string;
  name: string;
  link: string;
};

const initialState = { boards: [] };

const boardsSlice = createSlice({
  name: "boards",
  initialState: localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards")!)
    : initialState,
  reducers: {
    createBoards: (state, action: PayloadAction<board>) => {
      state.boards.push(action.payload);
      localStorage.setItem("boards", JSON.stringify(state));
    },
    updateBoard: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.boards = state.boards.map((board: board) => {
        if (board.id === action.payload.id) {
          return {
            ...board,
            name: action.payload.name,
            link: action.payload.name.toLowerCase().split(" ").join("-"),
          };
        }

        return board;
      });

      console.log(state.boards);
      localStorage.setItem("boards", JSON.stringify(state));
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(
        (board: board) => board.id !== action.payload
      );
      localStorage.setItem("boards", JSON.stringify(state));
    },
  },
});

export const { createBoards, updateBoard, deleteBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
