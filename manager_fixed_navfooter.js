class FixedNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="container">
                <ul>
                    <li><a href="page_landing.html" class="contrast">Home</a></li>
                </ul>
                <ul>
                    <li><a href="page_research.html" class="contrast">Research</a></li>
                    <li><a href="page_publications.html" class="contrast">Publications</a></li>
                    <li><a href="page_presentations.html" class="contrast">Presentations</a></li>
                    <li><a href="pages_service.html" class="contrast">Service</a></li>
                    <li><a href="page_teaching.html" class="contrast">Teaching</a></li>
                    <li><a href="page_outreach.html" class="contrast">Outrach</a></li>
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
                <p>© 2025 Glenda Hannibal. All Rights Reserved.</p>
                </small>
            </footer>
                `
    }
}

customElements.define('fixed-nav', FixedNav)
customElements.define('fixed-footer', FixedFooter)
