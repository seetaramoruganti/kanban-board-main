import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { login } from "../../utils/reducers/authReducer";
import { RegisterContainer } from "./Register.styles";
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const [image, setImage] = useState<string | undefined>();
  const [imgBlob, setImgBlob] = useState<Blob>();
  const [error, setError] = useState({
    name: false,
    password: false,
    email: false,
  });
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target?.files[0]) {
      let img = event.target.files[0];
      setImgBlob(img);
      setImage(URL.createObjectURL(img));
    }
  };
  const handleSubmit = async () => {
    const form = new FormData();
    if (
      userDetails.name === "" ||
      userDetails.email === "" ||
      userDetails.password === ""
    ) {
      setError({
        name: userDetails.name === "",
        email: userDetails.email === "",
        password: userDetails.password === "",
      });
      return;
    }
    setError({
      name: false,
      email: false,
      password: false,
    });
    let imgData = null;
    if (imgBlob) {
      form.append("file", imgBlob);
      imgData = await axiosInstance.post("/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    const data = await axiosInstance.post("/register", {
      ...userDetails,
      avatarSrc: imgData?.data || null,
    });
    if (data && data.status === 200) {
      dispatch(login(data.data));
      navigate("/");
    }
  };
  const Input = styled("input")({
    display: "none",
  });

  return (
    <RegisterContainer>
      <Typography variant="h4">Register</Typography>
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
          alt="User Avatar"
          src={image}
          sx={{ width: 100, height: 100 }}
        />
      </Badge>
      <TextField
        label="Email"
        variant="outlined"
        className="register-field"
        onChange={handleChange}
        name="email"
        error={error?.email}
        helperText={error?.email === true && "Email is required"}
      />
      <TextField
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        onChange={handleChange}
        className="register-field"
        error={error?.password}
        helperText={error?.password === true && "Password is required"}
      />
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        onChange={handleChange}
        className="register-field"
        error={error?.name}
        helperText={error?.name === true && "Name is required"}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        style={{ textTransform: "none" }}
      >
        {" "}
        Sign Up
      </Button>
    </RegisterContainer>
  );
};
export default Register;
