// Join page functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('membership-form');
    const timestampField = document.getElementById('timestamp');
    
    // Set timestamp when form is loaded
    timestampField.value = new Date().toISOString();
    
    // Form validation
    if (form) {
        form.addEventListener('submit', function(event) {
            let valid = true;
            
            // Clear previous error messages
            clearErrors();
            
            // Validate first name
            const firstName = document.getElementById('first-name');
            if (!firstName.value.trim()) {
                showError(firstName, 'First name is required');
                valid = false;
            }
            
            // Validate last name
            const lastName = document.getElementById('last-name');
            if (!lastName.value.trim()) {
                showError(lastName, 'Last name is required');
                valid = false;
            }
            
            // Validate title (if provided)
            const title = document.getElementById('title');
            if (title.value && title.value.length < 7) {
                showError(title, 'Title must be at least 7 characters long');
                valid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value || !emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                valid = false;
            }
            
            // Validate phone
            const phone = document.getElementById('phone');
            const phoneRegex = /^\d{10,}$/;
            const cleanPhone = phone.value.replace(/\D/g, '');
            if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
                showError(phone, 'Please enter a valid phone number (at least 10 digits)');
                valid = false;
            }
            
            // Validate business name
            const businessName = document.getElementById('business-name');
            if (!businessName.value.trim()) {
                showError(businessName, 'Business name is required');
                valid = false;
            }
            
            if (!valid) {
                event.preventDefault();
            }
        });
    }
    
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '-0.5rem';
        errorDiv.style.marginBottom = '1rem';
        errorDiv.textContent = message;
        
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
        input.style.borderColor = 'red';
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
});