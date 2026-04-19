import ReactDOM from "react-dom/client";
import { TodoItem } from "./TodoItem";

describe("TodoItem", () => {
  const todo = {
    id: "1",
    title: "Comprar leche",
    completed: false,
    userId: "user-1",
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

  it("muestra el título y llama a las acciones cuando se interactúa", async () => {
    const handleToggle = vi.fn();
    const handleRemove = vi.fn();

    const { container, root } = await renderWithRoot(
      <TodoItem todo={todo} onToggle={handleToggle} onRemove={handleRemove} />
    );

    const titleElement = Array.from(container.querySelectorAll("span")).find(
      (span) => span.textContent?.trim() === "Comprar leche"
    );
    expect(titleElement?.textContent).toBe("Comprar leche");

    const checkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement;
    expect(checkbox).toBeInstanceOf(HTMLInputElement);
    expect(checkbox.checked).toBe(false);
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await flush();
    expect(handleToggle).toHaveBeenCalledWith("1");

    const removeButton = container.querySelector("button[title='Eliminar']") as HTMLButtonElement;
    removeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await flush();
    expect(handleRemove).toHaveBeenCalledWith("1");

    root.unmount();
    container.remove();
  });
});
