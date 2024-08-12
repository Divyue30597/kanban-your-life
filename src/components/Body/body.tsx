import { DragEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./body.module.scss";
import Button from "../Button/button";
import { ADD_TASK, DELETE, EDIT, PLUS } from "../Svg/svg";
import Card from "../Card/card";
import Modal from "../Modal/modal";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { deleteColumns } from "@/features/columns/columnsSlice";
import {
  deleteColumnsWithCards,
  updateCardColumn,
  updateCards,
} from "@/features/cards/cardsSlice";
import AddCardForm from "../CardForm/cardForm";
import EditForm from "../EditForm/editForm";
import AddColumn from "../AddColumn/addColumn";
import { card, column, InputType } from "@/types/types";
import InputColor from "../InputColor/InputColor";

export default function Body() {
  const [colName, setColName] = useState<InputType>({ value: "", error: "" });
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const selector = useAppSelector((state) => state.boards);
  const board = selector[pathname.split("/")[1]];
  // const cardSelector = useAppSelector((state) => state.cards);

  const style = {
    gridTemplateColumns: `repeat(${board.columns.length}, 34rem)`,
  };

  const handleDeleteColumn = (id: string) => {
    dispatch(deleteColumns(id));
    dispatch(deleteColumnsWithCards(id));
  };

  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>, newColId: string) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text/plain");
    const index = Number(event.dataTransfer.getData("index/plain"));
    const newItems = [...cardSelector.cards];
    console.log(newItems);
    const [draggedItem] = newItems.splice(index, 1);
    console.log(draggedItem);
    newItems.splice(index, 0, draggedItem);
    dispatch(updateCards({ cards: newItems }));
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
            <AddColumn colName={colName} setColName={setColName} />
          </Modal.Body>
        </Modal>
      </div>

      <hr />

      <div style={style} className={styles.columns}>
        {board.columns.map(
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
                        <EditForm
                          col={col}
                          colName={colName}
                          setColName={setColName}
                        />
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
                  className={`${styles.card_container} card-container`}
                  onDragOver={handleOnDragOver}
                  onDrop={(e) => handleOnDrop(e, col.id)}
                  data-col-id={col.id}
                >
                  {col.cards?.map((card: card, index: number) => {
                    return (
                      col.id === card.columnId && (
                        <Card
                          data-id={card.id}
                          data-col-id={col.id}
                          index={index}
                          key={card.id}
                          id={card.id}
                        >
                          <Card.CardTag tagName={col.name} />
                          <Card.CardHeader
                            id={card.id}
                            heading={card.heading}
                            description={card.description}
                          />
                          <Card.CardLink links={card.link} />
                          <Card.CardNotes notes={card.notes} id={card.id} />
                          <hr />
                          <Card.CardFooter
                            date={card.date}
                            storyPoints={card.storyPoints}
                          />
                        </Card>
                      )
                    );
                  })}
                  {/* {col.boardId === board.boards &&
                    col.id === colSelector.columns[0].id && (
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
                    )} */}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}
