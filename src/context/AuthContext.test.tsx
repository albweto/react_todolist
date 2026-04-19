import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, useAuth } from "./AuthContext";

const TestConsumer = () => {
  const { user, login, register, logout } = useAuth();

  return (
    <div>
      <span>{user ? user.username : "no-user"}</span>
      <button onClick={() => register("sami", "123")}>register</button>
      <button onClick={() => login("sami", "123")}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

const renderWithRoot = async (element: React.ReactElement) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  root.render(element);
  await flush();
  return { container, root };
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("registra un usuario y guarda la sesión en localStorage", async () => {
    vi.stubGlobal("crypto", { randomUUID: () => "user-1" } as unknown as Crypto);

    const { container, root } = await renderWithRoot(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    const findButton = (label: string) =>
      Array.from(container.querySelectorAll("button")).find(
        (button) => button.textContent?.trim() === label
      );

    const registerButton = findButton("register");
    expect(registerButton).toBeDefined();
    registerButton!.click();
    await flush();

    expect(container.querySelector("span")?.textContent).toBe("sami");
    expect(localStorage.getItem("session")).toContain("sami");

    const logoutButton = findButton("logout");
    expect(logoutButton).toBeDefined();
    logoutButton!.click();
    await flush();
    expect(container.querySelector("span")?.textContent).toBe("no-user");

    root.unmount();
    container.remove();
  });

  it("inicia sesión con credenciales válidas", async () => {
    localStorage.setItem(
      "users",
      JSON.stringify([{ id: "user-1", username: "sami", password: "123" }])
    );

    const { container, root } = await renderWithRoot(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    const loginButton = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "login"
    );

    expect(loginButton).toBeDefined();
    loginButton!.click();
    await flush();
    expect(container.querySelector("span")?.textContent).toBe("sami");

    root.unmount();
    container.remove();
  });
});
