import plus_icon from "/styles/images/plus.svg";

import Button from "../Button/button";
import SVG from "../Svg/svg";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div>
        <h1>Boards</h1>
        <div>
          <h2>Boards if any</h2>
        </div>
      </div>
      <Button className={styles.btn}>
        <SVG src={plus_icon} alt="Add Boards" /> Add Boards
      </Button>
    </div>
  );
}
