import { ChangeEvent, useState } from "react";
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
} from "@/features/columns/columnsSlice";
import { card, deleteColumnsWithCards } from "@/features/cards/cardsSlice";
import AddCardForm from "../CardForm/cardForm";

export default function Body() {
  const [colName, setColName] = useState("");
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const colSelector = useAppSelector((state) => state.columns);
  const cardSelector = useAppSelector((state) => state.cards);

  const style = {
    gridTemplateColumns: `repeat(${colSelector.columns.length}, 36rem)`,
  };

  const handleSubmit = () => {
    const newColumn = {
      id: uuid(),
      name: colName,
      boardId: pathname.split("/")[1],
    };
    dispatch(createColumns(newColumn));
  };

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumns(id));
    dispatch(deleteColumnsWithCards(id));
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
                type="text"
                labelId="add-column"
                label="Add Column"
                placeholder="Eg. Todo"
                value={colName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setColName(e.target.value)
                }
                errorMessage="🌋 Add Column cannot empty!!"
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
                      <Modal.Body heading="Edit Column">
                        This is edit section
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
                          Are you sure you want to <strong>delete</strong> this
                          column?
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
                {cardSelector.cards.map((card: card) => {
                  return (
                    card.columnId === col.id && (
                      <Card key={card.id}>
                        <Card.CardTag tagName={col.name} />
                        <Card.CardHeader
                          heading={card.heading}
                          description={card.description}
                        />
                        <Card.CardLink links={card.link} />
                        <Card.CardNotes notes={card.notes} />
                        <hr />
                        <Card.CardFooter date={card.date} />
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
            )
        )}
      </div>
    </div>
  );
}
