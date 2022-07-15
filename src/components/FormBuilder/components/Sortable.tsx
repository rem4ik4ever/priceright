import React from 'react';
import { useDraggable, UseDraggableArguments } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface SortableProps {
  children: React.ReactNode,
}
export const Sortable: React.FC<SortableProps & UseDraggableArguments> = ({ children, ...draggableProps }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ ...draggableProps });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  );
}

