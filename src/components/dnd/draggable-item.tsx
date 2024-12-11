import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

interface Props {
  draggableId: string;
  index: number;
  children: React.ReactNode;
}

const DraggableItem: React.FC<Props> = ({ draggableId, index, children }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: '8px',
            margin: '8px 0',
            background: '#aaa',
            border: '1px solid #ddd',
            borderRadius: '4px',
            ...provided.draggableProps.style,
          }}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
