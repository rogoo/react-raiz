import { useEffect, type SubmitEvent } from "react";
import { useAppDispatch } from "../../features/redux/hooks";
import { addTodo } from "../../features/redux/reducer/todoSlice";

const TodoForm = () => {
  const dispatch = useAppDispatch();

  useEffect(function inicializa() {
    console.log("TodoForm mounted");
  }, []);

  console.log("TodoForm renderizado");

  const handleForm = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const todoText = formData.get("todoText");
    if (
      !todoText ||
      typeof todoText !== "string" ||
      todoText.trim().length === 0
    ) {
      window.alert("vazio papai");
      return;
    }

    dispatch(addTodo(todoText));
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleForm}>
      <input
        type="text"
        placeholder="Add a new todo"
        name="todoText"
        style={{ width: "85%", padding: ".5rem", marginTop: "1rem" }}
      />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
