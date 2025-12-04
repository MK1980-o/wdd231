import { attractions } from '../data/attractions.mjs';

// Display visitor message based on last visit
function displayVisitMessage() {
  const visitMessage = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = Date.now();
  
  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = parseInt(lastVisit);
    const daysSinceLastVisit = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastVisit < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysSinceLastVisit === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
    }
  }
  
  // Store current visit date
  localStorage.setItem('lastVisit', currentDate.toString());
}

// Create and display attraction cards
function displayAttractions() {
  const cardsContainer = document.getElementById('cards');
  
  attractions.forEach(attraction => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <h2>${attraction.name}</h2>
      <figure>
        <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
      </figure>
      <address>${attraction.address}</address>
      <p>${attraction.description}</p>
      <button class="learn-more">Learn More</button>
    `;
    
    cardsContainer.appendChild(card);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  displayVisitMessage();
  displayAttractions();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Set last modified date
  document.getElementById('last-modified').textContent = document.lastModified;
});