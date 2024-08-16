import styles from "@/components/Calendar/calendar.module.scss";
import { MONTHS, WEEKDAY } from "@/constant/constant";
import { CORRECT, WRONG } from "../Svg/svg";
import { useAppSelector } from "@/store/storeHooks";
import { date } from "@/types/types";
import ConfettiExplosion from "react-confetti-explosion";

export default function Calendar() {
  const currentDate = new Date();
  const todayDate = currentDate.getDate();
  const month = currentDate.getMonth();

  const selector = useAppSelector((state) => state.dates);

  return (
    <div className={styles.calendar}>
      <p className={styles.month} key={month}>
        {MONTHS[month]
          .toLocaleUpperCase()
          .split("")
          .map((letter) => {
            return <span key={letter}>{letter}</span>;
          })}
      </p>
      {selector.dates.map((day: date) => {
        return (
          <div
            className={styles.day}
            style={{
              backgroundColor: todayDate === day.date ? "#41B06E" : "#d9efe2",
              color: todayDate === day.date ? "#fff" : "",
            }}
            key={day.date}
          >
            <div className={styles.target}>
              {day.achievedTarget && day.date <= todayDate ? (
                <>
                  <CORRECT />
                  <ConfettiExplosion />
                </>
              ) : day.date >= todayDate ? (
                ""
              ) : (
                <WRONG />
              )}
            </div>
            <p>{WEEKDAY[day.weekday]}</p>
            <p className={styles.date}>{day.date}</p>
          </div>
        );
      })}
    </div>
  );
}
