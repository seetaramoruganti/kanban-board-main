import { useRef } from "react";
import { useDrop } from "react-dnd";
import { initialiseTasks } from "../../utils/reducers/taskReducer";
import axiosInstance from "../../utils/axiosInstance";
import store, { AppDispatch, RootState } from "../../utils/store";
import Task from "../../types/taskTypes";
type KanbanColumnProps = {
  status: string;
  children: React.ReactNode;
};
const KanbanColumn = ({ status, children }: KanbanColumnProps) => {
  const changeTaskStatus = (id: number, status: string) => {
    return async function changeLane(
      dispatch: AppDispatch,
      getState: () => RootState
    ) {
      let tasks = getState().tasks;
      let task = tasks?.find((task) => task.id === id);

      if (task !== undefined) {
        const taskIndex = tasks.indexOf(task);
        const data = await axiosInstance.patch(`/task/${id}`, { status });
        task = { ...task, status };
        const newTasks = [...tasks];
        newTasks[taskIndex] = task;
        dispatch(initialiseTasks(newTasks));
      }
    };
  };
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "card",
    drop(item: Task) {
      store.dispatch(changeTaskStatus(item.id, status));
    },
  });
  drop(ref);
  return <div ref={ref}> {children}</div>;
};

export default KanbanColumn;
