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
            <title>Dr. Hannibal</title>
            <style>
                body {
                    background: #ffffff;
                    background-attachment: fixed;
                }
                img {
                    border: 1px solid #000000;
                    border-radius: 2rem;
                }
                c {
                    color: #4682B4;
                }
                mark {
                    float: right;
                    margin-left: 0.3rem;
                    opacity: .3;
                }
            </style>
            <nav class="container">
                <ul>
                    <li><a href="index.html" class="contrast"><strong>DR. HANNIBAL</strong></a></li>
                </ul>
                <ul>
                    <li><a href="research.html" class="contrast">Research</a></li>
                    <li><a href="projects.html" class="contrast">Projects</a></li>
                    <li><a href="publications.html" class="contrast">Publications</a></li>
                    <li><a href="teaching.html" class="contrast">Teaching</a></li>
                    <li><a href="bio.html" class="contrast">Bio</a></li>
                </ul>
            </nav>
        `
    }
}

class FixedFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="container">
            <hr style="height:0.5px;border-width:0;color:white;background-color:black">
            <p style="float: right">
                <small>&copy; 2026 Glenda Hannibal</small>
            <p>
            </footer>
                `
    }
}

customElements.define('fixed-header', FixedHeader)
customElements.define('fixed-footer', FixedFooter)
