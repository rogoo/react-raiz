import { useRecoilValue } from "recoil";
import { filteredTodoListState } from "../store/store";
import Temperatura from "./Temperatura";
import TodoItem from "./TodoItem";
import TodoItemCreator from "./TodoItemCreator";
import TodoListFilters from "./TodoListFilters";
import TodoListStats from "./TodoListStats";

const TodoList = () => {
  const todos = useRecoilValue(filteredTodoListState);
  return (
    <div>
      <Temperatura />
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      <br />
      Lista Todos:
      {todos.map((todoItem) => (
        <TodoItem key={todoItem.id} {...todoItem} />
      ))}
    </div>
  );
};

export default TodoList;
