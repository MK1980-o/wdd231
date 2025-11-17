// scripts/directory.js
const cardsContainer = document.getElementById('cards');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const filterSelect = document.getElementById('filter-level');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const expanded = mainNav.style.display === 'flex' || mainNav.style.display === '';
  mainNav.style.display = expanded ? 'none' : 'flex';
});

let members = [];

async function loadMembers(){
  try{
    const res = await fetch('data/members.json');
    members = await res.json();
    renderMembers(members);
  }catch(err){
    cardsContainer.innerHTML = `<p style="color:var(--muted)">Failed to load members.</p>`;
    console.error(err);
  }
}

function membershipBadge(level){
  if(level === 3) return `<span class="badge gold" aria-hidden="true">GOLD</span>`;
  if(level === 2) return `<span class="badge silver" aria-hidden="true">SILVER</span>`;
  return `<span class="badge" style="background:#e6f5ea;color:#0b5cff">MEMBER</span>`;
}

function renderMembers(list){
  cardsContainer.innerHTML = '';
  if(!list.length){
    cardsContainer.innerHTML = `<p style="color:var(--muted)">No members found.</p>`;
    return;
  }
  list.forEach(member => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:8px;">
          <h3>${member.name}</h3>
          ${membershipBadge(member.membershipLevel)}
        </div>
        <p style="margin-top:6px;">${member.description}</p>
        <p style="margin-top:8px;color:var(--muted)">${member.industry} • ${member.address}</p>
        <p style="margin-top:6px;"><a href="${member.website}" target="_blank" rel="noopener">Visit website</a> • ${member.phone}</p>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

// view toggles
gridViewBtn.addEventListener('click', () => {
  cardsContainer.className = 'cards-grid';
  gridViewBtn.setAttribute('aria-pressed','true');
  listViewBtn.setAttribute('aria-pressed','false');
});

listViewBtn.addEventListener('click', () => {
  cardsContainer.className = 'cards-grid';
  // switch to 1-column list by setting a CSS var via inline style for simplicity:
  cardsContainer.style.gridTemplateColumns = '1fr';
  listViewBtn.setAttribute('aria-pressed','true');
  gridViewBtn.setAttribute('aria-pressed','false');
});

// filter
filterSelect.addEventListener('change', () => {
  const val = filterSelect.value;
  if(val === 'all') renderMembers(members);
  else renderMembers(members.filter(m => String(m.membershipLevel) === val));
});

// Last modified and year
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified ? document.lastModified : 'Unknown';

loadMembers();
