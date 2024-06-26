import { HTMLProps, useEffect, useRef, useState } from "react";

import styles from "./input.module.scss";

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  labelId: string;
  errorMessage?: string;
  icon?: React.ReactNode;
}

/**
 * use aria-describedby when displaying error
 */
export default function TextInput({
  labelId,
  label,
  errorMessage,
  icon,
  className,
  ...props
}: TextInputProps) {
  const [focus, setFocus] = useState<boolean>(false);

  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <div className={className + " flex_col"}>
      <label className={styles.label} htmlFor={labelId}>
        {label}
      </label>
      <div className={styles.input_block}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          className={`${styles.input} ${focus ? styles.error_input : ""} ${
            icon !== undefined ? styles.input_icon : ""
          }`}
          id={labelId}
          aria-label={`Enter your ${label}`}
          onBlur={handleFocus}
          {...props}
        />
        {errorMessage && (
          <p
            className={focus ? styles.error : ""}
            style={!focus ? { display: "none" } : {}}
            id={`${labelId}-description`}
          >
            <span>
              <i aria-hidden="true" className="bi bi-info-circle"></i>{" "}
              {errorMessage}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
