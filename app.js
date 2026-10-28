(() => {
  "use strict";

  const STORAGE_KEY = "todo-poc.tasks.v1";
  const MAX_TASK_LENGTH = 200;

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyState = document.getElementById("empty-state");
  const storageWarning = document.getElementById("storage-warning");

  let tasks = loadTasks();

  function createId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
  }

  function loadTasks() {
    let raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch {
      showStorageWarning();
      return [];
    }

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter((task) => task && typeof task.id === "string" && typeof task.text === "string")
        .map((task) => ({
          id: task.id,
          text: task.text.slice(0, MAX_TASK_LENGTH),
          completed: task.completed === true,
        }));
    } catch {
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      showStorageWarning();
    }
  }

  function showStorageWarning() {
    storageWarning.hidden = false;
  }

  function render() {
    list.replaceChildren();

    for (const task of tasks) {
      const item = document.createElement("li");
      item.className = "todo-item";
      item.dataset.id = task.id;
      if (task.completed) {
        item.classList.add("completed");
      }

      const label = document.createElement("label");
      label.className = "todo-label";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`);

      const text = document.createElement("span");
      text.className = "todo-text";
      text.textContent = task.text;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("aria-label", `Delete "${task.text}"`);

      label.append(checkbox, text);
      item.append(label, deleteButton);

      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        item.classList.toggle("completed", task.completed);
        checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`);
        saveTasks();
      });

      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter((current) => current.id !== task.id);
        saveTasks();
        render();
      });

      list.append(item);
    }

    emptyState.hidden = tasks.length > 0;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) {
      input.focus();
      return;
    }

    tasks.unshift({
      id: createId(),
      text: text.slice(0, MAX_TASK_LENGTH),
      completed: false,
    });

    saveTasks();
    render();
    form.reset();
    input.focus();
  });

  render();
})();
