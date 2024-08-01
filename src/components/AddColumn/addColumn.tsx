import { v4 as uuid } from "uuid";
import { ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import Button from "../Button/button";
import TextInput from "../Input/input";
import { useAppDispatch } from "@/store/storeHooks";
import { createColumns } from "@/features/columns/columnsSlice";

export default function AddColumn({
  colName,
  setColName,
}: {
  colName: {
    value: string;
    error: string;
  };
  setColName: React.Dispatch<
    React.SetStateAction<{
      value: string;
      error: string;
    }>
  >;
}) {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const newColumn = {
      id: uuid(),
      name: colName.value,
      boardId: pathname.split("/")[1],
    };
    dispatch(createColumns(newColumn));
  };

  return (
    <form onSubmit={handleSubmit}>
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
