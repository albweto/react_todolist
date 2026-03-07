"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useTodos } from "../../hooks/useTodos";
import { TodoForm } from "../molecules/TodoForm";
import { TodoList } from "../organisms/TodoList";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";

export const AppTemplate: React.FC = () => {
  const { user, logout } = useAuth();
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const router = useRouter();

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Debes iniciar sesión</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
                <Icon name="check" size="lg" className="text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mi Lista de Tareas
              </h1>
            </div>
            <p className="text-gray-600">Hola, <span className="font-semibold">{user.username}</span></p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>

        {/* Card Container */}
        <div className="card-elevated p-6 sm:p-8">
          {/* Form Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <TodoForm onAdd={addTodo} />
          </div>

          {/* List Section */}
          <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            🚀 <span>Mantén el control de tus tareas diarias</span>
          </p>
        </div>
      </div>
    </div>
  );
};
