import { ReactNode, createContext, useState } from "react";

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

function CardTag({ tagName }: { tagName: string }) {
  return (
    <div className={styles.badges}>
      {Array.from({ length: 2 }).map((_, index) => (
        <Badge key={index} badge={tagName} />
      ))}
    </div>
  );
}

function CardHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className={styles.content}>
      <h2>{heading}</h2>
      <p>{description}</p>
    </div>
  );
}

function CardNotes({ notes }: { notes: string }) {
  const [notesValue, setNotesValue] = useState(notes);
  return (
    <div className={styles.notes}>
      <label htmlFor="notes">Notes:</label>
      <textarea
        name="notes"
        rows={4}
        id="notes"
        value={notesValue}
        onChange={(e) => {
          setNotesValue(e.target.value);
        }}
        placeholder="Type here..."
      />
    </div>
  );
}

function CardFooter({ date }: { date: string }) {
  return (
    <div className={styles.footer}>
      <SVG src={calendar} alt="Calendar" />
      <p>{date}</p>
    </div>
  );
}

Card.CardHeader = CardHeader;
Card.CardTag = CardTag;
Card.CardNotes = CardNotes;
Card.CardFooter = CardFooter;

export default Card;
