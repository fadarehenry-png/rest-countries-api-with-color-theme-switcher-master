let allCountries = [];
let isDark = false;

function fmt(n) {
  if (n == null) return 'N/A';
  return n.toLocaleString();
}

function val(v) {
  return v != null && v !== '' ? v : 'N/A';
}

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);
  document.getElementById('theme-label').textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function showHome() {
  document.getElementById('home-page').style.display = 'block';
  document.getElementById('detail-page').style.display = 'none';
  document.getElementById('home-page').classList.add('page');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDetail(country) {
  document.getElementById('home-page').style.display = 'none';
  const dp = document.getElementById('detail-page');
  dp.style.display = 'block';
  dp.classList.add('page');
  window.scrollTo({ top: 0 });

  document.getElementById('detail-flag').src = country.flags?.png || country.flag || '';
  document.getElementById('detail-flag').alt = `Flag of ${country.name}`;
  document.getElementById('detail-name').textContent = country.name;

  const currencies = (country.currencies || []).map(c => c.name).join(', ') || 'N/A';
  const languages = (country.languages || []).map(l => l.name).join(', ') || 'N/A';
  const domains = (country.topLevelDomain || []).join(', ') || 'N/A';
  const callingCodes = (country.callingCodes || []).filter(Boolean).map(c => '+' + c).join(', ') || 'N/A';

  const info = [
    ['Native Name', val(country.nativeName)],
    ['Top Level Domain', domains],
    ['Population', fmt(country.population)],
    ['Currencies', currencies],
    ['Region', val(country.region)],
    ['Languages', languages],
    ['Sub Region', val(country.subregion)],
    ['Capital', val(country.capital)],
  ];

  document.getElementById('detail-info').innerHTML = info.map(([k, v]) =>
    `<div class="detail-item"><strong>${k}: </strong>${v}</div>`
  ).join('');

  const bordersHtml = (country.borders && country.borders.length)
    ? `<span class="borders-label">Border Countries: </span>
       <ul class="borders-list">
         ${country.borders.map(code => {
           const b = allCountries.find(c => c.alpha3Code === code);
           const name = b ? b.name : code;
           return `<li><button class="border-btn" onclick='showDetail(${JSON.stringify(b || { name: name, alpha3Code: code })})'>${name}</button></li>`;
         }).join('')}
       </ul>`
    : '';

  document.getElementById('borders-section').innerHTML = bordersHtml;
}

function filterCountries() {
  const q = document.getElementById('search').value.toLowerCase().trim();
  const region = document.getElementById('region-filter').value;

  const filtered = allCountries.filter(c => {
    const matchQ = !q || c.name.toLowerCase().includes(q) || (c.capital || '').toLowerCase().includes(q);
    const matchR = !region || c.region === region;
    return matchQ && matchR;
  });

  renderGrid(filtered);
  document.getElementById('results-count').textContent =
    filtered.length < allCountries.length ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}` : '';
}

function renderGrid(countries) {
  const grid = document.getElementById('grid');
  if (!countries.length) {
    grid.innerHTML = `<div class="empty-state">
      <div class="emoji">🌍</div>
      <p>No countries found</p>
    </div>`;
    return;
  }

  grid.innerHTML = countries.map(c => {
    const pop = c.population != null ? c.population.toLocaleString() : 'N/A';
    return `<a class="country-card" href="#" onclick="showDetail(${JSON.stringify(c).replace(/'/g, '&#39;').replace(/"/g, '&quot;')}); return false;">
      <img class="card-flag" src="${c.flags?.png || c.flag || ''}" alt="Flag of ${c.name}" loading="lazy" />
      <div class="card-body">
        <h2 class="card-name">${c.name}</h2>
        <p class="card-detail"><strong>Population:</strong> ${pop}</p>
        <p class="card-detail"><strong>Region:</strong> ${c.region || 'N/A'}</p>
        <p class="card-detail"><strong>Capital:</strong> ${c.capital || 'N/A'}</p>
      </div>
    </a>`;
  }).join('');
}

// Load data
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    allCountries = data.sort((a, b) => a.name.localeCompare(b.name));
    filterCountries();
  })
  .catch(() => {
    document.getElementById('grid').innerHTML = `<div class="empty-state">
      <div class="emoji">⚠️</div>
      <p>Could not load country data. Make sure data.json is in the same folder.</p>
    </div>`;
  });