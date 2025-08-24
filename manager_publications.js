// --- Simple BibTeX parser ---
function parseBibTeX(text) {
    const entries = [];
    const entryRegex = /@(\w+)\s*{\s*([^,]+),([\s\S]*?)\n}/g;
    let match;

    while ((match = entryRegex.exec(text)) !== null) {
        const entryType = match[1].toLowerCase();
        const citationKey = match[2];
        const fieldsText = match[3];

        const fields = {};
        const fieldRegex = /(\w+)\s*=\s*(?:"([^"]*)"|\{([^{}]*)\})/g;
        let fieldMatch;

        while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
            fields[fieldMatch[1].toLowerCase()] = fieldMatch[2] || fieldMatch[3];
        }

        entries.push({ entryType, citationKey, fields });
    }
    return entries;
}

// --- Format entry as HTML ---
function formatEntry(entry) {
    const f = entry.fields;

    // Base text
    let text;
    switch (entry.entryType) {
        case "article":
            text = `${f.author || ""}. <em>${f.title || ""}</em>. ${f.journal || ""}, ${f.year || ""}.`;
            break;
        case "book":
            text = `${f.author || ""}. <em>${f.title || ""}</em>. ${f.publisher || ""}, ${f.year || ""}.`;
            break;
        case "inproceedings":
            text = `${f.author || ""}. <em>${f.title || ""}</em>. In ${f.booktitle || ""}, ${f.year || ""}.`;
            break;
        default:
            text = `${f.author || ""}. <em>${f.title || ""}</em>. ${f.year || ""}.`;
    }

    // Add link if DOI or URL exists
    if (f.doi) {
        text += ` <a href="https://doi.org/${f.doi}" target="_blank">[DOI]</a>`;
    } else if (f.url) {
        text += ` <a href="${f.url}" target="_blank">[Link]</a>`;
    }

    return text;
}

// --- Render publications grouped by type ---
function renderPublications(entries) {
    const container = document.getElementById("publications");

    const groups = { article: [], inproceedings: [], book: [], misc: [] };

    entries.forEach(e => {
        if (groups[e.entryType]) {
            groups[e.entryType].push(e);
        } else {
            groups.misc.push(e);
        }
    });

    for (const type in groups) {
        groups[type].sort((a, b) => (b.fields.year || 0) - (a.fields.year || 0));
    }

    function makeSection(title, items) {
        if (!items.length) return;
        const sec = document.createElement("div");
        sec.innerHTML = `<h2>${title}</h2>`;
        const ul = document.createElement("ul");
        items.forEach(e => {
            const li = document.createElement("li");
            li.innerHTML = formatEntry(e);
            ul.appendChild(li);
        });
        sec.appendChild(ul);
        container.appendChild(sec);
    }

    makeSection("Journal Articles", groups.article);
    makeSection("Conference Papers", groups.inproceedings);
    makeSection("Books", groups.book);
    makeSection("Other", groups.misc);
}

// --- Load publication.bib ---
fetch("publications.bib")
    .then(res => res.text())
    .then(text => {
        const entries = parseBibTeX(text);
        renderPublications(entries);
    })
    .catch(err => console.error("Error loading BibTeX file:", err));