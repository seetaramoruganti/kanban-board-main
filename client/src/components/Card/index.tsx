import { Avatar, Card } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import Task from "../../types/taskTypes";
import axiosInstance from "../../utils/axiosInstance";
import { useAppSelector } from "../../utils/hooks";
import { initialiseTasks } from "../../utils/reducers/taskReducer";
import store, { AppDispatch } from "../../utils/store";
import Modal from "../Modal";
import itemStyles from "./kanbanCard.styles";

interface KanbanCardProps {
  task: Task;
  avatarSrc?: string;
}
const KanbanCard = ({ task, avatarSrc }: KanbanCardProps) => {
  const [open, setOpen] = useState(false);
  const [currItem, setItem] = useState(task);
  const [error, setError] = useState({
    title: false,
    description: false,
    assignedTo: false,
    status: false,
  });
  const tasks = useAppSelector((state) => state.tasks);
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { type: "card", id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(ref);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEdit = () => {
    return async function editTask(dispatch: AppDispatch) {
      // let currTask: any = tasks?.find((item) => item.id === task.id);
      const taskIndex = tasks?.indexOf(task);

      task = { ...task, ...currItem };
      const data = await axiosInstance.put(`/task/${task.id}`, task);
      const newTasks = [...tasks];
      newTasks[taskIndex] = task;
      dispatch(initialiseTasks(newTasks));
      setOpen(false);
    };
  };
  const handleSubmit = () => {
    if (
      currItem.title === "" ||
      currItem.description === "" ||
      !currItem.assignedTo ||
      !currItem.status
    ) {
      setError({
        title: currItem.title === "" ? true : false,
        description: currItem.description === "" ? true : false,
        assignedTo: !currItem.assignedTo ? true : false,
        status: !currItem.status ? true : false,
      });
      return;
    }
    store.dispatch(handleEdit());
  };
  const handleDelete = () => {
    return async function deleteTask(dispatch: AppDispatch) {
      const taskIndex = tasks.indexOf(task);

      const newTasks = [...tasks];
      await axiosInstance.delete(`/task/${task.id}`);
      newTasks.splice(taskIndex, 1);
      dispatch(initialiseTasks(newTasks));
      setOpen(false);
    };
  };

  return (
    <>
      <Card
        ref={ref}
        style={{ ...itemStyles.card, opacity }}
        onClick={handleOpen}
      >
        <div style={itemStyles.item}>
          <div
            style={
              task.status === "done"
                ? itemStyles.doneStyles
                : { alignItems: "flex-start", display: "flex", margin: "10px" }
            }
          >
            {task.title}
          </div>

          <div style={itemStyles.assigned}>
            <div style={itemStyles.itemId}>{task?.taskId}</div>
            <div>
              <Avatar
                src={avatarSrc || "https://"}
                alt={task?.assignedTo?.name}
                sx={{ bgcolor: deepOrange[400] }}
                title={task?.assignedTo?.name}
              />
            </div>
            {/* <span>{item?.assignedTo}</span> */}
          </div>
        </div>
      </Card>
      <Modal
        open={open}
        setOpen={setOpen}
        item={task}
        currItem={currItem}
        setItem={setItem}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        error={error}
      />
    </>
  );
};

export default KanbanCard;
