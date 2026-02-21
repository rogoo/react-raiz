import { useRecoilState } from "recoil";
import { todoListState } from "../store/store";
import type { ITodo } from "../util/Types";
import { removeItemAtIndex, replaceItemAtIndex } from "../util/Utils";

const TodoItem = ({ id, text, isComplete }: ITodo) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((todo) => todo.id === id);

  const editItemText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      id,
      text: event.target.value,
      isComplete,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      id,
      text,
      isComplete: !isComplete,
    });
    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  return (
    <div>
      <label>
        Texto:
        <input type="text" value={text} onChange={editItemText} />
      </label>
      <label>
        Completado:
        <input
          type="checkbox"
          checked={isComplete}
          onChange={toggleItemCompletion}
        />
      </label>
      <button onClick={deleteItem}>Excluir</button>
    </div>
  );
};

export default TodoItem;
