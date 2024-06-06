import { v4 as uuid } from "uuid";

import plus_icon from "/styles/images/plus.svg";

import Button from "../Button/button";
import SVG from "../Svg/svg";
import styles from "./body.module.scss";
import Card from "../Card/card";
import Modal from "../Modal/modal";
import CardForm from "../CardForm/cardForm";
import TextInput from "../Input/input";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { column, createColumns } from "@/features/columns/columnsSlice";
import { card } from "@/features/cards/cardsSlice";
import { useLocation } from "react-router-dom";

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

  return (
    <div className={styles.body}>
      <div className={styles.body_heading}>
        <h1>Your Tasks</h1>
        <Modal>
          <div>
            <Modal.Button className={styles.btn}>
              <SVG src={plus_icon} alt="Add Boards" /> Add Column
            </Modal.Button>
          </div>
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
                errorMessage="Add Column cannot empty"
              />
              <Button type="submit">Save</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>

      <div style={style} className={styles.columns}>
        {colSelector.columns.map(
          (col: column) =>
            pathname.split("/")[1] === col.boardId && (
              <div key={col.id} className={styles.column}>
                <h2>{col.name}</h2>
                {cardSelector.cards.map((card: card) => {
                  return (
                    card.columnId === col.id && (
                      <Card>
                        <Card.CardTag tagName={col.name} />
                        <Card.CardHeader
                          heading={card.heading}
                          description={card.description}
                        />
                        <Card.CardNotes notes={card.notes} />
                        <hr />
                        <Card.CardFooter date={card.date} />
                      </Card>
                    )
                  );
                })}
                <Modal>
                  <Modal.Button className={styles.add_card_btn}>
                    Add Card
                  </Modal.Button>
                  <Modal.Body heading="Add Card">
                    <CardForm colId={col.id} />
                  </Modal.Body>
                </Modal>
              </div>
            )
        )}
      </div>
    </div>
  );
}
