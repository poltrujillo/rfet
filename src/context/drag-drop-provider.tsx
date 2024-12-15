import { DragDropContext, DropResult } from '@hello-pangea/dnd';

interface Props {
  children: React.ReactNode;
  onDragEnd: (result: DropResult) => void;
}

const DragDropContextProvider: React.FC<Props> = ({ children, onDragEnd }) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DragDropContextProvider;