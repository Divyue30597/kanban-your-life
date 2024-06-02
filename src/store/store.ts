import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // boards: boardsReducer,
    // cards: cardsReducer,
  },
});

export default store;
