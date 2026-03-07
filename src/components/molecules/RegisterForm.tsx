"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Icon } from "../atoms/Icon";
import Link from "next/link";

export const RegisterForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { register } = useAuth();
  const router = useRouter();
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
    // Pequeño delay para asegurar que el estado se actualice
    setTimeout(() => {
      router.push("/");
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 max-w-sm mx-auto mt-12 space-y-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Icon name="check" size="lg" className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">Crear cuenta</h2>
        </div>
      </div>
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
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <Icon name="x" size="sm" className="text-red-600" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      <Button type="submit" variant="primary" className="w-full">Registrarse</Button>
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">¿Ya tienes cuenta?</p>
        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
          Inicia sesión aquí
        </Link>
      </div>
    </form>
  );
};
