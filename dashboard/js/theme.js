const STORAGE_KEY = "dashboard-theme";

const themes = {
    light: {
        "--bg-primary": "#FAF3E0",
        "--bg-card": "#ffffff",
        "--text-primary": "#1C1C1C",
        "--border": "#E6D5B8",
        "--shadow": "rgba(0, 0, 0, 0.08)",
        "--header-bg": "#3A5A40",
        "--header-text": "#ffffff",
        "--btn-bg": "#A3B18A",
        "--btn-text": "#1C1C1C",
        "--input-bg": "#FAF3E0",
    },
    dark: {
        "--bg-primary": "#1C1C1C",
        "--bg-card": "#3A5A40",
        "--text-primary": "#FAF3E0",
        "--border": "#4a7c59",
        "--shadow": "rgba(0, 0, 0, 0.3)",
        "--header-bg": "#1C1C1C",
        "--header-text": "#FAF3E0",
        "--btn-bg": "#A3B18A",
        "--btn-text": "#1C1C1C",
        "--input-bg": "#2a2a2a",
    },
};

export function initTheme() {
    const toggle = document.getElementById("theme-toggle");
    const root = document.documentElement;
    const saved = localStorage.getItem(STORAGE_KEY) || "light";

    applyTheme(saved);

    toggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
    });

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
        const vars = themes[theme] || themes.light;
        for (const [key, value] of Object.entries(vars)) {
            root.style.setProperty(key, value);
        }
    }
}
}
