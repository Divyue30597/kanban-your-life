import { ChangeEvent, DragEvent, DragEventHandler, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Button from "../Button/button";
import { ADD_TASK, DELETE, EDIT, PLUS } from "../Svg/svg";
import styles from "./body.module.scss";
import Card from "../Card/card";
import Modal from "../Modal/modal";
import TextInput from "../Input/input";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import {
  column,
  createColumns,
  deleteColumns,
  updateColumns,
} from "@/features/columns/columnsSlice";

import {
  card,
  deleteCard,
  deleteColumnsWithCards,
  updateCard,
  updateCardColumn,
} from "@/features/cards/cardsSlice";
import AddCardForm from "../CardForm/cardForm";

export default function Body() {
  const [colName, setColName] = useState({ value: "", error: "" });
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const colSelector = useAppSelector((state) => state.columns);
  const cardSelector = useAppSelector((state) => state.cards);

  const style = {
    gridTemplateColumns: `repeat(${colSelector.columns.length}, 34rem)`,
  };

  const handleSubmit = () => {
    const newColumn = {
      id: uuid(),
      name: colName.value,
      boardId: pathname.split("/")[1],
    };
    dispatch(createColumns(newColumn));
  };

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumns(id));
    dispatch(deleteColumnsWithCards(id));
  };

  const handleEditColumn = (
    id: string,
    col: { value: string; error: string }
  ) => {
    if (!col.value) {
      return setColName({
        value: "",
        error: "🚫 Column name cannot be empty.",
      });
    }

    dispatch(updateColumns({ id, name: col.value }));
  };

  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>, newColId: string) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text/plain");
    dispatch(updateCardColumn({ id: cardId, columnId: newColId }));
  };

  return (
    <div className={styles.body}>
      <div className={styles.body_heading}>
        <h1>Your Tasks</h1>
        <Modal>
          <Modal.Button className={styles.btn}>
            <PLUS /> Add Column
          </Modal.Button>
          <Modal.Body heading="Add Column">
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
          </Modal.Body>
        </Modal>
      </div>

      <hr />

      <div style={style} className={styles.columns}>
        {colSelector.columns.map(
          (col: column) =>
            pathname.split("/")[1] === col.boardId && (
              <div key={col.id} className={styles.column}>
                <div className={styles.column_heading}>
                  <h2>{col.name}</h2>
                  <div className={`${styles.column_heading_buttons} flex_row`}>
                    <Modal>
                      <Modal.Button className={styles.col_edit_btn}>
                        <EDIT />
                      </Modal.Button>
                      <Modal.Body
                        className={styles.edit_col_body}
                        heading="Edit Column"
                      >
                        <div className={`${styles.edit_col_input} flex_col`}>
                          <label htmlFor="edit-column-name">
                            Edit Column Name
                          </label>
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
                        <p
                          style={{ marginBottom: "0.8rem" }}
                          className="error_message"
                        >
                          {colName.error}
                        </p>
                        <Button
                          onClick={() => handleEditColumn(col.id, colName)}
                          type="button"
                        >
                          Save
                        </Button>
                      </Modal.Body>
                    </Modal>
                    <Modal>
                      <Modal.Button className={styles.col_del_btn}>
                        <DELETE />
                      </Modal.Button>
                      <Modal.Body
                        className={styles.del_modal_body}
                        heading="Delete Column"
                      >
                        <p>
                          Are you sure you want to{" "}
                          <span style={{ fontFamily: "DMSansBold" }}>
                            delete
                          </span>{" "}
                          this column?
                        </p>
                        <div className={`${styles.del_col_btns}`}>
                          <Button
                            onClick={() => handleDeleteColumn(col.id)}
                            type="button"
                          >
                            Confirm
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
                <div
                  className={styles.card_container}
                  onDragOver={handleOnDragOver}
                  onDrop={(e) => handleOnDrop(e, col.id)}
                >
                  {cardSelector.cards.map((card: card) => {
                    return (
                      card.columnId === col.id && (
                        <Card id={card.id} key={card.id}>
                          <Card.CardTag tagName={col.name} />
                          <Card.CardHeader
                            heading={card.heading}
                            description={card.description}
                          />
                          <Card.CardLink links={card.link} />
                          <Card.CardNotes notes={card.notes} id={card.id} />
                          <hr />
                          <Card.CardFooter date={card.date} id={card.id} />
                        </Card>
                      )
                    );
                  })}
                  {col.id === colSelector.columns[0].id && (
                    <Modal>
                      <Modal.Button className={styles.add_card_btn}>
                        <span className="flex_row flex_center">
                          <ADD_TASK /> Add Card
                        </span>
                      </Modal.Button>
                      <Modal.Body heading="Add Card">
                        <AddCardForm colId={col.id} />
                      </Modal.Body>
                    </Modal>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
