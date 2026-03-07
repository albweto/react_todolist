"use client";
import { Checkbox } from "../atoms/Checkbox";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { Todo } from "@/src/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onRemove }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 group hover:border-gray-300">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded-md border-2 border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition duration-200 flex-shrink-0"
      />
      
      <span
        className={`flex-1 transition-all duration-200 ${
          todo.completed
            ? "line-through text-gray-400"
            : "text-gray-800 font-medium"
        }`}
      >
        {todo.title}
      </span>

      <Button
        variant="danger"
        size="sm"
        onClick={() => onRemove(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        title="Eliminar"
      >
        <Icon name="trash" size="sm" />
      </Button>
    </div>
  );
};
