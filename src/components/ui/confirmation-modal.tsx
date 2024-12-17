'use client';

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './dialog';
import { Trash as FaTrash } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="bg-white p-6 rounded shadow-md">
        <DialogTitle className="flex items-center">
          <FaTrash className="mr-2 text-red-500" />
          Confirm Deletion
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this tournament?
        </DialogDescription>
        <div className="mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Yes, Delete
          </button>
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
