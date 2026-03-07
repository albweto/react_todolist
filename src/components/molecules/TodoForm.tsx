"use client";
import { useState } from "react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Icon } from "../atoms/Icon";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    onAdd(text);
    setText("");
    setError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <Input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="¿Qué necesitas hacer hoy?"
          size="md"
          error={error}
          className="flex-1"
        />
        <Button type="submit" size="md" className="flex-shrink-0">
          <Icon name="plus" size="sm" />
          <span className="hidden sm:inline">Agregar</span>
        </Button>
      </div>
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <Icon name="x" size="sm" className="text-red-600" />
          <span className="text-sm font-medium">La tarea no puede estar vacía</span>
        </div>
      )}
    </form>
  );
};