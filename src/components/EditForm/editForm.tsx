import { ChangeEvent, FormEvent } from "react";

import styles from "@/components/EditForm/editForm.module.scss";

import { column, updateColumns } from "@/features/columns/columnsSlice";
import Button from "../Button/button";
import { useAppDispatch } from "@/store/storeHooks";

export default function EditForm({
  col,
  colName,
  setColName,
}: {
  col: column;
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
  const dispatch = useAppDispatch();

  const handleEditColumn = (
    e: FormEvent,
    id: string,
    col: { value: string; error: string }
  ) => {
    e.preventDefault();
    if (!col.value) {
      return setColName({
        value: "",
        error: "🚫 Column name cannot be empty.",
      });
    }

    dispatch(updateColumns({ id, name: col.value }));
  };

  return (
    <form onSubmit={(e) => handleEditColumn(e, col.id, colName)}>
      <div className={`${styles.edit_col_input} flex_col`}>
        <label htmlFor="edit-column-name">Edit Column Name</label>
        <input
          id="edit-column-name"
          name="edit-column-name"
          type="text"
          required
          placeholder={col.name}
          value={colName.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setColName({
              error: "",
              value: e.target.value,
            })
          }
        />
      </div>
      <p style={{ marginBottom: "0.8rem" }} className="error_message">
        {colName.error}
      </p>
      <Button type="submit">Save</Button>
    </form>
  );
}
