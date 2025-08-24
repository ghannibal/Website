async function loadBib() {
    // Replace with the *raw* URL of your .bib file from GitHub
    const url = "https://raw.githubusercontent.com/ghannibal/Website/main/publications.bib";

    const res = await fetch(url);
    if (!res.ok) {
        document.getElementById("pubs").innerHTML = "Failed to load .bib file.";
        return;
    }

    const text = await res.text();
    const entries = bibtexParse.toJSON(text);

    const container = document.getElementById("pubs");

    entries.forEach(entry => {
        const title = entry.entryTags.title || "Untitled";
        const authors = entry.entryTags.author || "";
        const year = entry.entryTags.year || "";

        // Create article card
        const article = document.createElement("article");

        const p = document.createElement("p");
        p.innerHTML = `<strong>${title}</strong><br>${authors} (${year})`;

        // Toggle button
        const button = document.createElement("button");
        button.textContent = "Show BibTeX";

        // Extract raw BibTeX block
        const regex = new RegExp("@[^{]+{" + entry.citationKey + "[\\s\\S]*?\\}\\s*(?=\\n|$)", "m");
        const match = text.match(regex);
        const bibtexBlock = match ? match[0] : "";

        const pre = document.createElement("pre");
        pre.textContent = bibtexBlock;

        button.onclick = () => {
            pre.style.display = pre.style.display === "block" ? "none" : "block";
            button.textContent = pre.style.display === "block" ? "Hide BibTeX" : "Show BibTeX";
        };

        article.appendChild(p);
        article.appendChild(button);
        article.appendChild(pre);

        container.appendChild(article);
    });
}

loadBib();