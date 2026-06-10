const STORAGE_KEY = "dashboard-notes";

export function initNotes() {
    const textarea = document.getElementById("notes-textarea");
    const saveBtn = document.getElementById("save-notes");

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        textarea.value = saved;
    }

    function saveNotes() {
        localStorage.setItem(STORAGE_KEY, textarea.value);
        saveBtn.textContent = "Saved!";
        setTimeout(() => {
            saveBtn.textContent = "Save";
        }, 1500);
    }

    textarea.addEventListener("input", saveNotes);
    saveBtn.addEventListener("click", saveNotes);
}
