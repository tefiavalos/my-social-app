"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button, Input } from "@/components";
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

const LoginForm = () => {
  const { handleLogin, loading } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);

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
  );
};

export default LoginForm;
