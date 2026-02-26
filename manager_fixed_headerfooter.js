class FixedHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="color-scheme" content="light dark">
            <link rel="stylesheet" href="Pico_css/pico.min.css">
            <link rel="stylesheet" href="Pico_css/pico.colors.min.css">
            <link rel="stylesheet" href="custom_style.css">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            <title>G. Hannibal</title>
            <style>
                body {
                    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
                    background-attachment: fixed;
                }
                img {
                    border: 1px solid #b71540;
                    border-radius: 2rem;
                }
                c {
                    color: #b71540;
                }
                mark {
                    opacity: .3;
                }
            </style>
            <nav class="container">
                <ul>
                    <li><a href="page_landing.html" class="contrast"><strong>GLENDA HANNIBAL</strong></a></li>
                </ul>
                <ul>
                    <li><a href="page_research.html" class="contrast">Research</a></li>
                    <li><a href="page_projects.html" class="contrast">Projects</a></li>
                    <li><a href="page_publications.html" class="contrast">Publications</a></li>
                    <li><a href="page_teaching.html" class="contrast">Teaching</a></li>
                    <li><a href="page_bio.html" class="contrast">Bio</a></li>
                </ul>
                <!--<ul>
                    <li><a href="page_research.html" class="contrast">Research</a></li>
                    <li><a href="page_projects.html" class="contrast">Projects</a></li>
                    <li><a href="page_publications.html" class="contrast">Publications</a></li>
                </ul>
                <ul>
                    <li><a href="page_teaching.html" class="contrast">Teaching</a></li>
                    <li><a href="pages_service.html" class="contrast">Service</a></li>
                    <li><a href="page_advocacy.html" class="contrast">Advocacy</a></li>
                    <li><a href="page_outreach.html" class="contrast">Outreach</a></li>
                </ul>
                <ul>
                    <li><a href="page_team.html" class="contrast">Team</a></li>
                    <li><a href="page_bio.html" class="contrast">Bio</a></li>
                    <li><a href="page_contact.html" class="contrast">Contact</a></li>
                </ul>-->
            </nav>
        `
    }
}

class FixedFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="container">
            <hr style="height:0.5px;border-width:0;color:white;background-color:black">
                <small>
                <p>
                    &copy; 2026 Glenda Hannibal
                </p>
                </small>
            </footer>
                `
    }
}

customElements.define('fixed-header', FixedHeader)
customElements.define('fixed-footer', FixedFooter)
