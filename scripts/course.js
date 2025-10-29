// Course functionality
document.addEventListener('DOMContentLoaded', function() {
    // Course data array - UPDATED WITH ITM 111
    const courses = [
        { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
        { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
        { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false, current: true }
    ];
    
    const courseCardsContainer = document.getElementById('courseCards');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const totalCreditsElement = document.getElementById('totalCredits');
    
    // Function to display courses
    function displayCourses(filter = 'all') {
        // Clear existing courses
        courseCardsContainer.innerHTML = '';
        
        // Filter courses based on selection
        let filteredCourses = courses;
        if (filter !== 'all') {
            filteredCourses = courses.filter(course => course.subject === filter);
        }
        
        // Create course cards
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            let statusClass = '';
            let statusBadge = '';
            
            if (course.completed) {
                statusClass = 'completed';
                statusBadge = '<div class="completed-badge">Completed</div>';
            } else if (course.current) {
                statusClass = 'current';
                statusBadge = '<div class="current-badge">In Progress</div>';
            }
            
            courseCard.className = `course-card ${statusClass}`;
            courseCard.innerHTML = `
                <div class="course-code">${course.subject} ${course.number}</div>
                <div class="course-title">${course.title}</div>
                <div class="course-credits">${course.credits} credits</div>
                ${statusBadge}
            `;
            
            courseCardsContainer.appendChild(courseCard);
        });
        
        // Update total credits
        updateTotalCredits(filteredCourses);
    }
    
    // Function to update total credits
    function updateTotalCredits(coursesToCount) {
        if (totalCreditsElement) {
            const totalCredits = coursesToCount.reduce((sum, course) => sum + course.credits, 0);
            totalCreditsElement.textContent = totalCredits;
        }
    }
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            const filter = this.getAttribute('data-filter');
            displayCourses(filter);
        });
    });
    
    // Initial display of all courses
    displayCourses();
});