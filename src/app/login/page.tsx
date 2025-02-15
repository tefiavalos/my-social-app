"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useAuth();

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={() => handleLogin(email, password)} disabled={loading}>
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </div>
  );
};

export default LoginPage;

