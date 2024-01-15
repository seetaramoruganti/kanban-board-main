import SearchIcon from "@mui/icons-material/SearchOutlined";
import {
  Avatar,
  AvatarGroup,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React, { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectState from "../../types/projectTypes";
import User from "../../types/userTypes";
import axiosInstance from "../../utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { logout } from "../../utils/reducers/authReducer";
import { addTask } from "../../utils/reducers/taskReducer";
import store, { AppDispatch } from "../../utils/store";
import AddLaneModal from "../AddLaneModal";
import itemStyles from "../Card/kanbanCard.styles";
import EditProfileModal from "../EditProfileModal";
import Modal from "../Modal";
interface HeaderProps {
  currUser: number | null;
  setCurrUser: React.Dispatch<React.SetStateAction<number | null>>;
  search?: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Header = ({ currUser, setCurrUser, search, setSearch }: HeaderProps) => {
  const [addLaneOpen, setAddLaneOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const { auth, users } = useAppSelector((state: ProjectState) => state);

  const [currItem, setItem] = useState({
    title: "",
    description: "",
    assignedTo: null,
    status: "",
  });

  const [taskErrors, setTaskErrors] = useState({
    title: false,
    description: false,
    assignedTo: false,
    status: false,
  });
  const addNew = () => {
    return async function addNewTask(dispatch: AppDispatch) {
      const data = await axiosInstance.post("/task", currItem);
      dispatch(addTask(data.data));
      setOpen(false);
      setItem({
        title: "",
        description: "",
        assignedTo: null,
        status: "",
      });
    };
  };
  const handleSubmit = () => {
    if (
      currItem.title === "" ||
      currItem.description === "" ||
      !currItem.assignedTo ||
      !currItem.status
    ) {
      setTaskErrors({
        title: currItem.title === "" ? true : false,
        description: currItem.description === "" ? true : false,
        assignedTo: !currItem.assignedTo ? true : false,
        status: !currItem.status ? true : false,
      });
      return;
    }
    setTaskErrors({
      title: false,
      description: false,
      assignedTo: false,
      status: false,
    });
    store.dispatch(addNew());
  };
  const [anchorEl, setAnchorEl] = useState();

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    // @ts-ignore
    setAnchorEl(event.target);
  };

  const handleCloseMenu = () => {
    // @ts-ignore
    setAnchorEl(null);
  };
  const filterUser = (id: number) => {
    if (currUser === Number(id)) {
      setCurrUser(null);
      return;
    }
    setCurrUser(Number(id));
  };
  const [openProfile, setOpenProfile] = useState(false);
  useEffect(() => {}, [auth?.avatarSrc]);
  return (
    <>
      {addLaneOpen && (
        <AddLaneModal
          addLaneOpen={addLaneOpen}
          setAddLaneOpen={setAddLaneOpen}
        />
      )}
      {openProfile && (
        <EditProfileModal
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
        />
      )}
      <div className="heading" style={{ flex: "1" }}>
        <div
          style={{
            display: "flex",
            maxWidth: "350px",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="search"
            variant="outlined"
            style={itemStyles.searchField}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <AvatarGroup max={5} style={{ justifyContent: "flex-end" }} total={4}>
            {users.slice(0, 3).map((user: User) => (
              <Tooltip title={user.name} arrow>
                <Avatar
                  key={user.id}
                  alt={user.name}
                  style={
                    user.id === currUser ? { border: "2px solid blue" } : {}
                  }
                  imgProps={{
                    style: { cursor: "pointer" },
                  }}
                  src={user?.blobURL || "https://"}
                  sx={{ bgcolor: deepOrange[500] }}
                  onClick={() => filterUser(user.id)}
                  component="div"
                />
              </Tooltip>
            ))}
            <Tooltip
              title={
                <React.Fragment>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {users.slice(3).map((user) => (
                      <Tooltip key={user.name} title={user.name} arrow>
                        <Avatar
                          key={user.id}
                          alt={user.name}
                          style={
                            user.id === currUser
                              ? { border: "2px solid blue", margin: "2px" }
                              : { margin: "2px" }
                          }
                          imgProps={{
                            style: { cursor: "pointer" },
                          }}
                          src={user?.blobURL || "https://"}
                          sx={{ bgcolor: deepOrange[500] }}
                          onClick={() => filterUser(user.id)}
                          component="div"
                        />
                      </Tooltip>
                    ))}
                  </div>
                </React.Fragment>
              }
              arrow
            >
              <Avatar>+{users.length - 3}</Avatar>
            </Tooltip>
          </AvatarGroup>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
          setItem={setItem}
          currItem={currItem}
          isNewTask={true}
          error={taskErrors}
        />
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            textTransform: "none",
            margin: "10px",
          }}
        >
          Add Task
        </Button>
        <Button
          onClick={() => setAddLaneOpen(true)}
          variant="outlined"
          style={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            color: "#fff",
            margin: "10px",
          }}
        >
          Add Lane
        </Button>
        <Button>
          <Tooltip title="Edit Profile" arrow>
            <>
              <Avatar
                key={auth?.id}
                alt={auth?.name}
                // style={auth.id === currUser ? { border: "2px solid blue" } : {}}
                imgProps={{
                  style: { cursor: "pointer" },
                }}
                src={auth?.blobURL || "https://"}
                sx={{ bgcolor: deepOrange[500] }}
                // onClick={() => filterUser(auth.id)}
                component="div"
                onMouseOver={handleOpenMenu}
              />

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                onMouseLeave={handleCloseMenu}
              >
                <MenuItem onClick={() => setOpenProfile(true)}>
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
              </Menu>
            </>
          </Tooltip>
        </Button>
      </div>
    </>
  );
};

export default Header;
