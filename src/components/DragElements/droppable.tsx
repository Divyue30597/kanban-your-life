import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export default function Droppable({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    backgroundColor: isOver ? "var(--success-color)" : "",
  };

  return (
    <div style={style} ref={setNodeRef}>
      {children}
    </div>
  );
}
