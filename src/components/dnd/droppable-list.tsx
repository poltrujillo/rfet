import React from 'react';
import { Droppable } from '@hello-pangea/dnd';

interface Props {
  droppableId: string;
  children: React.ReactNode;
}

const DroppableList: React.FC<Props> = ({ droppableId, children }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="p-4 bg-white rounded-lg shadow-sm min-h-[100px]"
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableList;
