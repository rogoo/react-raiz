import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  type PersistConfig,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import todoReducer from "./reducer/todoSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["todos"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

// #################################################
// # Configuração para o store sem persistência
// #################################################
//
// export const store = configureStore({
//   reducer: {
//     todos: todoReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type appDispatch = typeof store.dispatch;
