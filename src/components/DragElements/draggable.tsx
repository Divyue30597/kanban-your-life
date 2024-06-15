import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export default function Draggable({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 100px)`,
        zIndex: "999",
      }
    : undefined;
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
