import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../../utils/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
    if (token) {
      const { exp } = jwtDecode(token);
      if (exp && exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
