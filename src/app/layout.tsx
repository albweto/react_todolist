import type { Metadata } from "next";
import "../styles/global.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "Todo App • Gestor de tareas moderno",
  description: "Una aplicación de tareas simple y moderna con Material Design 3",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'><rect fill='%233B82F6' width='256' height='256' rx='40'/><path fill='white' d='M104 176c-3.3 0-6.5-1.3-8.9-3.7l-48-48c-4.9-4.9-4.9-12.9 0-17.8s12.9-4.9 17.8 0l40.1 40.1 96-96c4.9-4.9 12.9-4.9 17.8 0s4.9 12.9 0 17.8l-104 104c-2.4 2.4-5.6 3.7-8.9 3.7z'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
