import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

export const RegisterForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!register(username, password)) {
      setError("El usuario ya existe");
      return;
    }
    setError("");
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card p-6 max-w-sm mx-auto mt-12">
      <h2 className="text-2xl font-bold text-center mb-2">Crear cuenta</h2>
      <Input
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      <Button type="submit" variant="primary" className="w-full">Registrarse</Button>
    </form>
  );
};
