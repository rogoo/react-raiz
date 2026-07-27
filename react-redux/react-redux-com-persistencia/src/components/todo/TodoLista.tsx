import { memo, useEffect } from "react";
import { useAppSelector } from "../../features/redux/hooks";
import TodoItem from "./TodoItem";

const TodoItemMemo = memo(TodoItem);

const TodoLista = () => {
  const todos = useAppSelector((state) => state.todos.todos);

  useEffect(function inicializa() {
    console.log("TodoLista mounted");
  }, []);

  console.log("TodoLista renderizado");

  if (todos.length === 0) {
    return (
      <div style={{ paddingTop: "2rem", fontWeight: "bold" }}>
        Nenhum Registro Encontradooooo
      </div>
    );
  }

  return (
    <>
      {todos.map((item) => (
        <TodoItemMemo key={item.id} todo={item} />
      ))}
    </>
  );
};

export default TodoLista;
