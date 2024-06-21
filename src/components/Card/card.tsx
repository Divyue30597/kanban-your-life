import { ChangeEvent, DragEvent, HTMLProps, useState } from "react";

import Badge from "../Badge/badge";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import { CALENDAR, CLOCK, LINK } from "../Svg/svg";
import { useAppDispatch } from "@/store/storeHooks";
import { updateNotesByCardId } from "@/features/cards/cardsSlice";

interface CardProps extends HTMLProps<HTMLDivElement> {
  id: string;
}

function Card({ children, id, ...props }: CardProps) {
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setDragImage(e.target as HTMLElement, 100, 100);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragging");
  };

  return (
    <div
      className={styles.card}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      {...props}
    >
      {children}
    </div>
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

function CardNotes({ notes, id }: { notes: string; id: string }) {
  const dispatch = useAppDispatch();
  const [notesValue, setNotesValue] = useState({ value: notes, error: "" });

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!notesValue.value.length) {
      return setNotesValue({ value: "", error: "🚫 Notes cannot be empty." });
    }

    setNotesValue({
      value: event.target.value,
      error: "",
    });
    dispatch(updateNotesByCardId({ id, notes: event.target.value }));
  };

  return (
    <div className={styles.notes}>
      <label htmlFor="notes">Notes:</label>
      <textarea
        name="notes"
        rows={4}
        id="notes"
        value={notesValue.value}
        onChange={(e) => handleNotesChange(e)}
        placeholder="Type here..."
      />
      <p className="error_message">{notesValue.error}</p>
    </div>
  );
}

function CardLink({ links }: { links: string[] }) {
  return (
    <div className={styles.card_link}>
      {links.map((link, index) => {
        if (!link.length) return null;
        return (
          <Link key={link + index} to={link} target="_blank">
            <LINK />
          </Link>
        );
      })}
    </div>
  );
}

function CardFooter({
  date,
  storyPoints,
}: {
  date: string;
  storyPoints: number;
}) {
  return (
    <div className={`${styles.footer} flex_row flex_center space_between`}>
      <div className={`${styles.date} flex_row flex_center`}>
        <CLOCK />
        <p>{storyPoints}</p>
      </div>
      <div className={`${styles.date} flex_row flex_center`}>
        <CALENDAR />
        <p>{date}</p>
      </div>
    </div>
  );
}

Card.CardHeader = CardHeader;
Card.CardTag = CardTag;
Card.CardNotes = CardNotes;
Card.CardLink = CardLink;
Card.CardFooter = CardFooter;

export default Card;
