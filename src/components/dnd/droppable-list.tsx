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
          style={{
            padding: '16px',
            background: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableList;
