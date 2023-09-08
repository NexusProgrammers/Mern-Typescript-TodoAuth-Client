import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../redux/todoApi";
import {
  DeleteTodoModal,
  ScreenSpinner,
  UsePageTitle,
  UpdateTodoModal,
} from "../components";
import { CreateTodoResponse, Todo } from "../vite-env";
import {
  AiOutlineCheckSquare,
  LiaEdit,
  MdOutlineCheckBoxOutlineBlank,
  RiDeleteBin6Line,
} from "../icons";
import React from "react";
import toast from "react-hot-toast";

const Home = () => {
  UsePageTitle("Home");

  const { isLoading: getTodoLoading, data, refetch } = useGetTodosQuery();

  const [deleteTodoMutation, { isLoading: DeleteTodoLoading }] =
    useDeleteTodoMutation();

  const [updateTodoMutation, { isLoading: UpdateTodoLoading }] =
    useUpdateTodoMutation();

  const [completeTodoMutation] = useCompleteTodoMutation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<CreateTodoResponse | null>(
    null
  );

  const handleDeleteConfirmation = (todoId: string) => {
    setTodoToDelete(todoId);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateTodo = (todo: CreateTodoResponse) => {
    setSelectedTodo(todo);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteTodo = async () => {
    try {
      if (todoToDelete) {
        await deleteTodoMutation(todoToDelete);
      }
      setTodoToDelete(null);
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const handleCompleteTodo = async (todoId: string) => {
    try {
      await completeTodoMutation(todoId);
      await refetch();
      toast.success("Todo Status Changes", {
        duration: 2000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const todos = data?.todos || [];

  return (
    <div className="flex flex-wrap gap-8 p-4 items-center justify-center">
      {getTodoLoading && <ScreenSpinner />}

      {todos.length === 0 ? (
        <p className="text-2xl font-bold">No Todos Available</p>
      ) : (
        todos.map((todo: Todo) => {
          return (
            <div className="shadow-md hover:shadow-xl" key={todo._id}>
              <Card sx={{ width: 260, height: 300 }}>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-bold flex items-center">
                        {todo.title}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <button
                        title="Complete"
                        onClick={() => handleCompleteTodo(todo._id)}
                        className="text-indigo-900 cursor-pointer"
                      >
                        {todo.isCompleted ? (
                          <AiOutlineCheckSquare size={22} />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank size={22} />
                        )}
                      </button>

                      <button
                        title="Update"
                        className="text-indigo-900 cursor-pointer"
                        onClick={() => handleUpdateTodo(todo)}
                      >
                        <LiaEdit size={22} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDeleteConfirmation(todo._id)}
                        className="text-red-900 cursor-pointer"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-justify font-medium flex items-center justify-center">
                    {todo.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        })
      )}

      <DeleteTodoModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleDeleteTodo}
        DeleteTodoLoading={DeleteTodoLoading}
      />

      <UpdateTodoModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdateTodo={(updatedTodo) => {
          updateTodoMutation({
            id: selectedTodo?._id || "",
            todoData: updatedTodo,
          });
          setIsUpdateModalOpen(false);
        }}
        initialTodo={selectedTodo}
        UpdateTodoLoading={UpdateTodoLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default Home;
