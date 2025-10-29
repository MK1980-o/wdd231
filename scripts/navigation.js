// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('.navigation');
    
    if (hamburger && navigation) {
        hamburger.addEventListener('click', function() {
            // Toggle navigation menu
            if (navigation.style.maxHeight) {
                navigation.style.maxHeight = null;
            } else {
                navigation.style.maxHeight = navigation.scrollHeight + "px";
            }
            
            // Animate hamburger icon
            this.classList.toggle('active');
        });
    }
    
    // Close navigation when clicking on a link (for mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navigation.style.maxHeight = null;
                hamburger.classList.remove('active');
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
});