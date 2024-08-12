import { board, column } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = { boards: [] };

const boardsSlice = createSlice({
  name: "boards",
  initialState: localStorage.getItem("boards")
    ? JSON.parse(localStorage.getItem("boards")!)
    : initialState,
  reducers: {
    // Create functionalities
    createBoards: (state, action: PayloadAction<board>) => {
      state.boards.push(action.payload);
      localStorage.setItem("boards", JSON.stringify(state));
    },
    createColumns: (state, action: PayloadAction<column>) => {
      console.log(state, action.payload);

      if (action.payload.boardId === state.id) {
        state.boards.columns.push(action.payload);
        localStorage.setItem("boards", JSON.stringify(state));
      }
    },
    // Update functionalities
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
    updateColumns: (
      state,
      action: PayloadAction<{ id: string; name: string; color: string }>
    ) => {
      state.boards.column = state.boards.column.map((col: column) => {
        if (col.id === action.payload.id) {
          return {
            ...col,
            name: action.payload.name,
            color: action.payload.color,
          };
        }
      });
      localStorage.setItem("boards", JSON.stringify(state));
    },
    // Delete functionalities
    deleteBoard: (state, action: PayloadAction<string>) => {
      console.log(state.boards, action.payload);
      state.boards = state.boards.filter((board: board) => board.id !== action.payload);
      localStorage.setItem("boards", JSON.stringify(state));
    },
    deleteColumns: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter(
        (column: column) => column.id !== action.payload
      );
      localStorage.setItem("boards", JSON.stringify(state));
    },
  },
});

export const {
  createBoards,
  createColumns,
  updateBoard,
  updateColumns,
  deleteBoard,
  deleteColumns,
} = boardsSlice.actions;

export default boardsSlice.reducer;
