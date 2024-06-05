import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import plus_icon from "/styles/images/plus.svg";
import dots_icon from "/styles/images/dots.svg";
import delete_icon from "/styles/images/delete.svg";
import edit_icon from "/styles/images/edit.svg";
import save_icon from "/styles/images/save.svg";
import close_icon from "/styles/images/close.svg";

import styles from "./sidebar.module.scss";

import Button from "../Button/button";
import SVG from "../Svg/svg";
import {
  board,
  createBoards,
  deleteBoard,
  updateBoard,
} from "@/features/board/boardsSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import Dropdown from "../Dropdown/dropdown";

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);
  const [boardName, setBoardName] = useState({ name: "", error: "" });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.boards);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!boardName.name.length) {
      return setBoardName({ name: "", error: "Please enter a board name" });
    }

    const payload = {
      id: uuidv4(),
      name: boardName.name,
      link: boardName.name.toLowerCase().split(" ").join("-"),
    };

    dispatch(createBoards(payload));
    setIsActive(false);
    setBoardName({ name: "", error: "" });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBoard(id));
  };

  const handleEdit = (id: string, name: string) => {
    if (!name.length) {
      return setBoardName({
        name: "",
        error: "Please enter a board name",
      });
    }
    dispatch(updateBoard({ id, name }));
    navigate(`/${name.toLowerCase().split(" ").join("-")}`);
  };

  return (
    <aside className={styles.sidebar}>
      <div>
        <h1>Boards</h1>
        <ul className={styles.boards_list}>
          {selector.boards.map((board: board) => (
            <li key={board.link}>
              <Link
                to={board.link}
                className={`${
                  pathname.split("/")[1] === board.link ? styles.active : ""
                }`}
              >
                <span>{board.name}</span>
              </Link>

              <Dropdown
                className={styles.dropdown}
                buttonInternal={<SVG src={dots_icon} alt="Edit Board" />}
              >
                <div className={styles.dropdown_settings}>
                  <input
                    type="text"
                    placeholder="Enter new name..."
                    value={boardName.name}
                    onChange={(e) => {
                      setBoardName({
                        error: "",
                        name: e.target.value,
                      });
                    }}
                  />
                  <div className={styles.dropdown_buttons}>
                    <Button
                      className={styles.edit_button}
                      type="button"
                      onClick={() => handleEdit(board.id, boardName.name)}
                    >
                      <SVG src={edit_icon} alt="Edit" />
                    </Button>
                    <Button
                      className={styles.delete_button}
                      type="button"
                      onClick={() => handleDelete(board.id)}
                      disabled={pathname.split("/")[1] === board.link}
                    >
                      <SVG src={delete_icon} alt="Delete" />
                    </Button>
                  </div>
                </div>
              </Dropdown>
            </li>
          ))}
        </ul>
        {isActive && (
          <form onSubmit={handleSubmit} className={styles.addboards}>
            <div className={styles.input}>
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                value={boardName.name}
                onChange={(e) =>
                  setBoardName({ name: e.target.value, error: "" })
                }
                placeholder="Add Board..."
              />
              <p>{boardName.error}</p>
            </div>
            <Button type="submit">
              <SVG src={save_icon} alt="Save" />
              <span>Save</span>
            </Button>
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
          <>
            <SVG src={close_icon} alt="Close" />
            <span>Close</span>
          </>
        )}
      </Button>
    </aside>
  );
}
