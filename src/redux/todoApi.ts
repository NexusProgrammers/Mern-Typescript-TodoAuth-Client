import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { todosBaseUrl } from "../api";
import Cookies from "js-cookie";
import { CreateTodoResponse, Todo } from "../vite-env";

const token = Cookies.get("token");

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: todosBaseUrl }),
  tagTypes: ["Todo", "Todos"],
  endpoints: (builder) => ({
    createTodo: builder.mutation<CreateTodoResponse, Partial<Todo>>({
      query: (formData) => ({
        url: "/add",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Todo", "Todo"],
    }),
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/get-all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Todos", "Todo"],
    }),
    getTodo: builder.query<Todo, string>({
      query: (todoId) => ({
        url: `/get/${todoId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Todos", "Todo"],
    }),
    updateTodo: builder.mutation<Todo, { id: string; todoData: Partial<Todo> }>(
      {
        query: ({ id, todoData }) => ({
          url: `/update/${id}`,
          method: "PUT",
          body: todoData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Todos", "Todo"],
      }
    ),
    deleteTodo: builder.mutation<void, string>({
      query: (todoId) => ({
        url: `/delete/${todoId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Todos", "Todo"],
    }),
    completeTodo: builder.mutation<void, string>({
      query: (todoId) => ({
        url: `/complete/${todoId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Todos", "Todo"],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useGetTodosQuery,
  useGetTodoQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation
} = todoApi;

export default todoApi;

export const todoMiddleware = todoApi.middleware;
