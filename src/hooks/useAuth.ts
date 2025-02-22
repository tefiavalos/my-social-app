import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "@/state/authSlice";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/state/store";
import { clearError, setError } from "@/state/errorSlice";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth", { email, password });

      if (res.status === 200) {
        dispatch(login(email));
        dispatch(clearError());
        router.push("/feed");
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("Error. Verificar usuario y contraseña"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return { handleLogin, handleLogout, loading, isAuthenticated, user };
};
