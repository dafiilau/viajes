
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const state = {
  currentUser: null,
  currentProfile: null,
  trips: [],
  users: [],
  savedTrips: [],
  route: "splash",
  authMode: "login",
  selectedType: "Todos",
  activeTripId: null,
  useLocalStorage: true,
  filters: {
    search: "",
    continent: "all",
    country: "",
    city: "",
    duration: "all",
    budget: 8000,
    experience: "all"
  }
};

const tripTypes = ["Todos", "Solo", "Pareja", "Amigos", "Familia", "Low Cost", "Lujo"];

/* --- FIX DE CATEGORIAS (SIN SIMBOLOS RAROS) --- */
const homeCategories = [
  { title: "Low Budget", query: "low cost", symbol: "", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=80" },
  { title: "Europa", query: "europa", symbol: "", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=700&q=80" },
  { title: "Playa", query: "playa", symbol: "", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80" },
  { title: "Escapadas cortas", query: "escapada corta", symbol: "", image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=700&q=80" },
  { title: "Con amigos", query: "amigos", symbol: "", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80" },
  { title: "Gastronomía", query: "gastronomia", symbol: "", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80" }
];

const countryMeta = {
  portugal: { continent: "europa", tags: ["europa", "ciudad", "cultura", "escapada"] },
  argentina: { continent: "america", tags: ["america", "naturaleza", "aventura", "low budget"] },
  mexico: { continent: "america", tags: ["america", "playa", "gastronomia", "cultura"] },
  francia: { continent: "europa", tags: ["europa", "cultura", "ciudad", "romantico"] },
  japon: { continent: "asia", tags: ["asia", "ciudad", "gastronomia", "cultura"] },
  espana: { continent: "europa", tags: ["europa", "ciudad", "cultura", "low budget"] },
  italia: { continent: "europa", tags: ["europa", "cultura", "gastronomia", "familia"] },
  "reino unido": { continent: "europa", tags: ["europa", "ciudad", "museos", "amigos"] },
  "paises bajos": { continent: "europa", tags: ["europa", "ciudad", "pareja"] },
  alemania: { continent: "europa", tags: ["europa", "cultura", "historia", "solo"] },
  "republica checa": { continent: "europa", tags: ["europa", "low budget", "cultura"] },
  austria: { continent: "europa", tags: ["europa", "familia", "cultura"] },
  turquia: { continent: "asia", tags: ["asia", "europa", "gastronomia", "cultura"] },
  marruecos: { continent: "africa", tags: ["africa", "cultura", "pareja"] },
  egipto: { continent: "africa", tags: ["africa", "aventura", "historia"] },
  "emiratos arabes": { continent: "asia", tags: ["asia", "lujo", "ciudad"] },
  indonesia: { continent: "asia", tags: ["asia", "naturaleza", "playa", "solo"] },
  tailandia: { continent: "asia", tags: ["asia", "low budget", "gastronomia", "naturaleza"] },
  vietnam: { continent: "asia", tags: ["asia", "low budget", "gastronomia"] },
  "corea del sur": { continent: "asia", tags: ["asia", "ciudad", "amigos"] },
  singapur: { continent: "asia", tags: ["asia", "familia", "gastronomia"] },
  australia: { continent: "oceania", tags: ["oceania", "playa", "pareja"] },
  "nueva zelanda": { continent: "oceania", tags: ["oceania", "aventura", "naturaleza"] },
  "estados unidos": { continent: "america", tags: ["america", "ciudad", "playa", "familia"] },
  colombia: { continent: "america", tags: ["america", "playa", "ciudad", "amigos"] },
  peru: { continent: "america", tags: ["america", "gastronomia", "aventura", "cultura"] },
  chile: { continent: "america", tags: ["america", "naturaleza", "ciudad", "aventura"] },
  uruguay: { continent: "america", tags: ["america", "escapada corta", "ciudad"] },
  brasil: { continent: "america", tags: ["america", "playa", "familia", "amigos"] }
};

const storageKeys = {
  users: "viajesReales.users",
  trips: "viajesReales.trips",
  session: "viajesReales.sessionUid"
};

const fallbackImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=82",
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=82"
];

function imageForDestination(destination = "travel") {
  const key = destination.toLowerCase();
  if (key.includes("lisboa") || key.includes("portugal")) return "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?auto=format&fit=crop&w=900&q=82";
  if (key.includes("bariloche") || key.includes("argentina")) return "https://images.unsplash.com/photo-1577801599718-f4e3ad3fc794?auto=format&fit=crop&w=900&q=82";
  if (key.includes("tulum") || key.includes("mexico") || key.includes("méxico")) return "https://images.unsplash.com/photo-1504730655501-24c39ac53f0e?auto=format&fit=crop&w=900&q=82";
  if (key.includes("paris") || key.includes("parís")) return "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=82";
  if (key.includes("tokio") || key.includes("japon") || key.includes("japón")) return "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=82";

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % fallbackImages.length;
  return fallbackImages[index];
}

// Seed data removed from frontend. Handled by /api/_lib/mongodb.js

const icons = {
  plane: '<svg viewBox="0 0 24 24" fill="none"><path d="M10.5 13.5 3 21l3.5-8.5L3 9l8.5 3.5L19 5c.9-.9 2.4-.9 3.3 0s.9 2.4 0 3.3l-7.5 7.5L18 21l-7.5-3.5L7 21l3.5-7.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none"><path d="M20.8 5.7a5.1 5.1 0 0 0-7.2 0L12 7.3l-1.6-1.6a5.1 5.1 0 0 0-7.2 7.2L12 21l8.8-8.1a5.1 5.1 0 0 0 0-7.2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16v13H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M18 11h3v5h-3a2.5 2.5 0 0 1 0-5ZM4 7l12-4v4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 11V5h8v6M4 19v-8h16a3 3 0 0 1 3 3v5M4 15h19M4 19v-2M20 19v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  note: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 3v4h4M9 12h6M9 16h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

function avatarFor(name = "Viajero") {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "VR";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#2f74ff"/>
          <stop offset="1" stop-color="#0e2344"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="34" fill="url(#g)"/>
      <circle cx="91" cy="28" r="16" fill="rgba(255,255,255,.18)"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial" font-size="38" font-weight="800" fill="#fff">${initials}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}



function money(value) {
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function tripLocation(trip) {
  const parts = String(trip.destination || "").split(",").map((part) => part.trim()).filter(Boolean);
  const city = parts[0] || trip.destination || "";
  const country = parts.length > 1 ? parts[parts.length - 1] : city;
  const normalizedCountry = normalizeText(country);
  const meta = countryMeta[normalizedCountry] || { continent: "america", tags: [] };
  return {
    city,
    country,
    continent: meta.continent,
    tags: [...meta.tags, normalizeText(city), normalizedCountry, normalizeText(trip.type), normalizeText(trip.experience)]
  };
}

function searchableTripText(trip) {
  const location = tripLocation(trip);
  const recommendations = (trip.recommendations || []).map((rec) => rec.text).join(" ");
  const duration = Number(trip.duration || 0);
  const durationTags = duration <= 4 ? "escapada corta fin de semana" : duration >= 11 ? "viaje largo" : "viaje medio";
  return normalizeText([
    trip.destination,
    location.city,
    location.country,
    location.continent,
    location.tags.join(" "),
    durationTags,
    trip.username,
    trip.type,
    trip.experience,
    trip.accommodation,
    trip.transport,
    trip.notes,
    recommendations
  ].join(" "));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function renderStaticViews() {
  $("#homeView").innerHTML = `
    <header class="app-header">
      <div class="hello">
        <p class="eyebrow" id="todayText">Buen viaje</p>
        <h2 id="homeGreeting">Hola, viajero</h2>
      </div>
      <button class="avatar-button" data-route="profile" aria-label="Abrir perfil"><img id="headerAvatar" alt="Avatar de usuario" /></button>
    </header>

    <article class="home-hero">
      <div class="hero-actions">
        <span class="hero-chip">Experiencias reales</span>
        <button class="hero-chip hero-chip-primary" type="button" data-route="explore">Explorar</button>
      </div>
      <div>
        <h1>Viajá mejor con historias reales</h1>
        <p>Presupuestos, decisiones y recomendaciones concretas compartidas por otros viajeros.</p>
      </div>
    </article>

    <div class="section-title">
      <h2>Categorías para inspirarte</h2>
      <button class="link-button" type="button" data-route="explore">Ver todo</button>
    </div>
    <section id="categoryGrid" class="category-grid"></section>

    <div class="section-title">
      <h2>Trending ahora</h2>
      <button class="link-button" type="button" data-route="explore">Filtrar</button>
    </div>
    <section id="trendingRail" class="trip-rail"></section>

    <div class="section-title">
      <h2>Populares</h2>
    </div>
    <section id="popularGrid" class="masonry-grid"></section>

    <div class="section-title">
      <h2>Recomendación destacada</h2>
    </div>
    <section id="highlightRecommendation"></section>

    <div class="section-title">
      <h2>Recientes</h2>
      <span class="eyebrow">Nuevas experiencias</span>
    </div>
    <section id="recentRail" class="trip-rail"></section>
  `;

  $("#exploreView").innerHTML = `
    <header class="explore-intro">
      <h1>Encontrá el viaje que encaja con tu plan</h1>
    </header>

    <label class="search-bar" for="searchInput">
      <svg viewBox="0 0 24 24" fill="none"><path d="m21 21-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <input id="searchInput" type="search" placeholder="Buscar Europa, playa, low cost..." />
    </label>

    <section class="filters-panel" aria-label="Filtros avanzados">
      <div class="filter-row">
        <div class="filter-card">
          <label for="continentFilter">Continente</label>
          <select id="continentFilter">
            <option value="all">Todos</option>
            <option value="europa">Europa</option>
            <option value="america">América</option>
            <option value="asia">Asia</option>
            <option value="africa">África</option>
            <option value="oceania">Oceanía</option>
          </select>
        </div>
        <div class="filter-card">
          <label for="countryFilter">País</label>
          <input id="countryFilter" type="text" placeholder="Italia, México..." />
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-card">
          <label for="cityFilter">Ciudad</label>
          <input id="cityFilter" type="text" placeholder="Roma, Lima..." />
        </div>
        <div class="filter-card">
          <label for="durationFilter">Duración</label>
          <select id="durationFilter">
            <option value="all">Cualquier duración</option>
            <option value="short">1 a 4 días</option>
            <option value="medium">5 a 10 días</option>
            <option value="long">11+ días</option>
          </select>
        </div>
      </div>
      <div class="filter-card full">
        <label for="budgetRange">Rango de presupuesto</label>
        <div class="range-wrap">
          <div class="range-value"><span>Hasta</span><strong id="budgetValue">US$ 8.000</strong></div>
          <input id="budgetRange" type="range" min="250" max="8000" step="250" value="8000" />
        </div>
      </div>
      <div class="filter-card full">
        <label>Tipo de viaje</label>
        <div id="typePills" class="pills"></div>
      </div>
      <div class="filter-card full">
        <label for="experienceFilter">Tipo de experience</label>
        <select id="experienceFilter">
          <option value="all">Todas las experiencias</option>
          <option value="playa">Playa</option>
          <option value="ciudad">Ciudad</option>
          <option value="naturaleza">Naturaleza</option>
          <option value="gastronomia">Gastronomía</option>
          <option value="aventura">Aventura</option>
          <option value="cultura">Cultura</option>
        </select>
      </div>
      <button id="resetFilters" class="btn btn-soft" type="button">Limpiar filtros</button>
    </section>

    <div class="section-title">
      <h2>Resultados</h2>
      <span class="eyebrow" id="resultsCount">0 resultados</span>
    </div>
    <section id="tripList" class="trip-list" aria-live="polite"></section>
  `;

  $("#savedView").innerHTML = `
    <header class="top-actions">
      <button class="icon-button" data-route="home" aria-label="Volver"><svg viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <h2>Favoritos</h2>
    </header>
    <section id="savedList" class="saved-grid"></section>
  `;
}

function showView(route) {
  state.route = route;
  $$(".view, .splash-view").forEach((view) => view.classList.remove("active-view"));
  const view = $(`#${route}View`);
  if (view) {
    view.classList.add("active-view");
    view.scrollTop = 0;
  }

  const appRoutes = ["home", "explore", "saved", "profile"];
  $("#bottomNav").classList.toggle("is-visible", appRoutes.includes(route));
  $("#fabCreate").classList.toggle("is-visible", route === "home");
  $$(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.route === route));

  if (route === "profile") renderProfile();
  if (route === "saved") renderSaved();
  if (route === "explore") renderTrips();
  if (view) requestAnimationFrame(() => { view.scrollTop = 0; });
}

async function fetchTrips() {
  try {
    const res = await fetch('/api/trips');
    if (res.ok) state.trips = await res.json();
  } catch (e) { console.error('Error fetching trips:', e); }
}

async function fetchUsers() {
  try {
    const res = await fetch('/api/users');
    if (res.ok) state.users = await res.json();
  } catch (e) { console.error('Error fetching users:', e); }
}

async function initAuth() {
  await Promise.all([fetchTrips(), fetchUsers()]);

  const sessionUid = localStorage.getItem(storageKeys.session);
  if (sessionUid) {
    try {
      const res = await fetch('/api/auth?uid=' + sessionUid);
      if (res.ok) {
        const profile = await res.json();
        setSession(profile);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  showView("auth");
}

function setSession(profile) {
  state.currentUser = {
    uid: profile.uid,
    email: profile.email,
    displayName: profile.username,
    photoURL: profile.avatar
  };
  state.currentProfile = profile;
  state.savedTrips = profile.savedTrips || [];
  localStorage.setItem(storageKeys.session, profile.uid);
  renderAll();
  showView("home");
}

function logoutUser() {
  localStorage.removeItem(storageKeys.session);
  state.currentUser = null;
  state.currentProfile = null;
  state.savedTrips = [];
  showView("auth");
}



function renderAll() {
  renderHeader();
  renderTypePills();
  renderHome();
  renderTrips();
  renderSaved();
  renderProfile();
  renderPreview();
}

function renderHeader() {
  const profile = state.currentProfile;
  const name = profile?.username || state.currentUser?.displayName || "viajero";
  $("#homeGreeting").textContent = `Hola, ${name.split(" ")[0]}`;
  $("#headerAvatar").src = profile?.avatar || avatarFor(name);
  $("#todayText").textContent = new Intl.DateTimeFormat("es-UY", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
}

function renderHome() {
  const trips = [...state.trips];
  const trending = trips.filter((trip) => Number(trip.budget) <= 1400).slice(0, 8);
  const popular = trips.filter((trip) => ["playa", "ciudad", "gastronomia"].includes(trip.experience)).slice(0, 6);
  const recent = trips.slice(0, 8);
  const highlight = trips.find((trip) => (trip.recommendations || []).some((rec) => rec.kind === "positive")) || trips[0];

  $("#categoryGrid").innerHTML = homeCategories.map((category) => `
    <button class="category-card" type="button" data-category-query="${escapeHTML(category.query)}" style="background-image:url('${category.image}')">
      <span>${escapeHTML(category.symbol)}</span>
      <strong>${escapeHTML(category.title)}</strong>
    </button>
  `).join("");

  $("#trendingRail").innerHTML = trending.map(renderSpotlightCard).join("");
  $("#popularGrid").innerHTML = popular.map((trip, index) => renderMiniTripCard(trip, index % 3 === 0)).join("");
  $("#recentRail").innerHTML = recent.map(renderSpotlightCard).join("");

  if (highlight) {
    const rec = (highlight.recommendations || []).find((item) => item.kind === "positive") || highlight.recommendations?.[0];
    $("#highlightRecommendation").innerHTML = `
      <article class="recommendation-spotlight" data-open-trip="${highlight.id}">
        <p>“${escapeHTML(rec?.text || highlight.notes || "Una experiencia real para planificar mejor.")}”</p>
        <span class="eyebrow">${escapeHTML(highlight.destination)} · ${escapeHTML(highlight.username)}</span>
      </article>
    `;
  } else {
    $("#highlightRecommendation").innerHTML = renderEmpty("Sin recomendaciones todavía", "Cuando haya viajes publicados, las mejores recomendaciones aparecen acá.");
  }
}

function renderSpotlightCard(trip) {
  return `
    <article class="spotlight-card" data-open-trip="${trip.id}" style="background-image:url('${trip.image || imageForDestination(trip.destination)}')">
      <h3>${escapeHTML(trip.destination)}</h3>
      <p>${escapeHTML(trip.username || "Viajero real")}</p>
      <div class="spotlight-meta">
        <span>${money(trip.budget)}</span>
        <span>${Number(trip.duration || 0)} días</span>
        <span>${escapeHTML(trip.type || "Viaje")}</span>
      </div>
    </article>
  `;
}

function renderMiniTripCard(trip, tall = false) {
  return `
    <article class="mini-trip-card ${tall ? "tall" : ""}" data-open-trip="${trip.id}">
      <div class="mini-trip-image"><img src="${trip.image || imageForDestination(trip.destination)}" alt="${escapeHTML(trip.destination)}" loading="lazy" /></div>
      <div class="mini-trip-body">
        <h3>${escapeHTML(trip.destination)}</h3>
        <p>${money(trip.budget)} · ${Number(trip.duration || 0)} días · ${escapeHTML(trip.type || "Viaje")}</p>
      </div>
    </article>
  `;
}

function renderTypePills() {
  if (!$("#typePills")) return;
  $("#typePills").innerHTML = tripTypes.map((type) => `
    <button class="pill ${state.selectedType === type ? "is-active" : ""}" type="button" data-type="${type}">${type}</button>
  `).join("");
}

function filteredTrips() {
  const search = normalizeText(state.filters.search);
  const country = normalizeText(state.filters.country);
  const city = normalizeText(state.filters.city);
  const budget = Number(state.filters.budget);

  const isFilterActive = search || state.filters.continent !== "all" || country || city || state.filters.duration !== "all" || budget < 8000 || state.selectedType !== "Todos" || state.filters.experience !== "all";

  if (!isFilterActive) return state.trips;

  const scoredTrips = state.trips.map((trip) => {
    let score = 0;
    const text = searchableTripText(trip);
    const location = tripLocation(trip);
    const duration = Number(trip.duration || 0);
    const durationOk =
      state.filters.duration === "all" ||
      (state.filters.duration === "short" && duration <= 4) ||
      (state.filters.duration === "medium" && duration >= 5 && duration <= 10) ||
      (state.filters.duration === "long" && duration >= 11);

    if (search && text.includes(search)) score += 10;
    if (state.filters.continent !== "all" && location.continent === state.filters.continent) score += 3;
    if (country && normalizeText(location.country).includes(country)) score += 5;
    if (city && normalizeText(location.city).includes(city)) score += 5;
    if (budget < 8000 && Number(trip.budget || 0) <= budget) score += 3;
    if (state.filters.duration !== "all" && durationOk) score += 3;
    if (state.selectedType !== "Todos" && trip.type === state.selectedType) score += 4;
    if (state.filters.experience !== "all" && trip.experience === state.filters.experience) score += 4;

    return { trip, score };
  });

  return scoredTrips
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.trip);
}

function renderTrips() {
  if (!$("#tripList")) return;
  const trips = filteredTrips();
  $("#resultsCount").textContent = `${trips.length} resultado${trips.length === 1 ? "" : "s"}`;
  $("#tripList").innerHTML = trips.length
    ? trips.map(renderTripCard).join("")
    : renderEmpty("No encontramos viajes tan específicos", "Probá ampliar presupuesto, duración o tipo de experiencia.");
}

function renderTripCard(trip) {
  const saved = state.savedTrips.includes(trip.id);
  const positives = (trip.recommendations || []).filter((rec) => rec.kind === "positive").length;
  return `
    <article class="trip-card" data-trip-id="${trip.id}">
      <div class="trip-image">
        <img src="${trip.image || imageForDestination(trip.destination)}" alt="${escapeHTML(trip.destination)}" loading="lazy" />
        <button class="save-btn ${saved ? "is-saved" : ""}" type="button" data-save="${trip.id}" aria-label="Guardar viaje">${icons.heart}</button>
      </div>
      <div class="trip-body" data-open-trip="${trip.id}">
        <div class="trip-top">
          <div>
            <h3>${escapeHTML(trip.destination)}</h3>
            <p class="trip-author" data-user-profile="${trip.userId}" style="cursor:pointer; display:inline-block">Publicado por ${escapeHTML(trip.username || "Viajero real")}</p>
          </div>
          <span class="budget-chip">${money(trip.budget)}</span>
        </div>
        <div class="meta-grid">
          <div class="meta"><span>Duración</span>${Number(trip.duration || 0)} días</div>
          <div class="meta"><span>Tipo</span>${escapeHTML(trip.type || "Viaje")}</div>
          <div class="meta"><span>Recomienda</span>${positives} tips</div>
        </div>
      </div>
    </article>
  `;
}

function renderEmpty(title, text) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icons.plane}</div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  `;
}

function renderSaved() {
  if (!$("#savedList")) return;
  const trips = state.trips.filter((trip) => state.savedTrips.includes(trip.id));
  $("#savedList").innerHTML = trips.length
    ? trips.map((trip, index) => renderMiniTripCard(trip, index % 3 === 0)).join("")
    : renderEmpty("Todavía no agregaste favoritos", "Usá el corazón en las cards para armar tu lista de inspiración.");
}

function renderDetail(tripId) {
  const trip = state.trips.find((item) => item.id === tripId);
  if (!trip) return;
  state.activeTripId = tripId;
  const recs = trip.recommendations || [];
  const positive = recs.filter((rec) => rec.kind === "positive");
  const negative = recs.filter((rec) => rec.kind === "negative");
  const stayBudget = Math.round(Number(trip.budget || 0) * 0.42);
  const transportBudget = Math.round(Number(trip.budget || 0) * 0.22);
  const foodBudget = Math.max(0, Number(trip.budget || 0) - stayBudget - transportBudget);
  const creator = state.users.find((user) => user.uid === trip.userId) || {
    uid: trip.userId,
    username: trip.username || "Viajero real",
    avatar: avatarFor(trip.username || "Viajero real"),
    followers: []
  };
  const isOwnTrip = creator.uid === state.currentUser?.uid;
  const isFollowingCreator = (state.currentProfile?.following || []).includes(creator.uid);

  $("#detailView").innerHTML = `
    <div class="detail-hero">
      <img src="${trip.image || imageForDestination(trip.destination)}" alt="${escapeHTML(trip.destination)}" />
      <button class="back-float" data-route="home" type="button" aria-label="Volver"><svg viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="detail-overlay">
        <h1>${escapeHTML(trip.destination)}</h1>
        <p>${escapeHTML(trip.username || "Viajero real")} compartió un viaje de ${Number(trip.duration || 0)} días</p>
      </div>
    </div>

    <div class="stats-strip">
      <div class="stat-card"><strong>${money(trip.budget)}</strong><span>Presupuesto</span></div>
      <div class="stat-card"><strong>${Number(trip.duration || 0)} días</strong><span>Duración</span></div>
      <div class="stat-card"><strong>${escapeHTML(trip.type || "Viaje")}</strong><span>Tipo</span></div>
    </div>

    <article class="traveler-card" data-user-profile="${creator.uid}" style="cursor:pointer">
      <div class="avatar-wrap"><img class="avatar" src="${creator.avatar || avatarFor(creator.username)}" alt="${escapeHTML(creator.username)}" /></div>
      <div>
        <h4>${escapeHTML(creator.username)}</h4>
        <p>${(creator.followers || []).length} seguidores · creador del viaje</p>
      </div>
      ${isOwnTrip ? "" : `<button class="follow-btn ${isFollowingCreator ? "is-following" : ""}" data-follow="${creator.uid}" type="button">${isFollowingCreator ? "Siguiendo" : "Seguir"}</button>`}
    </article>

    <section class="content-card">
      <div class="card-heading"><span class="round-icon">${icons.bed}</span><h3>Hospedaje</h3></div>
      <p class="eyebrow">${escapeHTML(trip.accommodation || "Sin detalle de hospedaje.")}</p>
    </section>

    <section class="content-card">
      <div class="card-heading"><span class="round-icon">${icons.wallet}</span><h3>Breakdown de gastos</h3></div>
      ${renderExpense("Hospedaje", stayBudget, trip.budget, "var(--blue)")}
      ${renderExpense("Transporte", transportBudget, trip.budget, "var(--amber)")}
      ${renderExpense("Comida y extras", foodBudget, trip.budget, "var(--green)")}
    </section>

    <section class="content-card">
      <div class="card-heading"><span class="round-icon">${icons.plane}</span><h3>Transporte</h3></div>
      <p class="eyebrow">${escapeHTML(trip.transport || "Sin detalle de transporte.")}</p>
    </section>

    <section class="content-card">
      <div class="card-heading"><span class="round-icon">${icons.heart}</span><h3>Recomendaciones positivas</h3></div>
      <div class="recommendation-list">${positive.length ? positive.map((rec) => renderRecommendation(rec)).join("") : "<p class='eyebrow'>No agregó recomendaciones positivas.</p>"}</div>
    </section>

    <section class="content-card">
      <div class="card-heading"><span class="round-icon">${icons.note}</span><h3>No recomiendo</h3></div>
      <div class="recommendation-list">${negative.length ? negative.map((rec) => renderRecommendation(rec)).join("") : "<p class='eyebrow'>No agregó advertencias.</p>"}</div>
    </section>

    <section class="content-card">
      <div class="card-heading"><span class="round-icon">${icons.note}</span><h3>Notas reales</h3></div>
      <p class="eyebrow">${escapeHTML(trip.notes || "Sin notas adicionales.")}</p>
    </section>
  `;

  showView("detail");
}

function renderExpense(label, amount, total, color) {
  const width = total ? Math.min(100, Math.round((amount / total) * 100)) : 0;
  return `
    <div class="expense-row">
      <div class="expense-label"><span>${label}</span><strong>${money(amount)}</strong></div>
      <div class="bar"><span style="width:${width}%;background:${color}"></span></div>
    </div>
  `;
}

function renderRecommendation(rec) {
  const label = rec.kind === "positive" ? "👍" : "👎";
  return `<div class="rec-item ${rec.kind === "positive" ? "positive" : "negative"}"><span>${label}</span><span>${escapeHTML(rec.text)}</span></div>`;
}

function renderOtherProfile(userId) {
  if (userId === state.currentUser?.uid) {
    showView("profile");
    return;
  }
  const user = state.users.find((u) => u.uid === userId);
  if (!user) return;

  const userTrips = state.trips.filter((trip) => trip.userId === userId);
  const following = (state.currentProfile?.following || []).includes(userId);

  $("#otherProfileView").innerHTML = `
    <header class="top-actions">
      <button class="icon-button" data-route="home" aria-label="Volver"><svg viewBox="0 0 24 24" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <h2>Perfil de ${escapeHTML(user.username.split(" ")[0])}</h2>
    </header>
    <section class="profile-hero">
      <div class="profile-top">
        <div class="profile-avatar"><img class="avatar" src="${user.avatar || avatarFor(user.username)}" alt="${escapeHTML(user.username)}" /></div>
        <div>
          <h2>${escapeHTML(user.username)}</h2>
          <p>${escapeHTML(user.email || "Viajero real")}</p>
        </div>
      </div>
      <div class="profile-stats">
        <div class="profile-stat"><div><strong>${userTrips.length}</strong><span>Viajes</span></div></div>
        <div class="profile-stat"><div><strong>${(user.followers || []).length}</strong><span>Seguidores</span></div></div>
        <div class="profile-stat"><div><strong>${(user.following || []).length}</strong><span>Seguidos</span></div></div>
      </div>
      <button class="follow-btn ${following ? "is-following" : ""}" data-follow="${user.uid}" type="button" style="width:100%; margin-top:16px; height:46px;">${following ? "Siguiendo" : "Seguir"}</button>
    </section>
    
    <div class="section-title"><h2>Viajes publicados</h2><span class="eyebrow">${userTrips.length} en total</span></div>
    <section class="trip-list">${userTrips.length ? userTrips.map(renderTripCard).join("") : renderEmpty("Sin viajes", "Todavía no compartió ninguna experiencia.")}</section>
  `;
  showView("otherProfile");
}

function renderTravelers() {
  const users = state.users.filter((user) => user.uid !== state.currentUser?.uid);
  $("#travelerList").innerHTML = users.length
    ? users.map((user) => {
      const following = (state.currentProfile?.following || []).includes(user.uid);
      const tripsCount = state.trips.filter((trip) => trip.userId === user.uid).length;
      return `
        <article class="traveler-card" data-user-profile="${user.uid}" style="cursor:pointer">
          <div class="avatar-wrap"><img class="avatar" src="${user.avatar || avatarFor(user.username)}" alt="${escapeHTML(user.username)}" /></div>
          <div>
            <h4>${escapeHTML(user.username)}</h4>
            <p>${tripsCount} viajes reales · ${(user.followers || []).length} seguidores</p>
          </div>
          <button class="follow-btn ${following ? "is-following" : ""}" data-follow="${user.uid}" type="button">${following ? "Siguiendo" : "Seguir"}</button>
        </article>
      `;
    }).join("")
    : renderEmpty("Aún no hay viajeros", "Cuando otras personas se registren, vas a poder seguirlas desde acá.");
}

function renderProfile() {
  const profile = state.currentProfile;
  if (!profile) return;
  const myTrips = state.trips.filter((trip) => trip.userId === state.currentUser?.uid);
  const followedUsers = state.users.filter((user) => (profile.following || []).includes(user.uid));
  $("#profileView").innerHTML = `
    <section class="profile-hero">
      <div class="profile-top">
        <div class="profile-avatar"><img class="avatar" src="${profile.avatar || avatarFor(profile.username)}" alt="${escapeHTML(profile.username)}" /></div>
        <div>
          <h2>${escapeHTML(profile.username)}</h2>
          <p>${escapeHTML(profile.email || "Viajero real")}</p>
        </div>
      </div>
      <div class="profile-stats">
        <div class="profile-stat"><div><strong>${myTrips.length}</strong><span>Viajes</span></div></div>
        <div class="profile-stat"><div><strong>${(profile.followers || []).length}</strong><span>Seguidores</span></div></div>
        <div class="profile-stat"><div><strong>${(profile.following || []).length}</strong><span>Seguidos</span></div></div>
      </div>
    </section>
    <button id="logoutButton" class="btn btn-soft" type="button" style="width:100%;margin-bottom:18px;">Cerrar sesión</button>
    <div class="section-title"><h2>Viajeros que seguís</h2><span class="eyebrow">${followedUsers.length} perfiles</span></div>
    <section>${followedUsers.length ? followedUsers.map((user) => `
      <article class="traveler-card" data-user-profile="${user.uid}" style="cursor:pointer">
        <div class="avatar-wrap"><img class="avatar" src="${user.avatar || avatarFor(user.username)}" alt="${escapeHTML(user.username)}" /></div>
        <div><h4>${escapeHTML(user.username)}</h4><p>${(user.followers || []).length} seguidores</p></div>
        <button class="follow-btn is-following" data-follow="${user.uid}" type="button">Siguiendo</button>
      </article>
    `).join("") : renderEmpty("Todavía no seguís viajeros", "Podés seguir al creador desde el detalle de cualquier viaje.")}</section>
    <div class="section-title"><h2>Mis viajes</h2><span class="eyebrow">${myTrips.length} publicados</span></div>
    <section class="trip-list">${myTrips.length ? myTrips.map(renderTripCard).join("") : renderEmpty("Tu primer viaje espera", "Compartí presupuesto, recomendaciones y notas para ayudar a otros viajeros.")}</section>
  `;
}

function renderPreview() {
  const destination = $("#tripDestination")?.value || "Nuevo destino";
  const duration = $("#tripDuration")?.value || 0;
  const budget = $("#tripBudget")?.value || 0;
  const type = $("#tripType")?.value || "Viaje";
  const recommendations = currentRecommendations().filter((rec) => rec.text.trim());

  $("#tripPreview").innerHTML = `
    <div class="trip-top">
      <div>
        <h3>${escapeHTML(destination)}</h3>
        <p class="trip-author">Por ${escapeHTML(state.currentProfile?.username || "vos")}</p>
      </div>
      <span class="budget-chip">${money(budget)}</span>
    </div>
    <div class="meta-grid">
      <div class="meta"><span>Duración</span>${Number(duration || 0)} días</div>
      <div class="meta"><span>Tipo</span>${escapeHTML(type)}</div>
      <div class="meta"><span>Tips</span>${recommendations.length}</div>
    </div>
  `;
}

function currentRecommendations() {
  return $$(".rec-line").map((line) => ({
    kind: line.querySelector("select").value,
    text: line.querySelector("input").value.trim()
  }));
}

function addRecommendationLine(kind = "positive", text = "") {
  const wrapper = document.createElement("div");
  wrapper.className = "rec-line";
  wrapper.innerHTML = `
    <select aria-label="Tipo de recomendación">
      <option value="positive" ${kind === "positive" ? "selected" : ""}>👍 Recomiendo</option>
      <option value="negative" ${kind === "negative" ? "selected" : ""}>👎 No recomiendo</option>
    </select>
    <input type="text" placeholder="Ej: Comer lejos de la zona turística" value="${escapeHTML(text)}" />
    <button class="tiny-delete" type="button" aria-label="Eliminar recomendación">${icons.trash}</button>
  `;
  $("#recommendationsBuilder").appendChild(wrapper);
}

async function toggleSaved(tripId) {
  if (!state.currentUser) return;
  const alreadySaved = state.savedTrips.includes(tripId);
  
  state.savedTrips = alreadySaved
    ? state.savedTrips.filter((id) => id !== tripId)
    : [...state.savedTrips, tripId];

  if (state.currentProfile) state.currentProfile.savedTrips = state.savedTrips;
  renderHome();
  renderTrips();
  renderSaved();

  try {
    await fetch('/api/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save', userId: state.currentUser.uid, targetId: tripId })
    });
    showToast(alreadySaved ? "Viaje quitado de favoritos." : "Viaje agregado a favoritos.");
  } catch (e) {
    console.error(e);
  }
}

async function toggleFollow(userId) {
  if (!state.currentUser || userId === state.currentUser.uid) return;
  const following = state.currentProfile?.following || [];
  const isFollowing = following.includes(userId);

  state.currentProfile.following = isFollowing
    ? following.filter((id) => id !== userId)
    : [...following, userId];

  const target = state.users.find((user) => user.uid === userId);
  if (target) {
    target.followers = isFollowing
      ? (target.followers || []).filter((id) => id !== state.currentUser.uid)
      : [...(target.followers || []), state.currentUser.uid];
  }

  renderHome();
  renderProfile();
  if (state.route === "detail" && state.activeTripId) renderDetail(state.activeTripId);

  try {
    await fetch('/api/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'follow', userId: state.currentUser.uid, targetId: userId })
    });
  } catch (e) {
    console.error(e);
  }
}

async function createTrip(event) {
  event.preventDefault();
  if (!state.currentUser || !state.currentProfile) return;

  const trip = {
    userId: state.currentUser.uid,
    username: state.currentProfile.username,
    destination: $("#tripDestination").value.trim(),
    duration: Number($("#tripDuration").value),
    budget: Number($("#tripBudget").value),
    type: $("#tripType").value,
    experience: $("#tripExperience").value,
    accommodation: $("#tripAccommodation").value.trim(),
    transport: $("#tripTransport").value.trim(),
    notes: $("#tripNotes").value.trim(),
    recommendations: currentRecommendations().filter((rec) => rec.text),
    image: imageForDestination($("#tripDestination").value)
  };

  try {
    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip)
    });
    const newTrip = await res.json();
    if (res.ok) {
      state.trips = [newTrip, ...state.trips];
      event.target.reset();
      $("#recommendationsBuilder").innerHTML = "";
      addRecommendationLine("positive");
      renderAll();
      showView("home");
      showToast("Viaje publicado y disponible para otros usuarios.");
    }
  } catch (e) {
    showToast("Error al publicar el viaje.");
  }
}

async function handleAuth(event) {
  event.preventDefault();
  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  const username = $("#authName").value.trim();
  const errorBox = $("#authError");
  errorBox.classList.remove("is-visible");

  try {
    const payload = {
      action: state.authMode,
      email,
      password,
      username: state.authMode === "register" ? username : undefined,
      avatar: state.authMode === "register" ? avatarFor(username) : undefined
    };

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error de autenticación");

    setSession(data);
    await fetchUsers(); // Refresh user list
    showToast(state.authMode === "register" ? "Cuenta creada." : "Sesión iniciada.");
  } catch (error) {
    errorBox.textContent = friendlyAuthError(error.message);
    errorBox.classList.add("is-visible");
  }
}

function enableDragToScroll() {
  const sliders = $$('.trip-rail, .pills');
  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      isDragging = false;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      isDragging = true;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
    slider.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  });
}

function friendlyAuthError(code) {
  const errors = {
    "auth/invalid-email": "El email no parece válido.",
    "auth/user-not-found": "No existe una cuenta con ese email.",
    "auth/wrong-password": "La contraseña no coincide.",
    "auth/email-already-in-use": "Ese email ya está registrado.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/invalid-credential": "Credenciales incorrectas. Revisá email y contraseña.",
    "local/missing-name": "Ingresá un nombre para crear tu perfil."
  };
  return errors[code] || "No pudimos completar la acción. Intentá otra vez.";
}

function bindEvents() {
  enableDragToScroll();
  $("#loginTab").addEventListener("click", () => setAuthMode("login"));
  $("#registerTab").addEventListener("click", () => setAuthMode("register"));
  $("#authForm").addEventListener("submit", handleAuth);
  $("#tripForm").addEventListener("submit", createTrip);
  $("#addRecommendation").addEventListener("click", () => {
    addRecommendationLine();
    renderPreview();
  });
  $("#fabCreate").addEventListener("click", () => showView("create"));
  $("#resetFilters").addEventListener("click", resetFilters);

  ["searchInput", "continentFilter", "countryFilter", "cityFilter", "durationFilter", "budgetRange", "experienceFilter"].forEach((id) => {
    $(`#${id}`).addEventListener("input", syncFilters);
  });

  ["tripDestination", "tripDuration", "tripBudget", "tripType", "tripExperience"].forEach((id) => {
    $(`#${id}`).addEventListener("input", renderPreview);
  });

  document.addEventListener("click", async (event) => {
    const routeButton = event.target.closest("[data-route]");
    const openTrip = event.target.closest("[data-open-trip]");
    const saveButton = event.target.closest("[data-save]");
    const followButton = event.target.closest("[data-follow]");
    const userProfile = event.target.closest("[data-user-profile]");
    const deleteRec = event.target.closest(".tiny-delete");
    const typeButton = event.target.closest("[data-type]");
    const categoryButton = event.target.closest("[data-category-query]");
    const logoutButton = event.target.closest("#logoutButton");

    if (routeButton) showView(routeButton.dataset.route);

    if (saveButton) {
      event.stopPropagation();
      await toggleSaved(saveButton.dataset.save);
    }

    if (followButton) {
      event.stopPropagation();
      await toggleFollow(followButton.dataset.follow);
    }

    if (userProfile) {
      event.stopPropagation();
      renderOtherProfile(userProfile.dataset.userProfile);
    } else if (openTrip) {
      renderDetail(openTrip.dataset.openTrip);
    }
    if (deleteRec) {
      deleteRec.closest(".rec-line").remove();
      renderPreview();
    }
    if (typeButton) {
      state.selectedType = typeButton.dataset.type;
      renderTypePills();
      renderTrips();
    }
    if (categoryButton) {
      state.filters.search = categoryButton.dataset.categoryQuery;
      showView("explore");
      const searchInput = $("#searchInput");
      if (searchInput) searchInput.value = state.filters.search;
      renderTrips();
    }
    if (logoutButton) {
      logoutUser();
    }
  });

  $("#recommendationsBuilder").addEventListener("input", renderPreview);
}

function setAuthMode(mode) {
  state.authMode = mode;
  $("#loginTab").classList.toggle("is-active", mode === "login");
  $("#registerTab").classList.toggle("is-active", mode === "register");
  $("#nameField").classList.toggle("hidden", mode === "login");
  $("#authSubmit").textContent = mode === "login" ? "Ingresar" : "Crear cuenta";
  $("#authPassword").autocomplete = mode === "login" ? "current-password" : "new-password";
  $("#authError").classList.remove("is-visible");
}

function syncFilters() {
  state.filters.search = $("#searchInput").value;
  state.filters.continent = $("#continentFilter").value;
  state.filters.country = $("#countryFilter").value;
  state.filters.city = $("#cityFilter").value;
  state.filters.duration = $("#durationFilter").value;
  state.filters.budget = Number($("#budgetRange").value);
  state.filters.experience = $("#experienceFilter").value;
  $("#budgetValue").textContent = money(state.filters.budget);
  renderTrips();
}

function resetFilters() {
  $("#searchInput").value = "";
  $("#continentFilter").value = "all";
  $("#countryFilter").value = "";
  $("#cityFilter").value = "";
  $("#durationFilter").value = "all";
  $("#budgetRange").value = 8000;
  $("#experienceFilter").value = "all";
  state.selectedType = "Todos";
  syncFilters();
  renderTypePills();
}

function boot() {
  window.scrollTo(0, 0);
  $$(".view, .splash-view").forEach((view) => { view.scrollTop = 0; });
  renderStaticViews();
  bindEvents();
  populateDestinations();
  addRecommendationLine("positive");
  addRecommendationLine("negative");
  renderTypePills();
  $("#budgetValue").textContent = money(state.filters.budget);
  setTimeout(initAuth, 900);
}

const popularDestinations = [
  "Buenos Aires, Argentina", "Bariloche, Argentina", "Mendoza, Argentina", "Ushuaia, Argentina", "Córdoba, Argentina", "Salta, Argentina", "Iguazú, Argentina", "Calafate, Argentina",
  "Montevideo, Uruguay", "Punta del Este, Uruguay", "Colonia, Uruguay",
  "Santiago, Chile", "Valparaíso, Chile", "San Pedro de Atacama, Chile", "Torres del Paine, Chile",
  "Lima, Perú", "Cusco, Perú", "Arequipa, Perú", "Máncora, Perú",
  "Río de Janeiro, Brasil", "San Pablo, Brasil", "Florianópolis, Brasil", "Búzios, Brasil", "Salvador, Brasil",
  "Bogotá, Colombia", "Medellín, Colombia", "Cartagena, Colombia", "San Andrés, Colombia",
  "Quito, Ecuador", "Galápagos, Ecuador",
  "Ciudad de México, México", "Cancún, México", "Tulum, México", "Playa del Carmen, México", "Oaxaca, México",
  "Madrid, España", "Barcelona, España", "Sevilla, España", "Valencia, España",
  "París, Francia", "Niza, Francia", "Lyon, Francia",
  "Roma, Italia", "Milán, Italia", "Venecia, Italia", "Florencia, Italia", "Nápoles, Italia",
  "Londres, Reino Unido", "Edimburgo, Reino Unido",
  "Lisboa, Portugal", "Oporto, Portugal",
  "Berlín, Alemania", "Múnich, Alemania",
  "Ámsterdam, Países Bajos",
  "Viena, Austria",
  "Praga, República Checa",
  "Budapest, Hungría",
  "Atenas, Grecia", "Santorini, Grecia",
  "Estambul, Turquía",
  "Nueva York, Estados Unidos", "Miami, Estados Unidos", "Los Ángeles, Estados Unidos", "Orlando, Estados Unidos", "Las Vegas, Estados Unidos",
  "Toronto, Canadá", "Vancouver, Canadá",
  "Tokio, Japón", "Kioto, Japón", "Osaka, Japón",
  "Seúl, Corea del Sur",
  "Pekín, China", "Shanghái, China",
  "Bangkok, Tailandia", "Chiang Mai, Tailandia", "Phuket, Tailandia",
  "Bali, Indonesia",
  "Sídney, Australia", "Melbourne, Australia",
  "Auckland, Nueva Zelanda"
];

function populateDestinations() {
  const datalist = $("#destinations");
  if (!datalist) return;
  datalist.innerHTML = popularDestinations.map(d => `<option value="${d}"></option>`).join('');
}

boot();