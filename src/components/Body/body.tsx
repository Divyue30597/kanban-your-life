import plus_icon from "/styles/images/plus.svg";

import Button from "../Button/button";
import SVG from "../Svg/svg";
import styles from "./body.module.scss";
import Card from "../Card/card";

export default function Body() {
  const style = {
    gridTemplateColumns: "repeat(5, 36rem)",
  };

  return (
    <div className={styles.body}>
      <div className={styles.body_heading}>
        <h1>Your Tasks</h1>
        <div>
          <Button className={styles.btn}>
            <SVG src={plus_icon} alt="Add Boards" /> Add Column
          </Button>
        </div>
      </div>

      <div style={style} className={styles.columns}>
        <div className={styles.column}>
          <h2>Column heading</h2>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        
      </div>
    </div>
  );
}
