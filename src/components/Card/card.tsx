import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  HTMLProps,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import Badge from "../Badge/badge";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";
import { CALENDAR, DELETE, EDIT, LINK } from "../Svg/svg";
import { useAppDispatch } from "@/store/storeHooks";
import { deleteCard, updateNotesByCardId } from "@/features/cards/cardsSlice";
import Modal from "../Modal/modal";
import Button from "../Button/button";
import useCardContext from "./useCardContext";

interface CardContextProps {
  setIsDraggable: Dispatch<SetStateAction<boolean>>;
}

export const CardContext = createContext<CardContextProps | null>(null);

function Card({ children, ...props }: HTMLProps<HTMLDivElement>) {
  const [isDraggable, setIsDraggable] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", (e.target as HTMLElement).id);
    e.dataTransfer.setDragImage(e.target as HTMLElement, 100, 100);
    e.stopPropagation();
  };

  return (
    <CardContext.Provider value={{ setIsDraggable }}>
      <div
        className={styles.card}
        draggable={isDraggable ? "true" : "false"}
        onMouseDownCapture={(e) => {
          setIsDraggable(true);
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          setIsDraggable(false);
          e.stopPropagation();
        }}
        onDragStart={handleDragStart}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

function CardTag({ tagName }: { tagName: string }) {
  // const onDragStart = (e: DragEvent) => {
  //   e.dataTransfer.effectAllowed = "move";
  //   if ((e.target as HTMLElement).parentNode) {
  //     e.dataTransfer.setData("text/html", (e.target as HTMLElement).parentNode);
  //     e.dataTransfer.setDragImage((e.target as HTMLElement).parentNode, 20, 20);
  //   }
  // };

  return (
    <div
      style={{ marginBottom: "1.2rem" }}
      className="flex_row space_between align_center"
    >
      <div className={styles.badges}>
        {Array.from({ length: 2 }).map((_, index) => (
          <Badge key={index} badge={tagName} />
        ))}
      </div>
      {/* <div onDragStart={onDragStart} draggable>
        <DRAGANDDROP />
      </div> */}
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
  const { setIsDraggable } = useCardContext();

  const handleDeleteCard = () => {
    dispatch(deleteCard(id));
  };

  return (
    <div className={`${styles.footer} flex_row space_between`}>
      <div className={`${styles.modal_btns} flex_row flex_center`}>
        <Modal>
          <Modal.Button className={styles.edit_btn}>
            <EDIT />
          </Modal.Button>
          <Modal.Body heading="Edit Card">This is Modal Body</Modal.Body>
        </Modal>
        <Modal>
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
