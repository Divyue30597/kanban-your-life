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
  },
});

export const { createColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
