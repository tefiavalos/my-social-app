"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("El email es requerido"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const LoginPage = () => {
  const { handleLogin, loading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleInputChange = (field: "email" | "password", value: string) => {
    setValue(field, value);
    trigger(field);
  };

  const onSubmit = (data: { email: string; password: string }) => {
    if (!isValid) return;
    handleLogin(data.email, data.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-dark">
      <div className="w-full max-w-md md:max-w-lg p-6 md:p-8 bg-yellow-400 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-light text-lg md:text-2xl font-semibold text-center mb-6">
          Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password")}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" fullWidth>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
