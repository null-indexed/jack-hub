// v6 layer (4 Oct 2026): Today view, subject pill counts, per-topic study sheets, PWA.
// Sits on top of hub.js without changing its data.

const MATERIALS = {
  'eng-y9-a-1': ['english-y9-language-techniques', 'Language techniques bank'],
  'eng-y9-s-1': ['romeo-and-juliet-familiarisation', 'Romeo and Juliet: familiarisation'],
  'eng-y10-u-1': ['romeo-and-juliet-familiarisation', 'Romeo and Juliet: familiarisation'],
  'eng-y10-a-1': ['an-inspector-calls-familiarisation', 'An Inspector Calls: familiarisation'],
  'eng-y10-s-1': ['power-and-conflict-poems', 'Power and Conflict: the 15 poems'],
  'sci-y9-a-1': ['science-y9-biology-organelles', 'Biology 1.1: Cell organelles'],
  'sci-y9-a-2': ['science-y9-chemistry-particles', 'Chemistry 1.1: The particle model'],
  'sci-y9-a-3': ['science-y9-physics-particles', 'Physics 1.1: Particles and density'],
  'rs-y9-a-1': ['rs-y9-life-after-death', 'What happens when we die?'],
  'dt-y9-s-1': ['dt-y9-metal-skills', 'Metal skills'],
  'it-y9-a-1': ['it-y9-spreadsheets', 'Advanced spreadsheets'],
};

function y9Topics(s) {
  if (!s.years) return [];
  return s.years.filter(y => y.name === 'Year 9').flatMap(y => y.terms.flatMap(t => t.topics));
}
function scopedTopics(s) {
  if (!s.years) return [];
  const ys = currentView === 'y9' ? s.years.filter(y => y.name === 'Year 9') : s.years;
  return ys.flatMap(y => y.terms.flatMap(t => t.topics));
}
function currentTopic(s) {
  const t = y9Topics(s);
  return t.find(x => getStatus(x.id, x.status) === 'learning')
      || t.find(x => getStatus(x.id, x.status) !== 'done')
      || null;
}

function updatePills() {
  document.querySelectorAll('.subject-pill').forEach(p => {
    const s = subjects[p.dataset.subject];
    const all = scopedTopics(s);
    const done = all.filter(t => getStatus(t.id, t.status) === 'done').length;
    p.innerHTML = `${s.name}${all.length ? ` <span class="pill-count">${done}/${all.length}</span>` : ''}`;
  });
}

function renderToday() {
  let el = document.getElementById('today');
  if (!el) {
    el = document.createElement('section');
    el.id = 'today';
    el.className = 'today';
    document.getElementById('subjectTabs').before(el);
  }
  const cards = Object.keys(subjects).map(key => {
    const s = subjects[key];
    const t = currentTopic(s);
    if (!t) return '';
    const st = getStatus(t.id, t.status);
    const mat = MATERIALS[t.id] ? '<span class="today-sheet">Study sheet</span>' : '';
    return `<button class="today-card" data-subject="${key}" data-topic="${t.id}">
      <span class="today-subject">${s.name}</span>
      <span class="today-topic">${t.name}</span>
      <span class="today-meta"><span class="today-status" data-status="${st}">${st === 'learning' ? 'Learning now' : 'Up next'}</span>${mat}</span>
    </button>`;
  }).join('');
  el.innerHTML = `<h2 class="today-title">Today</h2><div class="today-grid">${cards}</div>`;
  el.querySelectorAll('.today-card').forEach(c => c.addEventListener('click', () => {
    selectSubject(c.dataset.subject);
    const topic = y9Topics(subjects[c.dataset.subject]).find(x => x.id === c.dataset.topic);
    if (topic) openDetail(topic);
  }));
}

const _renderSubject = renderSubject;
renderSubject = function () {
  _renderSubject();
  updatePills();
  renderToday();
};

const _openDetail = openDetail;
openDetail = function (topic) {
  _openDetail(topic);
  const m = MATERIALS[topic.id];
  if (m) {
    const box = document.createElement('a');
    box.className = 'sheet-link';
    box.href = `materials/${m[0]}.html`;
    box.innerHTML = `<span class="sheet-eyebrow">Study sheet</span><span class="sheet-title">${m[1]}</span><span class="sheet-hint">Tasks, self-test questions and where to check. Try first, then check.</span>`;
    detailEl.querySelector('.detail-actions').after(box);
  }
};

// Re-render once so the wrapped versions draw the first screen.
renderSubject();

const eb = document.getElementById('eyebrowText');
if (eb) eb.textContent = 'v6 · 4 October 2026';

const vt = document.querySelector('.view-toggle');
if (vt) {
  const r = document.createElement('a');
  r.className = 'view-btn resources-link';
  r.href = 'materials/resources.html';
  r.textContent = 'Resources';
  vt.appendChild(r);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
