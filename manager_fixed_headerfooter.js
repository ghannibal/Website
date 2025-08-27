class FixedHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="color-scheme" content="light dark">
            <link rel="stylesheet" href="css/pico.min.css">
            <link rel="stylesheet" href="css/pico.colors.min.css">
            <title>Website - Glenda Hannibal</title>
            <nav class="container">
                <ul>
                    <li><a href="page_landing.html" class="contrast"><strong>Home</strong></a></li>
                </ul>
                <ul>
                    <li><a href="page_research.html" class="contrast">Research</a></li>
                    <li><a href="page_publications.html" class="contrast">Publications</a></li>
                    <li><a href="page_presentations" class="contrast">Presentations</a></li>
                    <li><a href="pages_service.html" class="contrast">Service</a></li>
                    <li><a href="page_teaching.html" class="contrast">Teaching</a></li>
                    <li><a href="page_outreach.html" class="contrast">Outreach</a></li>
                    <li><a href="page_bio.html" class="contrast">Bio</a></li>
                    <li><a href="page_contact.html" class="contrast">Contact</a></li>
                </ul>
            </nav>
            `
    }
}

class FixedFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="container">
            <hr />
                <small>
                <p>&copy; 2025 Glenda Hannibal. All Rights Reserved.</p>
                </small>
            </footer>
                `
    }
}

customElements.define('fixed-header', FixedHeader)
customElements.define('fixed-footer', FixedFooter)
