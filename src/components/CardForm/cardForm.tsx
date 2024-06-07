import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";

import plus_icon from "/styles/images/plus.svg";

import styles from "./cardForm.module.scss";

import { useAppDispatch } from "@/store/storeHooks";
import { createCards } from "@/features/cards/cardsSlice";

import Button from "../Button/button";
import TextInput from "../Input/input";
import { PLUS } from "../Svg/svg";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface CardFormProps {
  colId: string;
}

export default function AddCardForm({ colId }: CardFormProps) {
  const [linkLen, setLinkLen] = useState(1);
  const [formState, setFormState] = useState({
    heading: "",
    description: "",
    notes: "",
    link: Array(linkLen).fill(""),
    date: "",
  });

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLinkChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLinks = [...formState.link];
    updatedLinks[index] = event.target.value;
    setFormState((prevState) => ({ ...prevState, link: updatedLinks }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { date } = formState;
    const newDate = new Date(date);
    const dateTime = newDate.getDate();
    const month = MONTHS[newDate.getMonth()];

    const payload = {
      id: uuid(),
      ...formState,
      columnId: colId,
      boardId: pathname.split("/")[1],
      date: `${dateTime} ${month}`,
    };

    dispatch(createCards(payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        required
        type="text"
        label="Heading"
        labelId="heading"
        value={formState.heading}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({ ...formState, heading: e.target.value })
        }
        placeholder="Eg. Look for new recipe"
        errorMessage="🚫 Heading cannot empty!!"
      />
      <TextInput
        required
        type="text"
        label="Description"
        labelId="description"
        value={formState.description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({ ...formState, description: e.target.value })
        }
        placeholder="Eg. Found this on the internet"
        errorMessage="🚫 Description cannot empty!!"
      />
      <TextInput
        required
        type="text"
        label="Notes"
        labelId="notes"
        value={formState.notes}
        placeholder="Enter Notes..."
        errorMessage="🚫 Notes cannot empty!!"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({
            ...formState,
            notes: e.target.value,
          })
        }
      />
      <div className={styles.link}>
        <div>
          {formState.link.map((linkVal, index) => (
            <input
              key={index}
              id="link"
              type="text"
              value={linkVal}
              placeholder="Add Link..."
              onChange={(e) => handleLinkChange(e, index)}
            />
          ))}
        </div>
        <Button
          type="button"
          onClick={() => {
            setFormState({
              ...formState,
              link: [...formState.link, ""],
            });
            setLinkLen(linkLen + 1);
          }}
        >
          <PLUS />
        </Button>
      </div>
      <TextInput
        required
        type="date"
        label="To be Completed by"
        labelId="date"
        min={Date.now().toString()}
        value={formState.date}
        errorMessage="🚫 Date cannot empty!!"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({ ...formState, date: e.target.value })
        }
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
