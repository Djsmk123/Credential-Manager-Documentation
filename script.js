

document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Theme switcher
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateButtonText(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButtonText(newTheme);
    });
    fetchContributors();


    function updateButtonText(theme) {
        themeToggle.textContent = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
    }
});
async function fetchContributors() {
    try {
        const response = await fetch('https://api.github.com/repos/djsmk123/flutter_credential_manager_compose/contributors?q=contributions&order=desc');
        const contributors = await response.json();
        displayContributors(contributors);
    } catch (error) {
        console.error('Error fetching contributors:', error);
    }
}

function displayContributors(contributors) {
    const contributorsGrid = document.querySelector('.contributors-grid');
    contributorsGrid.innerHTML = ''; // Clear existing content

    contributors.forEach((contributor, index) => {
        const contributorElement = document.createElement('div');
        contributorElement.className = 'contributor';
        contributorElement.style.animationDelay = `${index * 0.1}s`;

        contributorElement.innerHTML = `
            <img src="${contributor.avatar_url}" alt="${contributor.login}">
            <p>${contributor.login}</p>
        `;

        contributorsGrid.appendChild(contributorElement);
    });
}

