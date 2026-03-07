"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AppTemplate } from "../components/templates/AppTemplate";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Esperar un poco para asegurar que el contexto está inicializado
    const timer = setTimeout(() => {
      if (!user) {
        router.push("/login");
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (isLoading || !user) {
    return null;
  }

  return <AppTemplate />;
}
