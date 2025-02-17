"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const LoginPage = () => {
  const { handleLogin, loading } = useAuth();

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
        <h2 className="text-light text-lg md:text-2xl font-semibold text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5" noValidate>
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
          <Button type="submit" fullWidth > 
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;