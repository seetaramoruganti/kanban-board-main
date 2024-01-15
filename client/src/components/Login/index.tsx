import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { login } from "../../utils/reducers/authReducer";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const TextFieldStyled = styled(TextField)`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ButtonStyled = styled(Button)`
  text-transform: none;
`;

const Login = () => {
  //   const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event?.target?.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const handleFormSubmit = async () => {
      try {
        const data = await axiosInstance.post("/login", { email, password });
        if (data && data.status === 200) {
          dispatch(login(data.data));
          navigate("/");
        }
        if (data.status === 400) {
          alert("Invalid Credentials");
        }
      } catch (err) {
        alert("Invalid Credentials");
      }
    };
    handleFormSubmit();
    // history.push("/dashboard");
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit}>
        <Typography variant="h4">Login</Typography>
        <TextFieldStyled
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          required
        />
        <TextFieldStyled
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          fullWidth
          onChange={handlePasswordChange}
          required
        />
        <ButtonStyled
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Login
        </ButtonStyled>{" "}
        <ButtonStyled
          color="primary"
          type="submit"
          fullWidth
          onClick={() => navigate("/register")}
        >
          New User? Register
        </ButtonStyled>
      </Form>
    </Root>
  );
};

export default Login;
