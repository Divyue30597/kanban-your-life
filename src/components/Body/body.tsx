import plus_icon from "/styles/images/plus.svg";

import Button from "../Button/button";
import SVG from "../Svg/svg";
import styles from "./body.module.scss";

export default function Body() {
  const style = {
    gridTemplateColumns: "repeat(4, 1fr)",
  };

  return (
    <div className={styles.body}>
      <h1>Your Tasks</h1>
      <div style={style} className={styles.columns}>
        <div className={styles.column}>
          <h2>Column heading</h2>
          <Button className={styles.btn}>
            <SVG src={plus_icon} alt="Add Boards" /> Add Column
          </Button>
        </div>
      </div>
    </div>
  );
}
