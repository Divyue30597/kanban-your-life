import { useState } from "react";
import styles from "./inputcolor.module.scss";
import { potentialColor } from "@/constant/constant";

export default function InputColor() {
  const [selectColor, setSelectColor] = useState(potentialColor[0]);

  return (
    <select
      value={selectColor}
      className={styles.select}
      style={{ backgroundColor: `${selectColor}` }}
      onChange={(e) => setSelectColor(e.target.value)}
    >
      {potentialColor.map((color) => (
        <option
          value={color}
          style={{ backgroundColor: `${color}` }}
          key={color}
        />
      ))}
    </select>
  );
}
