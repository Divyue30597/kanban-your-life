import { ReactNode, createContext } from "react";

import calendar from "/styles/images/calendar.svg";
import Badge from "../Badge/badge";
import SVG from "../Svg/svg";
import styles from "./card.module.scss";

export const CardContext = createContext({});

function Card({ children }: { children: ReactNode }) {
  return (
    <CardContext.Provider value={{}}>
      <div className={styles.card} draggable>
        {children}
      </div>
    </CardContext.Provider>
  );
}

function CardTag() {
  return (
    <div className={styles.badges}>
      {Array.from({ length: 2 }).map((_, index) => (
        <Badge key={index} badge="In Progress" />
      ))}
    </div>
  );
}

function CardHeader() {
  return (
    <div className={styles.content}>
      <h2>Card</h2>
      <p>Description</p>
    </div>
  );
}

function CardNotes() {
  return (
    <div className={styles.notes}>
      <label htmlFor="notes">Notes:</label>
      <textarea name="notes" rows={4} id="notes" placeholder="Type here..." />
    </div>
  );
}

function CardFooter() {
  return (
    <div className={styles.footer}>
      <p>
        <SVG src={calendar} alt="Calendar" />
        Sep 24
      </p>
    </div>
  );
}

Card.CardHeader = CardHeader;
Card.CardTag = CardTag;
Card.CardNotes = CardNotes;
Card.CardFooter = CardFooter;

export default Card;
