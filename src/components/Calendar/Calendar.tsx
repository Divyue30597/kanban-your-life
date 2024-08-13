import styles from "@/components/Calendar/calendar.module.scss";
import { WEEKDAY } from "@/constant/constant";

export default function Calendar() {
  const currentDate = new Date();
  const todayDate = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const numOfDays = getNumberDaysInMonth(year, month);
  let daysWithWeekday = [];

  for (let i = 0; i < numOfDays; i++) {
    daysWithWeekday.push({
      date: i + 1,
      weekday: getDaysForAllWeekInMonth(year, month, i + 1),
    });
  }

  return (
    <div className={styles.calendar}>
      {daysWithWeekday.map((day) => {
        return (
          <div
            className={styles.day}
            style={{
              backgroundColor: todayDate === day.date ? "#41B06E" : "",
              color: todayDate === day.date ? "#fff" : "",
            }}
            key={day.date}
          >
            <p>{WEEKDAY[day.weekday]}</p>
            <p className={styles.date}>{day.date}</p>
          </div>
        );
      })}
    </div>
  );
}

function getNumberDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getDaysForAllWeekInMonth(year: number, month: number, date: number) {
  return new Date(year, month, date).getDay();
}
