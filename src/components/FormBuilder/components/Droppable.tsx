import React from 'react';
import {useDroppable} from '@dnd-kit/core';

interface DroppableProps {
  id: string;
  children: React.ReactNode
}
export const Droppable: React.FC<DroppableProps> = ({id, children}) => {
  const {isOver, setNodeRef} = useDroppable({
    id
  });
  const style = {
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
