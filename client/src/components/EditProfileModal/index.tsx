import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { initialiseAuthUser } from "../../utils/reducers/authReducer";
import store from "../../utils/store";
import ModalStyles from "../Modal/modal.styles";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { initialiseUsers } from "../../utils/reducers/userReducer";
interface EditProfileModalProps {
  openProfile: boolean;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileModal = ({
  openProfile,
  setOpenProfile,
}: EditProfileModalProps) => {
  const Input = styled("input")({
    display: "none",
  });
  const { auth, users } = useAppSelector((state) => state);
  const [user, setUser] = useState({
    name: auth?.name,
    email: auth?.email,
    avatarSrc: auth?.avatarSrc,
    blobURL: auth?.blobURL,
  });
  const [imageBlob, setImgBlob] = useState<Blob>();
  const dispatch = useAppDispatch();
  const [error, setError] = useState({
    name: false,
    email: false,
  });
  const handleEdit = async () => {
    if (user.name === "" || user.email === "") {
      setError({ name: user.name === "", email: user.email === "" });
    }
    const form = new FormData();
    let imgData = null;
    if (imageBlob) {
      form.append("file", imageBlob);
      imgData = await axiosInstance.post("/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    const data = await axiosInstance.put(`/updateUser/${auth?.id}`, {
      ...user,
      avatarSrc: imgData?.data || auth?.avatarSrc,
    });
    if (imageBlob) {
      store.dispatch(
        initialiseAuthUser({
          ...data.data,
          blobURL: URL.createObjectURL(imageBlob),
        })
      );
      const tempUsers = [...users];
      const authIndex = tempUsers.findIndex((user) => user.id === auth?.id);

      tempUsers[authIndex] = {
        ...tempUsers[authIndex],
        blobURL: URL.createObjectURL(imageBlob),
      };
      dispatch(initialiseUsers([...tempUsers]));
    } else {
      store.dispatch(
        initialiseAuthUser({
          ...data.data,
          avatarSrc: auth?.avatarSrc,
        })
      );
    }
    setOpenProfile(false);
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target?.files[0]) {
      let img = event.target.files[0];
      setImgBlob(img);
      setUser({ ...user, blobURL: URL.createObjectURL(img) });
    }
  };
  return (
    <Dialog open={openProfile} fullWidth maxWidth="xs">
      <DialogTitle>
        <div>Edit Your Profile</div>
      </DialogTitle>
      <DialogContent dividers>
        <div style={ModalStyles.dialogField}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageChange}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <EditIcon />
                </IconButton>
              </label>
            }
          >
            <Avatar
              alt={user?.name}
              src={user?.blobURL || "https://"}
              sx={{ width: 100, height: 100 }}
            />
          </Badge>
        </div>
        <div style={ModalStyles.dialogField}>
          <TextField
            fullWidth
            label="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            variant="outlined"
            error={error?.name}
            helperText={error?.name === true && "Name is required"}
          />
        </div>
        <div style={ModalStyles.dialogField}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            variant="outlined"
            error={error?.email}
            helperText={error?.email === true && "Email is required"}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenProfile(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={() => handleEdit()}>Edit Profile</Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditProfileModal;
