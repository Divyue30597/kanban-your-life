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
  const [isDraggable, setIsDraggable] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "copyMove";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setDragImage(e.target as HTMLElement, 50, 50);
    e.stopPropagation();
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.card + " " + (isDraggable ? styles.dragging : "")}
      draggable={isDraggable ? "true" : "false"}
      onMouseDown={() => setIsDraggable(true)}
      onMouseUp={() => setIsDraggable(false)}
      onMouseLeave={() => setIsDraggable(false)}
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
  id,
}: {
  heading: string;
  description: string;
  id: string;
}) {
  return (
    <div draggable="false" className={styles.content}>
      <h2>
        <Link
          draggable="false"
          onMouseDown={(e) => e.stopPropagation()}
          to={`/card/${id}`}
        >
          {heading}
        </Link>
      </h2>
      <p>{description}</p>
    </div>
  );
}

function CardNotes({ notes, id }: { notes: string; id: string }) {
  const dispatch = useAppDispatch();
  const [notesValue, setNotesValue] = useState({ value: notes, error: "" });

  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    setNotesValue((prevVal) => {
      return newValue.length === 0
        ? { ...prevVal, value: newValue, error: "🚫 Notes cannot be empty." }
        : { ...prevVal, value: newValue, error: "" };
    });

    if (newValue.length !== 0) {
      dispatch(updateNotesByCardId({ id, notes: newValue }));
    }
  };

  return (
    <div className={styles.notes} onMouseDown={(e) => e.stopPropagation()}>
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
          <Link
            draggable="false"
            onMouseDown={(e) => e.stopPropagation()}
            key={link + index}
            to={link}
            target="_blank"
          >
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
