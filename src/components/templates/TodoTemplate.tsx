"use client";
import { TodoForm } from "../molecules/TodoForm";
import { TodoList } from "../organisms/TodoList";
import { Todo } from "@/types/todo";
import { Icon } from "../atoms/Icon";

interface TodoTemplateProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TodoTemplate: React.FC<TodoTemplateProps> = ({
  todos,
  onAdd,
  onToggle,
  onRemove,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg">
              <Icon name="check" size="lg" className="text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mi Lista de Tareas
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Organiza tus tareas y aumenta tu productividad</p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Form Section */}
          <div className="border-b border-gray-200 p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <TodoForm onAdd={onAdd} />
          </div>

          {/* List Section */}
          <div className="p-6 sm:p-8">
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          </div>
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
