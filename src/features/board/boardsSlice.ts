import { board, card, column } from "@/types/types";
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
      state[action.payload.id] = action.payload;
      localStorage.setItem("boards", JSON.stringify(state));
    },
    createColumns: (state, action: PayloadAction<column>) => {
      state[action.payload.boardId].columns.push(action.payload);
      localStorage.setItem("boards", JSON.stringify(state));
    },
    createCard: (state, action: PayloadAction<card>) => {
      state[action.payload.boardId].columns[0].cards.push(action.payload);
      localStorage.setItem("boards", JSON.stringify(state));
    },
    // Update functionalities
    updateBoard: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      // console.log(state)
      state[action.payload.id].name = action.payload.name;
      localStorage.setItem("boards", JSON.stringify(state));
    },
    updateColumns: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        // color: string;
        boardId: string;
      }>
    ) => {
      state[action.payload.boardId].columns = state[
        action.payload.boardId
      ].columns.map((col: column) => {
        if (action.payload.id === col.id) {
          return {
            ...col,
            name: action.payload.name,
            // color: action.payload.color,
          };
        }
        return col;
      });
      localStorage.setItem("boards", JSON.stringify(state));
    },
    // Delete functionalities
    deleteBoard: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
      localStorage.setItem("boards", JSON.stringify(state));
    },
    deleteColumns: (
      state,
      action: PayloadAction<{ id: string; boardId: string }>
    ) => {
      state[action.payload.boardId].columns = state[
        action.payload.boardId
      ].columns.filter((col: column) => col.id !== action.payload.id);
      localStorage.setItem("boards", JSON.stringify(state));
    },
  },
});

export const {
  createBoards,
  createColumns,
  createCard,
  updateBoard,
  updateColumns,
  deleteBoard,
  deleteColumns,
} = boardsSlice.actions;

export default boardsSlice.reducer;
