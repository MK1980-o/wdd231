// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    
    if (hamburger && navContainer) {
        hamburger.addEventListener('click', function() {
            // Toggle navigation menu
            navContainer.classList.toggle('active');
            
            // Animate hamburger icon
            this.classList.toggle('active');
            this.textContent = this.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Close navigation when clicking on a link (for mobile)
    const navLinks = document.querySelectorAll('.header-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navContainer.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                    hamburger.textContent = '☰';
                }
            }
        });
    });
    
    // Update navigation active state based on current page
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Close menu when clicking outside (for mobile)
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 768 && navContainer && navContainer.classList.contains('active')) {
            if (!event.target.closest('.navigation') && !event.target.closest('#hamburger-menu')) {
                navContainer.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                    hamburger.textContent = '☰';
                }
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navContainer) {
            navContainer.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.textContent = '☰';
            }
        }
    });
});