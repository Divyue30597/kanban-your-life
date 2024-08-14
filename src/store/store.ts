import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "@/features/board/boardsSlice";
import datesReducer from "@/features/dates/datesSlice";
// import cardsReducer from "@/features/cards/cardsSlice";
// import columnsReducer from "@/features/columns/columnsSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    dates: datesReducer,
    // cards: cardsReducer,
    // columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
