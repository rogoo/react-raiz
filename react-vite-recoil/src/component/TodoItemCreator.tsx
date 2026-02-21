import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../store/store";
let id = 0;
const getId = () => {
  return id++;
};
const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const inputTextRef = useRef<HTMLInputElement>(null);
  const setTodoList = useSetRecoilState(todoListState);
  const resetTodoList = () => {
    setTodoList([]);
  };

  const addItem = () => {
    setTodoList((old) => [
      ...old,
      { id: getId(), text: inputValue, isComplete: false },
    ]);
    setInputValue("");
    if (inputTextRef.current) {
      inputTextRef.current.focus();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <label>
        Texto:
        <input
          ref={inputTextRef}
          type="text"
          value={inputValue}
          onChange={onChange}
        />
      </label>
      <button className="margin-left-1" onClick={addItem}>
        Add Todo
      </button>
      <button className="margin-left-1" onClick={resetTodoList}>
        Reset Todo
      </button>
    </div>
  );
};

export default TodoItemCreator;
