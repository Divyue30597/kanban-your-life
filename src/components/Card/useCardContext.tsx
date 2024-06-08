import { useContext } from "react";
import { CardContext } from "./card";

export default function useCardContext() {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }

  return context;
}
