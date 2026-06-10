const API_URL = "https://api.quotable.io/random";

export async function getQuote() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch quote");
    }

    const data = await response.json();

    return {
        text: data.content,
        author: data.author,
    };
}

export function initQuote() {
    const container = document.getElementById("quote-content");
    const btn = document.getElementById("new-quote");

    function render(quote) {
        container.innerHTML = `
            <blockquote class="quote">
                <p>"${quote.text}"</p>
                <cite>— ${quote.author}</cite>
            </blockquote>
        `;
    }

    function showError(message) {
        container.innerHTML = `<p class="quote-error">${message}</p>`;
    }

    async function loadQuote() {
        try {
            const quote = await getQuote();
            render(quote);
        } catch (error) {
            showError("Unable to load quote. Please try again.");
        }
    }

    btn.addEventListener("click", loadQuote);
    loadQuote();
}
