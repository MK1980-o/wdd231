// Common JavaScript functionality for all pages

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set last modified date
document.getElementById('last-modified').textContent = document.lastModified;

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('#main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
            mainNav.classList.remove('show');
        }
    });
});