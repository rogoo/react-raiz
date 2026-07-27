import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  toggleTodo,
  type ITodo,
} from "../../features/redux/reducer/todoSlice";

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch();

  useEffect(function mounted() {
    console.log("TodoItem mounted");
  }, []);

  console.log("TodoItem renderizado");

  return (
    <div
      style={{
        padding: ".2rem",
        border: "1px solid black",
        margin: ".8rem 1rem",
      }}
    >
      id: {todo.id} - text: {todo.text}
      <button
        style={{
          marginLeft: "1rem",
          backgroundColor: todo.completed ? "red" : "green",
        }}
        onClick={() => dispatch(toggleTodo(todo.id))}
      >
        {todo.completed ? "Deixar Pendente" : "Completar"}
      </button>
      <button
        style={{
          marginLeft: "1rem",
          backgroundColor: "orange",
          border: "2px solid black",
        }}
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        Excluir
      </button>
    </div>
  );
};

export default TodoItem;
