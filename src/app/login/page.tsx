"use client";

import { Alert, Header } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.error);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-dark">
      <div className="w-full max-w-md md:max-w-lg p-6 md:p-8 bg-yellow-400 rounded-2xl shadow-lg space-y-6">
        <Header text="Login" />
        {user && (
          <Alert
            message="Ya estas logueado, podes navegar en el feed"
            type="info"
          />
        )}
        {message && <Alert message={message} type="error" />}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
