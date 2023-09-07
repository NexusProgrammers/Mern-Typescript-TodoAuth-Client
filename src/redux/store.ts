import { configureStore } from "@reduxjs/toolkit";
import todos, { todoMiddleware } from "./todoApi";
import authApi, { authApiMiddleware } from "./authApi";

const store = configureStore({
  reducer: {
    [todos.reducerPath]: todos.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat([todoMiddleware, authApiMiddleware]),
});

export default store;
