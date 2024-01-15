interface Task {
  id: number;
  taskId: string;
  title: string;
  description: string;
  status: string;
  assignedTo: {
    id: number;
    email: string;
    name: string;
    avatarSrc: string;
  };
}
export default Task;
