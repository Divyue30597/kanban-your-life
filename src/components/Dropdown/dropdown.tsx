import { ReactNode, useState } from "react";
import styles from "./dropdown.module.scss";
import Button from "../Button/button";

interface DropdownProps {
  buttonInternal: ReactNode;
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
}

export default function Dropdown({
  buttonInternal,
  children,
  className,
  isDisabled,
}: DropdownProps) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className={`${styles.dropdown} ${className}`}>
      <Button type="button" onClick={handleClick} disabled={isDisabled}>
        {buttonInternal}
      </Button>
      {show && <div className={styles.dropdown_content}>{children}</div>}
    </div>
  );
}
