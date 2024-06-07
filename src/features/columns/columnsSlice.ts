import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type column = {
  id: string;
  name: string;
  boardId: string;
};

const initialState = { columns: [] };

const columnsSlice = createSlice({
  name: "columns",
  initialState: localStorage.getItem("columns")
    ? JSON.parse(localStorage.getItem("columns")!)
    : initialState,
  reducers: {
    createColumns: (state, action: PayloadAction<column>) => {
      state.columns.push(action.payload);
      localStorage.setItem("columns", JSON.stringify(state));
    },

    deleteColumns: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter(
        (column: column) => column.id !== action.payload
      );
      // localStorage.setItem("columns", JSON.stringify(state));
    },
    updateColumns: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.columns = state.columns.map((column: column) => {
        if (column.id === action.payload.id) {
          return {
            ...column,
            name: action.payload.name,
          };
        }
        return column;
      });
      // localStorage.setItem("columns", JSON.stringify(state));
    },
  },
});

export const { createColumns, deleteColumns, updateColumns } =
  columnsSlice.actions;

export default columnsSlice.reducer;
