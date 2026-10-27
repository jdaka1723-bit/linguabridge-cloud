document.addEventListener("DOMContentLoaded", () => {
    const sourceText = document.getElementById("source-text");
    const targetText = document.getElementById("target-text");
    const translateBtn = document.getElementById("translate-btn");
    const clearBtn = document.getElementById("clear-btn");
    const charCount = document.getElementById("char-count");
    const sourceLang = document.getElementById("source-lang");
    const targetLang = document.getElementById("target-lang");

    // Update character count
    sourceText.addEventListener("input", (e) => {
        const length = e.target.value.length;
        charCount.textContent = `${length} character${length === 1 ? '' : 's'}`;
    });

    // Clear text handler
    clearBtn.addEventListener("click", () => {
        sourceText.value = "";
        targetText.innerHTML = `<span class="text-slate-400 italic">Translation will appear here...</span>`;
        charCount.textContent = "0 characters";
    });

    // Translate button handler
    translateBtn.addEventListener("click", async () => {
        const textToTranslate = sourceText.value.trim();
        if (!textToTranslate) return;

        targetText.innerHTML = `<span class="text-slate-400 animate-pulse">Translating...</span>`;

        try {
            // Placeholder for your translation API or logic call
            // e.g., fetch('your-translation-endpoint', { ... })
            
            setTimeout(() => {
                // Simulated response for demonstration
                targetText.textContent = `[Translated to ${targetLang.value}]: ${textToTranslate}`;
            }, 600);

        } catch (error) {
            targetText.innerHTML = `<span class="text-red-500">Translation failed. Please try again.</span>`;
            console.error("Translation error:", error);
        }
    });
});
