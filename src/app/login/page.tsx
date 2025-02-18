"use client";

import { useAuth } from "@/hooks/useAuth";
import { Alert, Button, Header, Input } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const LoginPage = () => {
  const { handleLogin, loading } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);
  const { message } = useSelector((state: RootState) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    handleLogin(data.email, data.password);
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-5"
          noValidate
        >
          <div>
            <Input
              type="email"
              placeholder="Email"
              errorMessage={errors.email && errors.email.message}
              {...register("email")}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              errorMessage={errors.password && errors.password.message}
              {...register("password")}
            />
          </div>
          <Button type="submit" disabled={!!user} fullWidth>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
