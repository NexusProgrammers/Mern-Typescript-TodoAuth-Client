import React, { useState, useEffect, FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { CreateTodoResponse } from "../vite-env";
import { Button } from "@mui/material";
import ButtonSpinner from "./ButtonSpinner";

interface UpdateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTodo: (updatedTodo: Partial<CreateTodoResponse>) => void;
  initialTodo: CreateTodoResponse | null;
  UpdateTodoLoading: boolean;
  refetch: () => void;
}

const UpdateTodoModal: FC<UpdateTodoModalProps> = ({
  isOpen,
  onClose,
  onUpdateTodo,
  initialTodo,
  UpdateTodoLoading,
  refetch,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    if (initialTodo) {
      setUpdatedTitle(initialTodo.title);
      setUpdatedDescription(initialTodo.description);
    }
  }, [initialTodo]);

  const handleUpdate = () => {
    const updatedTodo: Partial<CreateTodoResponse> = {
      title: updatedTitle,
      description: updatedDescription,
    };
    onUpdateTodo(updatedTodo);
    onClose();
    refetch();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <p className="flex justify-center text-2xl font-semibold py-6">
        Update Todo
      </p>
      <DialogContent className="flex flex-col gap-8">
        <TextField
          label="Title"
          fullWidth
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
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
          size="small"
          color="info"
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={handleUpdate}
        >
          {UpdateTodoLoading ? <ButtonSpinner /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTodoModal;
