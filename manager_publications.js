// Robust BibTeX parser
function parseBibTeX(text) {
    const entries = [];
    const entryRegex = /@(\w+)\s*{\s*([^,]+),/g;
    let match, lastIndex = 0;

    while ((match = entryRegex.exec(text)) !== null) {
        const entryType = match[1];
        const citationKey = match[2];
        const start = entryRegex.lastIndex;
        let braceCount = 0;
        let end = start;

        // Find matching closing brace for this entry
        for (let i = start; i < text.length; i++) {
            if (text[i] === '{') braceCount++;
            if (text[i] === '}') {
                if (braceCount === 0) {
                    end = i;
                    break;
                } else {
                    braceCount--;
                }
            }
        }

        const fieldsText = text.substring(start, end);
        const fields = {};
        // Regex to capture field = {value} or field = "value"
        const fieldRegex = /(\w+)\s*=\s*(\{([^{}]*(?:\{[^}]*\}[^}]*)*)\}|"([^"]*)")/g;
        let fieldMatch;
        while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
            fields[fieldMatch[1].toLowerCase()] = fieldMatch[3] || fieldMatch[4];
        }

        entries.push({ entryType, citationKey, fields });
        lastIndex = end;
    }

    return entries;
}

// Render references in HTML
function renderReferences(entries) {
    const list = document.getElementById('publications');
    entries.forEach(entry => {
        const f = entry.fields;
        const li = document.createElement('li');
        li.textContent = `${f.author || ""}. ${f.title || ""}. ${f.journal || f.publisher || ""}, ${f.year || ""}.`;
        list.appendChild(li);
    });
}

// Fetch and parse .bib file
fetch('publications.bib')
    .then(res => res.text())
    .then(text => {
        const entries = parseBibTeX(text);
        renderReferences(entries);
    })
    .catch(err => console.error("Error loading BibTeX file:", err));