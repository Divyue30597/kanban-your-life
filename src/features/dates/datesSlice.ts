import { date } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const datesSlice = createSlice({
  name: "dates",
  initialState: {
    dates: localStorage.getItem("dates")
      ? JSON.parse(localStorage.getItem("dates")!)
      : initDate(),
  },
  reducers: {
    updateAchievedTarget: (
      state,
      action: PayloadAction<{ achievedTarget: boolean; date: number }>
    ) => {
      state.dates = state.dates.map((day: date) => {
        if (day.date === action.payload.date) {
          return {
            ...day,
            achievedTarget: !action.payload.achievedTarget,
          };
        }

        return day;
      });

      localStorage.setItem("dates", JSON.stringify(state.dates));
    },
  },
});

function initDate(): date[] {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const numOfDays = getNumberDaysInMonth(year, month);
  let daysWithWeekday = [];

  for (let i = 0; i < numOfDays; i++) {
    daysWithWeekday.push({
      date: i + 1,
      weekday: getDaysForAllWeekInMonth(year, month, i + 1),
      achievedTarget: false,
    });
  }

  localStorage.setItem("dates", JSON.stringify(daysWithWeekday));

  return daysWithWeekday;
}

function getNumberDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getDaysForAllWeekInMonth(year: number, month: number, date: number) {
  return new Date(year, month, date).getDay();
}

export const { updateAchievedTarget } = datesSlice.actions;

export default datesSlice.reducer;
