import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { CLOSE, DELETE, DOTS, EDIT, PLUS, SAVE } from "../Svg/svg";
import styles from "./sidebar.module.scss";

import Button from "../Button/button";
import {
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
      columns: [],
    };

    dispatch(createBoards(payload));
    setIsActive(false);
    setBoardName({ name: "", error: "" });
    navigate("/" + payload.id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBoard(id));
  };

  const handleEdit = (id: string, name: string) => {
    console.log(id);
    if (!name.length) {
      return setBoardName({
        name: "",
        error: "🚫 Please enter a board name",
      });
    }
    dispatch(updateBoard({ id, name }));
    navigate("/" + id);
  };

  return (
    <aside className={styles.sidebar}>
      <div>
        <h1>Boards</h1>
        <ul className={styles.boards_list}>
          {Object.keys(selector).map((board: string) => (
            <li key={selector[board].id}>
              <Link
                to={selector[board].id}
                className={`${
                  pathname.split("/")[1] === selector[board].id
                    ? styles.active
                    : ""
                }`}
              >
                <span>{selector[board].name}</span>
              </Link>

              <Dropdown className={styles.dropdown} buttonInternal={<DOTS />}>
                <div className={styles.dropdown_settings}>
                  <input
                    type="text"
                    placeholder={selector[board].name}
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
                      onClick={() =>
                        handleEdit(selector[board].id, boardName.name)
                      }
                    >
                      <EDIT />
                    </Button>
                    <Button
                      className={styles.delete_button}
                      type="button"
                      onClick={() => handleDelete(selector[board].id)}
                      disabled={pathname.split("/")[1] === selector[board].id}
                    >
                      <DELETE />
                    </Button>
                  </div>
                </div>
                <p style={{ marginTop: "0.4rem" }} className="error_message">
                  {boardName.error}
                </p>
              </Dropdown>
            </li>
          ))}
        </ul>
        {isActive && (
          <form onSubmit={handleSubmit} className={styles.addboards}>
            <div className={styles.input}>
              <input
                ref={inputRef}
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
              <SAVE />
              <span>Save</span>
            </Button>
          </form>
        )}
      </div>
      <Button className={styles.btn} onClick={() => setIsActive(!isActive)}>
        {!isActive ? (
          <>
            <PLUS />
            <span>Add Boards</span>
          </>
        ) : (
          <>
            <CLOSE />
            <span>Close</span>
          </>
        )}
      </Button>
    </aside>
  );
}
