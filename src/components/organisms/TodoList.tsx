"use client";
import { Todo } from "../../types/todo";
import { TodoItem } from "../molecules/TodoItem";
import { Icon } from "../atoms/Icon";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onRemove }) => {
  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
          <p className="text-xs text-blue-700 font-medium mt-1">Total</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          <p className="text-xs text-yellow-700 font-medium mt-1">Pendientes</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          <p className="text-xs text-green-700 font-medium mt-1">Completadas</p>
        </div>
      </div>

      {/* Items */}
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Icon name="check" size="lg" className="text-gray-300" />
          </div>
          <p className="text-gray-600 text-lg font-semibold">No hay tareas aún</p>
          <p className="text-gray-400 text-sm">Crea una nueva tarea para comenzar</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {totalCount > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso</span>
            <span className="text-sm font-semibold text-gray-600">{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
