/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, DefaultValue, selector } from "recoil";
import type { FilterTodoType, ITodo, ITodoStats } from "../util/Types";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

// ATOMS
export const tempFahrenheitState = atom<number>({
  key: "TempFahrenheit",
  default: 32,
});

export const todoListState = atom<ITodo[]>({
  key: "TodoList",
  default: [],
  effects_UNSTABLE: [localStorageEffect("todoList")],
});

export const todoListFilterState = atom<FilterTodoType>({
  key: "TodoListFilter",
  default: "Show All",
});

// SELECTORS
export const tempCelsiusConverterSelector = selector({
  key: "tempCelsius",
  get: ({ get }) => ((get(tempFahrenheitState) - 32) * 5) / 9,
  set: ({ set }, newValue) =>
    set(
      tempFahrenheitState,
      newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32,
    ),
});
export const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const listTodo = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return listTodo.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return listTodo.filter((item) => !item.isComplete);
      default:
        return listTodo;
    }
  },
});

export const todoListStatsState = selector<ITodoStats>({
  key: "TodoListStats",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const total = todoList.length;
    const totalCompleted = todoList.filter((item) => item.isComplete).length;
    const totalUncompleted = todoList.filter((item) => !item.isComplete).length;
    const totalPercentCompleted =
      total === 0 ? 0 : parseFloat(((totalCompleted / total) * 100).toFixed(2));

    return {
      total,
      totalCompleted,
      totalUncompleted,
      totalPercentCompleted,
    };
  },
});
