import plus_icon from "/styles/images/plus.svg";

import Button from "../Button/button";
import SVG from "../Svg/svg";
import styles from "./sidebar.module.scss";
import { FormEvent, useState } from "react";
import { boards, createBoards } from "@/features/board/boardsSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isActive, setIsActive] = useState(true);
  const [boardName, setBoardName] = useState({ name: "" });

  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.boards);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(createBoards(boardName.name));
    setIsActive(false);
    setBoardName({ name: "" });
  };

  return (
    <aside className={styles.sidebar}>
      <div>
        <h1>Boards</h1>
        <ul className={styles.boards_list}>
          {selector.map((board: boards) => (
            <li key={board.link}>
              <Link to={board.link}>{board.name}</Link>
            </li>
          ))}
        </ul>
        {isActive && (
          <form onSubmit={handleSubmit} className={styles.addboards}>
            <input
              className={styles.input}
              type="text"
              value={boardName.name}
              onChange={(e) => setBoardName({ name: e.target.value })}
              placeholder="Add Board..."
            />
            <Button type="submit">Save</Button>
          </form>
        )}
      </div>
      <Button className={styles.btn} onClick={() => setIsActive(!isActive)}>
        {!isActive ? (
          <>
            <SVG src={plus_icon} alt="Add Boards" />
            <span>Add Boards</span>
          </>
        ) : (
          <span>Close</span>
        )}
      </Button>
    </aside>
  );
}
