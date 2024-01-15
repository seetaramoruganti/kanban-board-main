import Lane from "./laneTypes";
import Task from "./taskTypes";
import User from "./userTypes";

interface ProjectState {
  auth: User | null;
  tasks: Task[];
  users: User[];
  lanes: Lane[];
}
export default ProjectState;
