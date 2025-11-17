// scripts/spotlight.js
async function loadSpotlights(){
  try{
    const res = await fetch('data/members.json');
    const members = await res.json();
    // filter gold or silver
    const eligible = members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);
    if(eligible.length === 0) return;
    // shuffle
    for(let i = eligible.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }
    const count = Math.min(3, Math.max(2, Math.floor(Math.random() * 2) + 2)); // 2 or 3
    const chosen = eligible.slice(0, count);
    const container = document.getElementById('spotlightContainer');
    container.innerHTML = '';
    chosen.forEach(member => {
      const el = document.createElement('div');
      el.className = 'spotlight';
      el.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" style="width:100%;height:140px;object-fit:cover;border-radius:6px;margin-bottom:8px;">
        <h3>${member.name}</h3>
        <p style="margin:6px 0;color:var(--muted)">${member.industry}</p>
        <p style="font-size:0.95rem">${member.description}</p>
        <p style="margin-top:8px;"><a href="${member.website}" target="_blank" rel="noopener">Visit site</a></p>
      `;
      container.appendChild(el);
    });
  }catch(e){
    console.error('Spotlight load failed', e);
  }
}
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified || 'Unknown';
loadSpotlights();
