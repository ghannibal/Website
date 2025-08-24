async function loadBib() {
    const url = "https://raw.githubusercontent.com/ghannibal/website/main/publications.bib";
    const res = await fetch(url);
    const text = await res.text();
    const entries = bibtexParse.toJSON(text);

    const container = document.getElementById("pubs");
    entries.forEach(entry => {
        const div = document.createElement("div");
        div.className = "pub";

        const title = entry.entryTags.title || "Untitled";
        const authors = entry.entryTags.author || "";
        const year = entry.entryTags.year || "";

        div.innerHTML = `<strong>${title}</strong><br>${authors} (${year})`;

        const bibButton = document.createElement("button");
        bibButton.textContent = "Show BibTeX";
        const pre = document.createElement("pre");
        pre.className = "bibtex";
        pre.textContent = entry.citationKey + " = " + JSON.stringify(entry.entryTags, null, 2);

        bibButton.onclick = () => {
            pre.style.display = pre.style.display === "block" ? "none" : "block";
        };

        div.appendChild(document.createElement("br"));
        div.appendChild(bibButton);
        div.appendChild(pre);

        container.appendChild(div);
    });
}

loadBib();