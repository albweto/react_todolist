"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  username: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "users";
const SESSION_KEY = "session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  });

  // keep in sync with other tabs
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = () => {
      const session = localStorage.getItem(SESSION_KEY);
      setUser(session ? JSON.parse(session) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (username: string, password: string) => {    if (typeof window === "undefined") return false;    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as StoredUser[];
    const found = users.find((u: StoredUser) => u.username === username && u.password === password);
    if (found) {
      setUser({ id: found.id, username: found.username });
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id: found.id, username: found.username }));
      return true;
    }
    return false;
  };

  const register = (username: string, password: string) => {    if (typeof window === "undefined") return false;    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as StoredUser[];
    if (users.some((u: StoredUser) => u.username === username)) return false;
    const newUser = { id: crypto.randomUUID(), username, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ id: newUser.id, username });
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: newUser.id, username }));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
