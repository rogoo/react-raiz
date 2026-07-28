import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/todoSlice";
import { loggerMiddleware } from "./middleware/loggerMIddleware";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
