import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import ButtonSpinner from "./ButtonSpinner";

interface DeleteTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  DeleteTodoLoading: boolean
}

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  DeleteTodoLoading,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="mt-1">Are you sure you want to delete this todo?</DialogContent>
      <DialogActions className="flex gap-1 mt-4">
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={onClose}
          size="small"
          color="info"
        >
          Cancel
        </Button>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={onConfirmDelete}
          size="small"
          color="error"
        >
          {DeleteTodoLoading ? <ButtonSpinner /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodoModal;
