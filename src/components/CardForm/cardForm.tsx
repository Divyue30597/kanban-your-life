import { v4 as uuid } from "uuid";

import { ChangeEvent, useState } from "react";
import Button from "../Button/button";
import TextInput from "../Input/input";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { createCards } from "@/features/cards/cardsSlice";

export default function CardForm() {
  const [formState, setFormState] = useState({
    id: uuid(),
    heading: "",
    description: "",
    notes: "",
    date: "",
  });

  const colSelector = useAppSelector((state) => state.columns);
  const boardSelector = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const payload = {
      ...formState,
      //
    };

    dispatch(createCards());
  };

  return (
    <form>
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
        placeholder={Date.now().toString()}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
