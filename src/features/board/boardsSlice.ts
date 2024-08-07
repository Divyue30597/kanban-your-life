import { board } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
          };
        }
        return board;
      });

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
