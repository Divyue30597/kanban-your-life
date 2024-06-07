import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import useModalContext from "./useModalContext";
import Button from "../Button/button";

import styles from "./modal.module.scss";

interface ModalContext {
  isActive: boolean;
  handleClick: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);

function Modal({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <ModalContext.Provider value={{ isActive, handleClick }}>
      <div
        onClick={handleClick}
        className={`${
          isActive ? styles.background_div_active : styles.background_div_hide
        } ${styles.background_div}`}
      ></div>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalButton({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  const { handleClick } = useModalContext();

  return (
    <Button onClick={handleClick} className={className} {...props}>
      {children}
    </Button>
  );
}

export function ModalBody({
  children,
  className,
  heading,
  ...props
}: {
  children: ReactNode;
  className?: string;
  heading: string;
}) {
  const { isActive, handleClick } = useModalContext();
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isActive) {
      divRef.current?.focus();
    }
  }, [isActive]);

  return (
    <div
      {...props}
      className={`${
        isActive ? styles.modal_body_active : styles.modal_body_hide
      } ${styles.modal_body} ${className}`}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          handleClick();
        }
      }}
      ref={divRef}
      tabIndex={0}
    >
      <div className={styles.modal_heading}>
        <h1>{heading}</h1>
        <div>
          <Button
            tabIndex={-1}
            onClick={handleClick}
            className={styles.modal_close}
          >
            ❌
          </Button>
        </div>
      </div>
      <hr />
      {children}
    </div>
  );
}

Modal.Button = ModalButton;
Modal.Body = ModalBody;

export default Modal;
