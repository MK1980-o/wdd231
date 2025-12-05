// Configuration
const CONFIG = {
  membersUrl: 'data/members.json',
  defaultView: 'grid',
  localStorageKey: 'directoryView'
};

// State
let members = [];
let filteredMembers = [];
let currentView = localStorage.getItem(CONFIG.localStorageKey) || CONFIG.defaultView;

// DOM Elements
let directoryCards;
let searchInput;
let industryFilter;
let levelFilter;
let gridViewBtn;
let listViewBtn;
let memberCount;
let noResults;

// Utility Functions
function updateMemberCount() {
  if (memberCount) {
    memberCount.textContent = `Showing ${filteredMembers.length} of ${members.length} members`;
  }
}

function showNoResults(show) {
  if (noResults) {
    noResults.style.display = show ? 'block' : 'none';
  }
}

function filterMembers() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const industry = industryFilter ? industryFilter.value : 'all';
  const level = levelFilter ? levelFilter.value : 'all';

  filteredMembers = members.filter(member => {
    // Search filter
    const matchesSearch = !searchTerm ||
      member.name.toLowerCase().includes(searchTerm) ||
      member.industry.toLowerCase().includes(searchTerm) ||
      member.description.toLowerCase().includes(searchTerm);

    // Industry filter
    const matchesIndustry = industry === 'all' || member.industry === industry;

    // Level filter
    const matchesLevel = level === 'all' || member.membershipLevel.toString() === level;

    return matchesSearch && matchesIndustry && matchesLevel;
  });

  return filteredMembers;
}

// View Functions
function renderGridView(members) {
  directoryCards.className = 'cards-grid';
  directoryCards.innerHTML = '';

  if (members.length === 0) {
    showNoResults(true);
    return;
  }

  showNoResults(false);

  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card';
    card.setAttribute('data-membership', member.membershipLabel.toLowerCase());
    
    card.innerHTML = `
      <div class="card-header">
        <span class="membership-badge ${member.membershipLabel.toLowerCase()}">${member.membershipLabel}</span>
        <div class="card-image">
          <img src="${member.image}" alt="${member.name}" loading="lazy" width="300" height="200">
        </div>
      </div>
      <div class="card-content">
        <h3>${member.name}</h3>
        <div class="card-meta">
          <span class="industry">${member.industry}</span>
          <span class="founded">Est. ${member.founded}</span>
        </div>
        <p class="description">${member.description}</p>
        <div class="contact-info">
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
        </div>
      </div>
      <div class="card-footer">
        <a href="${member.website}" target="_blank" rel="noopener" class="website-link">
          Visit Website
        </a>
        <button class="contact-btn" data-member-id="${member.id}">
          Contact
        </button>
      </div>
    `;

    directoryCards.appendChild(card);
  });
}

function renderListView(members) {
  directoryCards.className = 'cards-list';
  directoryCards.innerHTML = '';

  if (members.length === 0) {
    showNoResults(true);
    return;
  }

  showNoResults(false);

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Company</th>
        <th>Industry</th>
        <th>Membership</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${members.map(member => `
        <tr>
          <td>
            <div class="list-company">
              <img src="${member.image}" alt="${member.name}" loading="lazy" width="40" height="40">
              <div>
                <strong>${member.name}</strong>
                <small>${member.address}</small>
              </div>
            </div>
          </td>
          <td>${member.industry}</td>
          <td><span class="membership-badge ${member.membershipLabel.toLowerCase()}">${member.membershipLabel}</span></td>
          <td>${member.phone}</td>
          <td><a href="mailto:${member.email}">${member.email}</a></td>
          <td>
            <button class="view-details" data-member-id="${member.id}">Details</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;

  directoryCards.appendChild(table);
}

function renderMembers() {
  const membersToRender = filterMembers();
  updateMemberCount();

  if (currentView === 'grid') {
    renderGridView(membersToRender);
  } else {
    renderListView(membersToRender);
  }

  // Add event listeners to buttons
  attachButtonListeners();
}

function attachButtonListeners() {
  // Contact buttons in grid view
  document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const memberId = e.target.getAttribute('data-member-id');
      const member = members.find(m => m.id == memberId);
      if (member) {
        alert(`Contact ${member.name}\n\nEmail: ${member.email}\nPhone: ${member.phone}\nAddress: ${member.address}`);
      }
    });
  });

  // View details buttons in list view
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
      const memberId = e.target.getAttribute('data-member-id');
      const member = members.find(m => m.id == memberId);
      if (member) {
        // Create a modal or detailed view
        showMemberDetails(member);
      }
    });
  });
}

function showMemberDetails(member) {
  const modalHTML = `
    <div class="modal-overlay" id="member-modal">
      <div class="modal-content">
        <button class="modal-close" id="close-modal">×</button>
        <div class="modal-header">
          <img src="${member.image}" alt="${member.name}">
          <div>
            <h2>${member.name}</h2>
            <span class="membership-badge ${member.membershipLabel.toLowerCase()}">${member.membershipLabel} Member</span>
            <p class="modal-industry">${member.industry}</p>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <h3>About</h3>
            <p>${member.description}</p>
            <p><strong>Established:</strong> ${member.founded}</p>
            <p><strong>Employees:</strong> ${member.employees}</p>
          </div>
          <div class="modal-section">
            <h3>Contact Information</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          </div>
          <div class="modal-section">
            <h3>Services</h3>
            <ul>
              ${member.services.map(service => `<li>${service}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary" onclick="window.open('${member.website}', '_blank')">Visit Website</button>
          <button class="btn-secondary" onclick="location.href='mailto:${member.email}'">Send Email</button>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal
  const existingModal = document.getElementById('member-modal');
  if (existingModal) existingModal.remove();

  // Add new modal
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Add close functionality
  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('member-modal').remove();
  });

  // Close modal when clicking outside
  document.getElementById('member-modal').addEventListener('click', (e) => {
    if (e.target.id === 'member-modal') {
      e.target.remove();
    }
  });
}

// Event Handlers
function handleViewChange(view) {
  currentView = view;
  localStorage.setItem(CONFIG.localStorageKey, view);
  
  // Update button states
  if (gridViewBtn && listViewBtn) {
    if (view === 'grid') {
      gridViewBtn.classList.add('active');
      gridViewBtn.setAttribute('aria-pressed', 'true');
      listViewBtn.classList.remove('active');
      listViewBtn.setAttribute('aria-pressed', 'false');
    } else {
      listViewBtn.classList.add('active');
      listViewBtn.setAttribute('aria-pressed', 'true');
      gridViewBtn.classList.remove('active');
      gridViewBtn.setAttribute('aria-pressed', 'false');
    }
  }

  renderMembers();
}

function handleFilterChange() {
  renderMembers();
}

// Initialize
async function initializeDirectory() {
  // Get DOM elements
  directoryCards = document.getElementById('directory-cards');
  searchInput = document.getElementById('search-input');
  industryFilter = document.getElementById('filter-industry');
  levelFilter = document.getElementById('filter-level');
  gridViewBtn = document.getElementById('grid-view');
  listViewBtn = document.getElementById('list-view');
  memberCount = document.getElementById('member-count');
  noResults = document.getElementById('no-results');

  // Load members data
  try {
    const response = await fetch(CONFIG.membersUrl);
    if (!response.ok) throw new Error('Failed to load members data');
    members = await response.json();
    filteredMembers = [...members];
  } catch (error) {
    console.error('Error loading members:', error);
    directoryCards.innerHTML = '<p class="error">Unable to load member directory. Please try again later.</p>';
    return;
  }

  // Set up event listeners
  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => handleViewChange('grid'));
    listViewBtn.addEventListener('click', () => handleViewChange('list'));
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleFilterChange);
  }

  if (industryFilter) {
    industryFilter.addEventListener('change', handleFilterChange);
  }

  if (levelFilter) {
    levelFilter.addEventListener('change', handleFilterChange);
  }

  // Set initial view
  handleViewChange(currentView);

  // Update footer
  updateFooter();
}

function updateFooter() {
  // Update current year
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Update last modified
  document.getElementById('last-modified').textContent = document.lastModified;
  
  // Update visitor count
  updateVisitorCount();
}

function updateVisitorCount() {
  const visitorCountEl = document.getElementById('visitor-count');
  if (!visitorCountEl) return;
  
  let count = localStorage.getItem('directoryVisits') || 0;
  count = parseInt(count) + 1;
  localStorage.setItem('directoryVisits', count);
  
  visitorCountEl.textContent = `Page Visits: ${count}`;
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDirectory);
} else {
  initializeDirectory();
}