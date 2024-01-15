import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Button,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProjectState from "../../types/projectTypes";
import Task from "../../types/taskTypes";
import { useAppSelector } from "../../utils/hooks";
import store, { AppDispatch } from "../../utils/store";
import ModalStyles from "./modal.styles";
type CardModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item?: Task;
  currItem: any;
  setItem: any;
  handleDelete?: () => (dispatch: AppDispatch) => Promise<void>;
  handleSubmit?: () => void;
  isNewTask?: boolean;
  error?: {
    title: boolean;
    description: boolean;
    assignedTo: boolean;
    status: boolean;
  };
};
const CardModal = ({
  open,
  setOpen,
  item,
  currItem,
  setItem,
  handleDelete,
  handleSubmit,
  isNewTask,
  error,
}: CardModalProps) => {
  const users = useAppSelector((state: ProjectState) => state.users);
  const lanes = useAppSelector((state: ProjectState) => state.lanes);
  const value = lanes?.find((it) => it.value === currItem.status);
  // console.log(currItem);
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle>
        <div>{item?.taskId || "Add New Task"}</div>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div style={ModalStyles.dialogField}>
          <TextField
            fullWidth
            label="Task Title"
            value={currItem.title}
            onChange={(e) => setItem({ ...currItem, title: e.target.value })}
            error={error?.title}
            variant="outlined"
            helperText={error?.title && "Task Title is required"}
          />
        </div>
        <div style={ModalStyles.dialogField}>
          <TextField
            fullWidth
            label="Description"
            value={currItem.description}
            onChange={(e) =>
              setItem({ ...currItem, description: e.target.value })
            }
            variant="outlined"
            error={error?.description}
            helperText={error?.description && "Description is required"}
          />
        </div>
        <div style={ModalStyles.dialogField}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={lanes}
            sx={{ width: "100%" }}
            getOptionLabel={(option) => option.title}
            value={value}
            onChange={(e, newValue) =>
              setItem({ ...currItem, status: newValue?.value })
            }
            className="dropdown"
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </div>
        <div style={ModalStyles.dialogField}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            getOptionLabel={(option) => option.name}
            value={currItem.assignedTo}
            onChange={(e, newValue) => {
              setItem({ ...currItem, assignedTo: newValue });
            }}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Assigned" />}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div>
          {!isNewTask && (
            <Button
              color="error"
              variant="outlined"
              style={ModalStyles.dialogueDeleteBtn}
              onClick={() => handleDelete && store.dispatch(handleDelete())}
            >
              Delete Task
            </Button>
          )}

          <Button onClick={() => handleSubmit && handleSubmit()}>
            {!isNewTask ? "Save Changes" : "Submit"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
export default CardModal;
