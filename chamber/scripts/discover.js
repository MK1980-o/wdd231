// Function to create attraction cards with named grid areas
async function createAttractionCards() {
  const cardsContainer = document.getElementById('cards');
  if (!cardsContainer) return;

  try {
    // Fetch data from JSON file
    const response = await fetch('data/attractions.json');
    if (!response.ok) throw new Error('Failed to fetch attractions');
    const attractions = await response.json();

    cardsContainer.innerHTML = '';

    attractions.forEach((attraction, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('role', 'article');
      card.setAttribute('data-grid-area', `card${index + 1}`);
      
      card.innerHTML = `
        <div class="card-image">
          <img 
            src="${attraction.image}" 
            alt="${attraction.name}" 
            loading="lazy"
            width="300"
            height="200"
            onerror="this.src='images/placeholder.webp'"
          >
        </div>
        <div class="card-content">
          <h3>${attraction.name}</h3>
          <p class="address"><strong>Address:</strong> ${attraction.address}</p>
          <p class="description">${attraction.description}</p>
          <button class="learn-more" aria-label="Learn more about ${attraction.name}">
            Learn More
          </button>
        </div>
      `;
      
      cardsContainer.appendChild(card);
    });

    // Add event listeners to Learn More buttons
    document.querySelectorAll('.learn-more').forEach((button, index) => {
      button.addEventListener('click', () => {
        alert(`Learn more about: ${attractions[index].name}\n\n${attractions[index].description}`);
      });
    });

  } catch (error) {
    console.error('Error loading attractions:', error);
    cardsContainer.innerHTML = '<p class="error">Sorry, we could not load the attractions at this time.</p>';
  }
}

// Function to handle visitor message
function displayVisitMessage() {
  const visitMessageElement = document.getElementById('visit-message');
  if (!visitMessageElement) return;
  
  const now = new Date();
  const lastVisit = localStorage.getItem('lastVisit');
  const currentTime = now.getTime();
  
  if (!lastVisit) {
    // First visit
    visitMessageElement.innerHTML = `
      <p>Welcome! Let us know if you have any questions as you explore Harare's attractions.</p>
    `;
  } else {
    const lastVisitTime = parseInt(lastVisit);
    const timeDiff = currentTime - lastVisitTime;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      // Same day visit
      visitMessageElement.innerHTML = `
        <p>Back so soon! Awesome! Let's continue exploring Harare together.</p>
      `;
    } else if (daysDiff === 1) {
      // 1 day ago
      visitMessageElement.innerHTML = `
        <p>You last visited 1 day ago. Welcome back!</p>
      `;
    } else {
      // Multiple days ago
      visitMessageElement.innerHTML = `
        <p>You last visited ${daysDiff} days ago. Welcome back to Harare!</p>
      `;
    }
  }
  
  // Update last visit time
  localStorage.setItem('lastVisit', currentTime.toString());
}

// Function to update footer dates
function updateFooterDates() {
  const currentYear = document.getElementById('current-year');
  const lastModified = document.getElementById('last-modified');
  
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
  
  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }
}

// Mobile menu toggle functionality
function setupMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
      const isExpanded = mainNav.classList.contains('show');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      menuToggle.textContent = isExpanded ? '✕' : '☰';
    });
  }
}

// Function to initialize the page
async function initializePage() {
  await createAttractionCards();
  displayVisitMessage();
  updateFooterDates();
  setupMobileMenu();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}