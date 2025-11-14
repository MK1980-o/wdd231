// Directory page functionality
const memberCards = document.getElementById('member-cards');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');

// Membership level mapping
const membershipLevels = {
    1: { name: 'Member', class: 'member' },
    2: { name: 'Silver', class: 'silver' },
    3: { name: 'Gold', class: 'gold' }
};

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        memberCards.innerHTML = '<p>Error loading member directory. Please try again later.</p>';
    }
}

// Display members in current view
function displayMembers(members) {
    memberCards.innerHTML = '';
    
    members.forEach(member => {
        const card = createMemberCard(member);
        memberCards.appendChild(card);
    });
}

// Create member card element
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    
    const membership = membershipLevels[member.membershipLevel] || membershipLevels[1];
    
    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <span class="membership ${membership.class}">${membership.name}</span>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
        ${member.industry ? `<p><strong>Industry:</strong> ${member.industry}</p>` : ''}
        ${member.description ? `<p>${member.description}</p>` : ''}
    `;
    
    return card;
}

// Toggle between grid and list view
function setView(view) {
    if (view === 'grid') {
        memberCards.className = 'grid-view';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    } else {
        memberCards.className = 'list-view';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    }
}

// Event listeners for view toggle
gridViewBtn.addEventListener('click', () => setView('grid'));
listViewBtn.addEventListener('click', () => setView('list'));

// Initialize directory
document.addEventListener('DOMContentLoaded', () => {
    getMembers();
});