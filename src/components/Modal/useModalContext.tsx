import { useContext } from "react";
import { ModalContext } from "./modal";

export default function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
}
