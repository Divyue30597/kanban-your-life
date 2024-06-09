import {
  ChangeEvent,
  DragEvent,
  HTMLProps,
  createContext,
  useState,
} from "react";

import Badge from "../Badge/badge";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import { CALENDAR, DELETE, DRAGANDDROP, EDIT, LINK } from "../Svg/svg";
import { useAppDispatch } from "@/store/storeHooks";
import { deleteCard, updateNotesByCardId } from "@/features/cards/cardsSlice";
import Modal from "../Modal/modal";
import Button from "../Button/button";
import useCardContext from "./useCardContext";

interface CardContextProps {
  handleDraggable: () => void;
}

export const CardContext = createContext<CardContextProps | null>(null);

function Card({ children, ...props }: HTMLProps<HTMLDivElement>) {
  const [isDraggable, setIsDraggable] = useState(false);

  const handleDraggable = () => {
    setIsDraggable(!isDraggable);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", (e.target as HTMLElement).id);
    e.dataTransfer.setDragImage(e.target as HTMLElement, 100, 100);
    e.stopPropagation();
  };

  return (
    <CardContext.Provider value={{ handleDraggable }}>
      <div
        className={styles.card}
        draggable={isDraggable ? "true" : "false"}
        onMouseDown={handleDraggable}
        onMouseUp={handleDraggable}
        onDragStart={handleDragStart}
        {...props}
      >
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

function CardFooter({ date, id }: { date: string; id: string }) {
  const dispatch = useAppDispatch();
  const { handleDraggable } = useCardContext();

  const handleDeleteCard = () => {
    dispatch(deleteCard(id));
  };

  return (
    <div className={`${styles.footer} flex_row space_between`}>
      <div className={`${styles.modal_btns} flex_row flex_center`}>
        <Modal handleProps={handleDraggable}>
          <Modal.Button className={styles.edit_btn}>
            <EDIT />
          </Modal.Button>
          <Modal.Body heading="Edit Card">This is Modal Body</Modal.Body>
        </Modal>
        <Modal handleProps={handleDraggable}>
          <Modal.Button className={styles.del_btn}>
            <DELETE />
          </Modal.Button>
          <Modal.Body heading="Delete Card" className={styles.del_modal_body}>
            <p>
              Are you sure you want to{" "}
              <span style={{ fontFamily: "DMSansBold" }}>delete</span> this
              card?
            </p>
            <Button
              onClick={handleDeleteCard}
              type="button"
              className={styles.del_modal_btn}
            >
              Confirm
            </Button>
          </Modal.Body>
        </Modal>
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
