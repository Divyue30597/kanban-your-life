import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  storyPoints: number;
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
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card: card) => card.id !== action.payload
      );
      localStorage.setItem("cards", JSON.stringify(state));
    },
    deleteColumnsWithCards: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card: card) => card.columnId !== action.payload
      );
      localStorage.setItem("cards", JSON.stringify(state));
    },
    deleteBoardWithCards: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card: card) => card.boardId !== action.payload
      );
      localStorage.setItem("cards", JSON.stringify(state));
    },
    updateNotesByCardId: (
      state,
      action: PayloadAction<{ id: string; notes: string }>
    ) => {
      state.cards = state.cards.map((card: card) => {
        if (card.id === action.payload.id) {
          return {
            ...card,
            notes: action.payload.notes,
          };
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify(state));
    },
    updateCard: (
      state,
      action: PayloadAction<{ id: string; updatedCard: card }>
    ) => {
      state.card = state.cards.map((card: card) => {
        if (card.id === action.payload.id) {
          return {
            ...card,
            ...action.payload.updatedCard,
          };
        }
        return card;
      });

      localStorage.setItem("cards", JSON.stringify(state));
    },

    updateCardColumn: (
      state,
      action: PayloadAction<{ id: string; columnId: string }>
    ) => {
      state.cards = state.cards.map((card: card) => {
        if (card.id === action.payload.id) {
          return {
            ...card,
            columnId: action.payload.columnId,
          };
        }
        return card;
      });

      localStorage.setItem("cards", JSON.stringify(state));
    },
  },
});

export const {
  createCards,
  deleteCard,
  deleteColumnsWithCards,
  deleteBoardWithCards,
  updateNotesByCardId,
  updateCard,
  updateCardColumn,
} = cardsSlice.actions;

export default cardsSlice.reducer;
