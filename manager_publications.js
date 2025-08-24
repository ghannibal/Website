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
    switch (entry.entryType) {
        case "article":
            return `${f.author || ""}. <em>${f.title || ""}</em>. ${f.journal || ""}, ${f.year || ""}.`;
        case "book":
            return `${f.author || ""}. <em>${f.title || ""}</em>. ${f.publisher || ""}, ${f.year || ""}.`;
        case "inproceedings":
            return `${f.author || ""}. <em>${f.title || ""}</em>. In ${f.booktitle || ""}, ${f.year || ""}.`;
        default:
            return `${f.author || ""}. <em>${f.title || ""}</em>. ${f.year || ""}.`;
    }
}

// --- Render publications grouped by type ---
function renderPublications(entries) {
    const container = document.getElementById("publications");

    // Group by type
    const groups = {
        article: [],
        inproceedings: [],
        book: [],
        misc: []
    };

    entries.forEach(e => {
        if (groups[e.entryType]) {
            groups[e.entryType].push(e);
        } else {
            groups.misc.push(e);
        }
    });

    // Sort each group by year (desc)
    for (const type in groups) {
        groups[type].sort((a, b) => (b.fields.year || 0) - (a.fields.year || 0));
    }

    // Render groups
    if (groups.article.length) {
        const sec = document.createElement("div");
        sec.innerHTML = "<h2>Journal Articles</h2>";
        const ul = document.createElement("ul");
        groups.article.forEach(e => {
            const li = document.createElement("li");
            li.innerHTML = formatEntry(e);
            ul.appendChild(li);
        });
        sec.appendChild(ul);
        container.appendChild(sec);
    }

    if (groups.inproceedings.length) {
        const sec = document.createElement("div");
        sec.innerHTML = "<h2>Conference Papers</h2>";
        const ul = document.createElement("ul");
        groups.inproceedings.forEach(e => {
            const li = document.createElement("li");
            li.innerHTML = formatEntry(e);
            ul.appendChild(li);
        });
        sec.appendChild(ul);
        container.appendChild(sec);
    }

    if (groups.book.length) {
        const sec = document.createElement("div");
        sec.innerHTML = "<h2>Books</h2>";
        const ul = document.createElement("ul");
        groups.book.forEach(e => {
            const li = document.createElement("li");
            li.innerHTML = formatEntry(e);
            ul.appendChild(li);
        });
        sec.appendChild(ul);
        container.appendChild(sec);
    }

    if (groups.misc.length) {
        const sec = document.createElement("div");
        sec.innerHTML = "<h2>Other</h2>";
        const ul = document.createElement("ul");
        groups.misc.forEach(e => {
            const li = document.createElement("li");
            li.innerHTML = formatEntry(e);
            ul.appendChild(li);
        });
        sec.appendChild(ul);
        container.appendChild(sec);
    }
}

// --- Load publication.bib ---
fetch("publications.bib")
    .then(res => res.text())
    .then(text => {
        const entries = parseBibTeX(text);
        renderPublications(entries);
    })
    .catch(err => console.error("Error loading BibTeX file:", err));