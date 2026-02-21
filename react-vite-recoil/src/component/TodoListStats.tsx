import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../store/store";

const TodoListStats = () => {
  const todoStats = useRecoilValue(todoListStatsState);

  return (
    <ul>
      <li>Total items: {todoStats.total}</li>
      <li>Completed items: {todoStats.totalCompleted}</li>
      <li>Uncompleted items: {todoStats.totalUncompleted}</li>
      <li>Percent completed: {todoStats.totalPercentCompleted}%</li>
    </ul>
  );
};

export default TodoListStats;
