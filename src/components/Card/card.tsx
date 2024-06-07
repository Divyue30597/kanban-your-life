import { ReactNode, createContext, useState } from "react";

import calendar from "/styles/images/calendar.svg";
import link_icon from "/styles/images/link.svg";

import Badge from "../Badge/badge";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import { CALENDAR, LINK } from "../Svg/svg";

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
      <CALENDAR />
      <p>{date}</p>
    </div>
  );
}

function CardLink({ links }: { links: string[] }) {
  return (
    <div className={styles.card_link}>
      {links.map((link, index) => {
        return (
          <Link key={link + index} to={link} target="_blank">
            <LINK />
          </Link>
        );
      })}
    </div>
  );
}

Card.CardHeader = CardHeader;
Card.CardTag = CardTag;
Card.CardNotes = CardNotes;
Card.CardLink = CardLink;
Card.CardFooter = CardFooter;

export default Card;
