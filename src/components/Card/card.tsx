import calendar from "/styles/images/calendar.svg";
import Badge from "../Badge/badge";
import SVG from "../Svg/svg";
import styles from "./card.module.scss";

export default function Card() {
  return (
    <div className={styles.card} draggable>
      <div className={styles.badges}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Badge key={index} badge="In Progress" />
        ))}
      </div>
      <div className={styles.content}>
        <h2>Card</h2>
        <p>Description</p>
      </div>
      <div className={styles.notes}>
        <label htmlFor="notes">Notes:</label>
        <textarea name="notes" rows={4} id="notes" placeholder="Type here..." />
      </div>
      <hr />
      <div className={styles.footer}>
        <SVG src={calendar} alt="Calendar" /> <p>Sep 24</p>
      </div>
    </div>
  );
}
