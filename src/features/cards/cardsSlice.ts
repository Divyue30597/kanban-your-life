import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteColumns } from "../columns/columnsSlice";
import { deleteBoard } from "../board/boardsSlice";

export type card = {
  id: string;
  heading: string;
  description: string;
  notes: string;
  date: string;
  link: string[];
  // tag: string;
  columnId: string;
  boardId: string;
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
    deleteCards: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card: card) => card.id !== action.payload
      );
      // localStorage.setItem("cards", JSON.stringify(state));
    },
    deleteColumnsWithCards: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card: card) => card.columnId !== action.payload
      );
      // localStorage.setItem("cards", JSON.stringify(state));
    },
    deleteBoardWithCards: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card: card) => card.boardId !== action.payload
      );
      // localStorage.setItem("cards", JSON.stringify(state));
    },
  },
});

export const {
  createCards,
  deleteCards,
  deleteColumnsWithCards,
  deleteBoardWithCards,
} = cardsSlice.actions;

export default cardsSlice.reducer;
