import { v4 as uuid } from "uuid";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Button from "../Button/button";
import TextInput from "../Input/input";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { createCards } from "@/features/cards/cardsSlice";
import { useLocation } from "react-router-dom";

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

export default function CardForm({ colId }: CardFormProps) {
  const [formState, setFormState] = useState({
    heading: "",
    description: "",
    notes: "",
    date: "",
  });

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

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
        type="text"
        label="Heading"
        labelId="heading"
        value={formState.heading}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({ ...formState, heading: e.target.value })
        }
        placeholder="Eg. Look for new recipe"
      />
      <TextInput
        type="text"
        label="Description"
        labelId="description"
        value={formState.description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({ ...formState, description: e.target.value })
        }
        placeholder="Eg. Found this on the internet"
      />
      <TextInput
        type="text"
        label="Notes"
        labelId="notes"
        value={formState.notes}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({
            ...formState,
            notes: e.target.value,
          })
        }
        placeholder="Enter Notes..."
      />
      <TextInput
        type="date"
        label="To be Completed by"
        labelId="date"
        min={Date.now().toString()}
        value={formState.date}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormState({ ...formState, date: e.target.value })
        }
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
