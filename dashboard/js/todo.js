const STORAGE_KEY = "dashboard-todos";

export function initTodo() {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");

    const todos = loadTodos();

    function loadTodos() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveTodos() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function render() {
        list.innerHTML = "";
        if (todos.length === 0) {
            list.innerHTML = "<li class='empty-msg'>No tasks yet</li>";
            return;
        }
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = "todo-item" + (todo.completed ? " completed" : "");
            li.innerHTML = `
                <span data-index="${index}">${escapeHtml(todo.text)}</span>
                <button aria-label="Delete" data-index="${index}">&times;</button>
            `;
            list.appendChild(li);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        todos.push({ text, completed: false });
        saveTodos();
        input.value = "";
        render();
    });

    list.addEventListener("click", (e) => {
        const index = Number(e.target.dataset.index);
        if (isNaN(index)) return;
        if (e.target.tagName === "BUTTON") {
            todos.splice(index, 1);
        } else {
            todos[index].completed = !todos[index].completed;
        }
        saveTodos();
        render();
    });

    render();
}
