import { useRecoilState } from "recoil";
import { todoListFilterState } from "../store/store";
import type { FilterTodoType } from "../util/Types";

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const updateFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterTodoType);
  };
  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">Show All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
