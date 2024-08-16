import { useState } from "react";
import styles from "./navbar.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { updateAchievedTarget } from "@/features/dates/datesSlice";
import { date } from "@/types/types";

export default function Navbar() {
  const date = new Date();
  const presentDate = date.getDate();

  const selector = useAppSelector((state) => state.dates);
  const todaysTarget = selector.dates.filter(
    (date: date) => date.date === presentDate
  );

  let [achievedTarget, setAchievedTarget] = useState(
    todaysTarget[0].achievedTarget
  );

  const dispatch = useAppDispatch();

  const handleAchievedTarget = () => {
    setAchievedTarget(!achievedTarget);
    dispatch(
      updateAchievedTarget({
        achievedTarget: achievedTarget,
        date: presentDate,
      })
    );
  };

  return (
    <div className={styles.nav}>
      <h1>Kanban Your Life</h1>
      <div className={styles.stats}>
        <label>
          Goals crushed today?
          <input
            type="checkbox"
            checked={todaysTarget[0].achievedTarget}
            onChange={handleAchievedTarget}
          />
          <span className={styles.checkbox}></span>
        </label>
      </div>
    </div>
  );
}
