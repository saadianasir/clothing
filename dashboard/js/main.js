import { initTheme } from "./theme.js";
import { initWeather } from "./weather.js";
import { initQuote } from "./quote.js";
import { initTodo } from "./todo.js";
import { initNotes } from "./notes.js";

document.getElementById("year").textContent = new Date().getFullYear();

initTheme();
initWeather();
initQuote();
initTodo();
initNotes();
