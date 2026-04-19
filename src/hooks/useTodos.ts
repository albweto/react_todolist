"use client";
import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import { useAuth } from "../context/AuthContext";

export const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === "undefined") return [];
    if (user) {
      const saved = localStorage.getItem(`todos_${user.id}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    if (typeof window === "undefined" || !user) return;
    localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
  }, [todos, user]);

  const addTodo = (text: string) => {
    if (!user) return;
    const newTodo: Todo = { id: crypto.randomUUID(), title: text, completed: false, userId: user.id };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}