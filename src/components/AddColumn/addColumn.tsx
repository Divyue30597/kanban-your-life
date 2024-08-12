import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent } from "react";
import { useLocation } from "react-router-dom";

import Button from "../Button/button";
import TextInput from "../Input/input";
import { useAppDispatch } from "@/store/storeHooks";
import InputColor from "../InputColor/InputColor";
import { InputType } from "@/types/types";
import { createColumns } from "@/features/board/boardsSlice";

export default function AddColumn({
  colName,
  setColName,
}: {
  colName: InputType;
  setColName: React.Dispatch<React.SetStateAction<InputType>>;
}) {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newColumn = {
      id: uuid(),
      name: colName.value,
      boardId: pathname.split("/")[1],
      bgColor: "",
    };
    console.log(newColumn);
    dispatch(createColumns(newColumn));
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputColor />
      <TextInput
        required
        type="text"
        labelId="add-column"
        label="Add Column"
        placeholder="Eg. Todo"
        value={colName.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setColName({ ...colName, value: e.target.value })
        }
        errorMessage="🚫 Add Column cannot be empty."
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
