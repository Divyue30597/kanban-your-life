import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type card = {
  id: string;
  status: string | string[];
  heading: string;
  description: string;
  notes: string;
  date: Date;
  tag: string;
  board: string;
};

const initialState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState: localStorage.getItem("cards")
    ? JSON.parse(localStorage.getItem("cards")!)
    : initialState,
  reducers: {
    createCards: (state, action: PayloadAction<card>) => {
      state.cards.push(action.payload);
      localStorage.setItem("cards", JSON.stringify(state));
    },
  },
});

export const { createCards } = cardsSlice.actions;

export default cardsSlice.reducer;
