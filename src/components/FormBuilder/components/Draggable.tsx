import React from 'react';
import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableProps {
  children: React.ReactNode,
}
export const Draggable: React.FC<DraggableProps & UseDraggableArguments> = ({ children, ...draggableProps }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    ...draggableProps
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}

