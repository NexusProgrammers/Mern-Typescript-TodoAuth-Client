import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScreenSpinner, UsePageTitle } from "../components";
import { MailRoundedIcon, MdOutlineDescription } from "../icons";
import { toast } from "react-hot-toast";
import { AddTodoData, CreateTodoResponse, SignInError } from "../vite-env";
import { useCreateTodoMutation } from "../redux/todoApi";

const AddTodo: FC = () => {
  UsePageTitle("Todo");
  const navigate = useNavigate();

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const [formData, setFormData] = useState<AddTodoData>({
    title: "",
    description: "",
  });

  const { title, description } = formData;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createTodo(formData);
    if ("data" in response) {
      const { message } = response.data as unknown as CreateTodoResponse;
      toast.success(message, {
        duration: 2000,
      });
      navigate("/");
    }
    if ("error" in response) {
      const {
        data: { message },
      } = response.error as SignInError;
      toast.error(message, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6">
      {isLoading && <ScreenSpinner />}

      <div className="w-[26rem] p-14 shadow-md hover:shadow-xl rounded-md bg-white">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
          Add Todo
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="w-full relative">
            <label htmlFor="title" className="block text-sm font-medium">
              Title:
            </label>
            <input
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              className="mt-1 p-2 w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MailRoundedIcon
              fontSize="small"
              className="absolute right-3 top-8 text-gray-700"
            />
          </div>
          <div className="w-full relative">
            <label htmlFor="description" className="block text-sm font-medium">
              Description:
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 p-7 w-full rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MdOutlineDescription
                size={20}
                className="absolute right-2 top-4 text-gray-700"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
