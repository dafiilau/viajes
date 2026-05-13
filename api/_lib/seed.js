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

const seedUsers = [
  { uid: "seed-user-ana", username: "Ana Camino", email: "ana.camino@viajesreales.app", password: "password123", avatar: avatarFor("Ana Camino"), followers: [], following: [], savedTrips: [] },
  { uid: "seed-user-mateo", username: "Mateo Norte", email: "mateo.norte@viajesreales.app", password: "password123", avatar: avatarFor("Mateo Norte"), followers: [], following: [], savedTrips: [] },
  { uid: "seed-user-lucia", username: "Lucia Rutas", email: "lucia.rutas@viajesreales.app", password: "password123", avatar: avatarFor("Lucia Rutas"), followers: [], following: [], savedTrips: [] },
  { uid: "seed-user-bruno", username: "Bruno Mapa", email: "bruno.mapa@viajesreales.app", password: "password123", avatar: avatarFor("Bruno Mapa"), followers: [], following: [], savedTrips: [] },
  { uid: "seed-user-valen", username: "Valen Sur", email: "valen.sur@viajesreales.app", password: "password123", avatar: avatarFor("Valen Sur"), followers: [], following: [], savedTrips: [] },
  { uid: "seed-user-cami", username: "Cami Costa", email: "cami.costa@viajesreales.app", password: "password123", avatar: avatarFor("Cami Costa"), followers: [], following: [], savedTrips: [] },
  { uid: "seed-user-tomas", username: "Tomas Aire", email: "tomas.aire@viajesreales.app", password: "password123", avatar: avatarFor("Tomas Aire"), followers: [], following: [], savedTrips: [] },
  { uid: "seed-user-sofia", username: "Sofia Andes", email: "sofia.andes@viajesreales.app", password: "password123", avatar: avatarFor("Sofia Andes"), followers: [], following: [], savedTrips: [] }
];

const seedTripsRaw = [
  ["seed-lisboa", "seed-user-ana", "Ana Camino", "Lisboa, Portugal", 7, 1180, "Pareja", "ciudad", "Guesthouse en Alfama, USD 62 por noche. Zona caminable y con buen transporte.", "Metro, tranvías y tren a Sintra.", "Ideal para caminar mucho. Comer temprano ayuda a evitar filas.", "Miradores al atardecer y pasteles de nata en cafeterías chicas.", "No comprar tuk-tuk sin comparar precio."],
  ["seed-bariloche", "seed-user-mateo", "Mateo Norte", "Bariloche, Argentina", 5, 760, "Low Cost", "naturaleza", "Hostel con cocina compartida cerca del centro.", "Colectivos locales y auto alquilado solo un día.", "El presupuesto baja mucho cocinando y eligiendo senderos gratuitos.", "Cerro Llao Llao temprano, vistas enormes sin excursión.", "Evitar taxis al aeropuerto si viajás solo."],
  ["seed-tulum", "seed-user-cami", "Cami Costa", "Tulum, México", 9, 2140, "Amigos", "playa", "Departamento compartido fuera de zona hotelera.", "Bicicletas, vans a cenotes y traslados divididos.", "Llevar efectivo chico y preguntar precios antes.", "Cenotes menos conocidos a primera hora.", "Beach clubs con consumo mínimo alto."],
  ["seed-paris", "seed-user-lucia", "Lucia Rutas", "París, Francia", 6, 1850, "Pareja", "cultura", "Hotel simple cerca de Bastille, pequeño pero bien ubicado.", "Metro con pase semanal y caminatas largas.", "Reservar museos con horario. Comer en boulangeries salva presupuesto.", "Museo de Orsay y picnic junto al Sena.", "No alojarse demasiado lejos para ahorrar poco."],
  ["seed-tokio", "seed-user-bruno", "Bruno Mapa", "Tokio, Japón", 10, 2680, "Solo", "gastronomia", "Hotel cápsula premium en Shinjuku y dos noches en ryokan.", "JR, metro y trenes urbanos con tarjeta Suica.", "La comida de konbini es excelente para ahorrar sin sufrir.", "Ramen de barrio y mercados temprano.", "Evitar moverse en hora pico con valijas."],
  ["seed-madrid", "seed-user-sofia", "Sofia Andes", "Madrid, España", 4, 690, "Low Cost", "ciudad", "Habitación privada en hostal cerca de Lavapiés.", "Metro desde aeropuerto y caminatas.", "Muy buen destino para pocos días y presupuesto controlado.", "Museos en horarios gratuitos y tapas fuera de Sol.", "No comer en terrazas de plazas turísticas."],
  ["seed-roma", "seed-user-ana", "Ana Camino", "Roma, Italia", 5, 980, "Familia", "cultura", "Apartamento con cocina cerca de San Giovanni.", "Metro, buses y caminatas.", "Con chicos conviene comprar entradas anticipadas y bajar ritmo.", "Foro Romano temprano y heladerías artesanales.", "No improvisar Coliseo en temporada alta."],
  ["seed-londres", "seed-user-tomas", "Tomas Aire", "Londres, Reino Unido", 5, 1560, "Amigos", "ciudad", "Hotel compacto en Shoreditch dividido entre tres.", "Underground con Oyster y buses nocturnos.", "Caro, pero muchos museos gratis equilibran el gasto.", "Museos gratis y mercados para comer.", "No subestimar tiempos de traslado."],
  ["seed-amsterdam", "seed-user-valen", "Valen Sur", "Ámsterdam, Países Bajos", 4, 1320, "Pareja", "ciudad", "Hotel pequeño fuera del anillo central.", "Tranvía, tren y bicicletas un día.", "Reservar alojamiento temprano cambia mucho el presupuesto.", "Canales al amanecer y barrios menos céntricos.", "No alquilar bici si no estás cómodo con tráfico."],
  ["seed-berlin", "seed-user-bruno", "Bruno Mapa", "Berlín, Alemania", 6, 990, "Solo", "cultura", "Hostel moderno en Prenzlauer Berg.", "U-Bahn, S-Bahn y caminatas.", "Gran balance entre historia, vida nocturna y precios razonables.", "Tours históricos a pie y comida turca.", "Evitar alojarse lejos del transporte nocturno."],
  ["seed-praga", "seed-user-lucia", "Lucia Rutas", "Praga, República Checa", 4, 620, "Low Cost", "cultura", "Hotel económico cruzando el río.", "Tranvía y caminatas por casco histórico.", "Excelente para presupuesto ajustado si evitás zonas super turísticas.", "Castillo temprano y cerveza local fuera del centro.", "No cambiar dinero en casas del centro."],
  ["seed-viena", "seed-user-sofia", "Sofia Andes", "Viena, Austria", 4, 910, "Familia", "cultura", "Apartamento cerca de estación de metro.", "Metro muy eficiente y tren regional.", "Ordenada y fácil para moverse con familia.", "Palacios, parques y cafeterías clásicas.", "No comprar pases sin calcular museos reales."],
  ["seed-estambul", "seed-user-mateo", "Mateo Norte", "Estambul, Turquía", 7, 880, "Amigos", "gastronomia", "Hotel con desayuno en Sultanahmet.", "Tranvía, ferry y caminatas.", "Comer local y usar ferry hace el viaje mejor y barato.", "Ferry al atardecer y desayunos turcos.", "No aceptar tours callejeros sin revisar."],
  ["seed-marrakech", "seed-user-cami", "Cami Costa", "Marrakech, Marruecos", 5, 720, "Pareja", "cultura", "Riad dentro de la medina con patio.", "Taxis negociados y caminatas.", "La ubicación del riad define la comodidad nocturna.", "Riad tradicional y excursión al Atlas.", "No comprar en zocos sin negociar."],
  ["seed-cairo", "seed-user-tomas", "Tomas Aire", "El Cairo, Egipto", 5, 840, "Solo", "aventura", "Hotel simple cerca de Giza con vista parcial.", "Uber y chofer para pirámides.", "Conviene contratar guías puntuales, no paquetes completos.", "Pirámides temprano y museo egipcio.", "No aceptar ayuda no solicitada en zonas turísticas."],
  ["seed-dubai", "seed-user-valen", "Valen Sur", "Dubái, Emiratos Árabes", 4, 2450, "Lujo", "ciudad", "Hotel 4 estrellas cerca de Marina.", "Metro, taxis y traslados por app.", "Destino caro si buscás experiencias premium.", "Desierto al atardecer y rooftop con reserva.", "No depender solo de taxis en hora pico."],
  ["seed-bali", "seed-user-cami", "Cami Costa", "Bali, Indonesia", 12, 1680, "Solo", "naturaleza", "Guesthouses entre Ubud y Canggu.", "Scooter con seguro y traslados privados.", "Cambiar de zona cada pocos días suma mucho.", "Arrozales temprano y warungs locales.", "No manejar scooter sin experiencia."],
  ["seed-bangkok", "seed-user-bruno", "Bruno Mapa", "Bangkok, Tailandia", 6, 740, "Low Cost", "gastronomia", "Hotel con piscina cerca de BTS.", "BTS, metro, botes y Grab.", "Comer en mercados es barato y muy bueno.", "Street food nocturna y templos temprano.", "Evitar tuk-tuks sin precio cerrado."],
  ["seed-chiang-mai", "seed-user-ana", "Ana Camino", "Chiang Mai, Tailandia", 8, 690, "Solo", "naturaleza", "Guesthouse tranquila dentro de la ciudad vieja.", "Songthaews, caminatas y tours pequeños.", "Más relajado y barato que Bangkok.", "Santuarios éticos y clases de cocina.", "No visitar lugares con animales explotados."],
  ["seed-hanoi", "seed-user-lucia", "Lucia Rutas", "Hanoi, Vietnam", 7, 620, "Low Cost", "gastronomia", "Hotel familiar en Old Quarter.", "Grab, buses y caminatas.", "Excelente valor si comés local y reservás tours con calma.", "Pho de barrio y café con huevo.", "No cruzar la calle dudando."],
  ["seed-seul", "seed-user-sofia", "Sofia Andes", "Seúl, Corea del Sur", 8, 1560, "Amigos", "ciudad", "Hotel moderno en Hongdae.", "Metro, buses y tren al aeropuerto.", "Muy segura, ideal para grupo y comida compartida.", "Barrios nocturnos y mercados de comida.", "No armar días con barrios demasiado separados."],
  ["seed-singapur", "seed-user-tomas", "Tomas Aire", "Singapur", 4, 1280, "Familia", "gastronomia", "Hotel correcto cerca de MRT.", "MRT, buses y caminatas cubiertas.", "Caro para dormir, barato para comer si vas a hawker centers.", "Gardens by the Bay y hawker centers.", "No comer siempre en shoppings caros."],
  ["seed-sydney", "seed-user-valen", "Valen Sur", "Sídney, Australia", 7, 2360, "Pareja", "playa", "Airbnb pequeño cerca de Bondi Junction.", "Tren, buses y ferries.", "Playas y ferries hacen que el gasto valga más.", "Ferry a Manly y caminata Bondi-Coogee.", "No subestimar el precio de restaurantes."],
  ["seed-queenstown", "seed-user-mateo", "Mateo Norte", "Queenstown, Nueva Zelanda", 6, 2850, "Amigos", "aventura", "Hostel premium con cocina compartida.", "Auto alquilado y buses regionales.", "Las actividades son caras, elegir dos fuertes.", "Milford Sound y trekking panorámico.", "No llenar todos los días de actividades pagas."],
  ["seed-nyc", "seed-user-bruno", "Bruno Mapa", "Nueva York, Estados Unidos", 6, 2420, "Amigos", "ciudad", "Hotel pequeño en Queens cerca del metro.", "Metro ilimitado y caminatas.", "Alojarse cerca de línea de metro buena ahorra tiempo.", "Brooklyn al atardecer y museos con reserva.", "No comer siempre en Manhattan turístico."],
  ["seed-miami", "seed-user-cami", "Cami Costa", "Miami, Estados Unidos", 5, 1720, "Familia", "playa", "Departamento con cocina en North Beach.", "Auto alquilado dos días y buses.", "La cocina propia ayuda mucho con presupuesto familiar.", "Playas al norte y Wynwood temprano.", "No estacionar sin revisar carteles."],
  ["seed-cdmx", "seed-user-lucia", "Lucia Rutas", "Ciudad de México, México", 7, 920, "Solo", "gastronomia", "Habitación en Roma Norte.", "Metro, Uber y caminatas por zonas.", "Gran destino para comer increíble con presupuesto medio.", "Tacos, museos y Coyoacán.", "No intentar ver toda la ciudad en pocos días."],
  ["seed-oaxaca", "seed-user-ana", "Ana Camino", "Oaxaca, México", 5, 680, "Pareja", "gastronomia", "Posada local cerca del centro.", "Caminatas y tours compartidos.", "Comida excelente y precios amigables.", "Mercados, mezcal y Hierve el Agua.", "No contratar tours sin revisar tiempos reales."],
  ["seed-cartagena", "seed-user-sofia", "Sofia Andes", "Cartagena, Colombia", 5, 860, "Amigos", "playa", "Hotel boutique pequeño en Getsemaní.", "Taxis por app y lanchas a islas.", "Muy visual, pero islas requieren elegir bien operador.", "Getsemaní de noche e islas Rosario.", "No comprar playa sin preguntar precio final."],
  ["seed-medellin", "seed-user-mateo", "Mateo Norte", "Medellín, Colombia", 6, 780, "Solo", "ciudad", "Hostel con habitación privada en Laureles.", "Metro, cable y apps.", "Cómoda para trabajar remoto y moverse barato.", "Comuna 13 con guía local y cafés.", "No quedarse solo en El Poblado."],
  ["seed-lima", "seed-user-tomas", "Tomas Aire", "Lima, Perú", 4, 730, "Pareja", "gastronomia", "Hotel en Miraflores cerca del malecón.", "Metropolitano, taxis por app y caminatas.", "Destino ideal para comer muy bien en pocos días.", "Cevicherías y Barranco al atardecer.", "No improvisar restaurantes famosos sin reserva."],
  ["seed-cusco", "seed-user-valen", "Valen Sur", "Cusco, Perú", 7, 1240, "Solo", "aventura", "Hostal con calefacción cerca de San Blas.", "Trenes, vans y caminatas.", "Aclimatar dos días mejora todo el viaje.", "Valle Sagrado y caminatas suaves antes de altura.", "No hacer Machu Picchu al día siguiente de llegar."],
  ["seed-santiago", "seed-user-bruno", "Bruno Mapa", "Santiago de Chile, Chile", 4, 640, "Low Cost", "ciudad", "Hotel simple cerca de Providencia.", "Metro, buses y caminatas.", "Muy fácil para escapada corta desde el sur.", "Cerro San Cristóbal y barrios con café.", "No cambiar dinero en aeropuerto salvo mínimo."],
  ["seed-atacama", "seed-user-sofia", "Sofia Andes", "San Pedro de Atacama, Chile", 5, 1380, "Amigos", "naturaleza", "Hostal rústico con buena ubicación.", "Tours compartidos y bicicleta.", "Paisajes increíbles, tours suman rápido.", "Lagunas altiplánicas y valle de la luna.", "No reservar todos los tours sin descanso."],
  ["seed-buenos-aires", "seed-user-ana", "Ana Camino", "Buenos Aires, Argentina", 5, 560, "Low Cost", "cultura", "Departamento chico en Palermo compartido.", "Subte, colectivos y caminatas.", "Gran ciudad para cultura con gasto moderado.", "Teatro, librerías y parrillas de barrio.", "No moverse solo en taxi por costumbre."],
  ["seed-mendoza", "seed-user-mateo", "Mateo Norte", "Mendoza, Argentina", 4, 740, "Pareja", "gastronomia", "Posada cerca de Chacras de Coria.", "Bicis, transfers y auto un día.", "Bodegas conviene reservarlas antes.", "Almuerzo en bodega y bici entre viñedos.", "No manejar después de degustaciones."],
  ["seed-montevideo", "seed-user-lucia", "Lucia Rutas", "Montevideo, Uruguay", 3, 420, "Solo", "ciudad", "Hotel simple en Centro Sur.", "Bus urbano y caminatas por rambla.", "Escapada tranquila con buen ritmo y comida.", "Rambla al atardecer y mercados.", "No esperar vida nocturna todos los días."],
  ["seed-rio", "seed-user-cami", "Cami Costa", "Río de Janeiro, Brasil", 6, 980, "Amigos", "playa", "Departamento en Copacabana dividido entre cuatro.", "Metro, Uber y caminatas de día.", "Playa, miradores y comida por kilo ayudan al presupuesto.", "Ipanema, Pan de Azúcar y atardeceres.", "No llevar objetos llamativos a la playa."],
  ["seed-florianopolis", "seed-user-valen", "Valen Sur", "Florianópolis, Brasil", 7, 820, "Familia", "playa", "Casa pequeña con cocina en Lagoa.", "Auto alquilado para playas.", "Con familia conviene tener cocina y auto.", "Playas del este y mercados locales.", "No elegir alojamiento sin mirar distancias."],
  ["seed-ushuaia", "seed-user-tomas", "Tomas Aire", "Ushuaia, Argentina", 5, 1320, "Solo", "naturaleza", "Hostería sencilla con desayuno.", "Taxis compartidos, excursiones y caminatas.", "Destino caro, pero la naturaleza compensa.", "Parque Nacional y navegación por el canal.", "No ir sin ropa impermeable."],
  ["seed-quito", "seed-user-bruno", "Bruno Mapa", "Quito, Ecuador", 5, 600, "Solo", "cultura", "Hostel céntrico.", "Bus y taxis.", "El centro histórico es hermoso y económico.", "Caminar por el centro.", "Cuidado con la altura al llegar."],
  ["seed-galapagos", "seed-user-lucia", "Lucia Rutas", "Galápagos, Ecuador", 8, 2500, "Pareja", "naturaleza", "Hotel en Santa Cruz.", "Lanchas y caminatas.", "Un paraíso natural único en el mundo.", "Tour a Isla Bartolomé.", "Llevar protector solar ecológico."],
  ["seed-san-andres", "seed-user-mateo", "Mateo Norte", "San Andrés, Colombia", 5, 900, "Amigos", "playa", "Posada cerca del mar.", "Alquiler de mula (carrito).", "El mar de los 7 colores no defrauda.", "Vuelta a la isla en carrito.", "Los precios de la comida en la playa son altos."],
  ["seed-bogota", "seed-user-ana", "Ana Camino", "Bogotá, Colombia", 4, 500, "Solo", "cultura", "Departamento en Chapinero.", "TransMilenio y Uber.", "Gran oferta gastronómica y museos gratis.", "Museo del Oro.", "El clima cambia mucho en un solo día."],
  ["seed-salta", "seed-user-valen", "Valen Sur", "Salta, Argentina", 6, 400, "Familia", "naturaleza", "Cabañas en las afueras.", "Auto propio.", "Los paisajes del norte argentino son increíbles y accesibles.", "Peña folclórica de noche.", "Rutas con muchas curvas, manejar con cuidado."],
  ["seed-iguazu", "seed-user-cami", "Cami Costa", "Iguazú, Argentina", 3, 300, "Pareja", "naturaleza", "Hotel con pileta.", "Colectivos al parque.", "Impactante. Conviene ir temprano para evitar multitudes.", "Garganta del Diablo.", "Llevar ropa que se pueda mojar."],
  ["seed-calafate", "seed-user-tomas", "Tomas Aire", "El Calafate, Argentina", 4, 800, "Solo", "naturaleza", "Hostel rústico.", "Bus al glaciar.", "El glaciar Perito Moreno es algo que hay que ver una vez en la vida.", "Minitrekking en el glaciar.", "Todo es bastante más caro que en el norte del país."],
  ["seed-valparaiso", "seed-user-sofia", "Sofia Andes", "Valparaíso, Chile", 3, 350, "Amigos", "cultura", "Hostel en los cerros.", "Funiculares y caminatas.", "Ciudad muy pintoresca y bohemia.", "Recorrer los murales del Cerro Alegre.", "Tener cuidado de noche en algunas zonas."],
  ["seed-torres-paine", "seed-user-bruno", "Bruno Mapa", "Torres del Paine, Chile", 7, 1200, "Aventura", "naturaleza", "Carpas en los campings del parque.", "Bus y mucho trekking.", "Circuito W es desafiante pero vale cada paso.", "Amanecer en las Torres.", "Reservar los campings con muchísima anticipación."],
  ["seed-arequipa", "seed-user-lucia", "Lucia Rutas", "Arequipa, Perú", 4, 400, "Solo", "cultura", "Hostel cerca de la Plaza de Armas.", "Caminatas.", "La ciudad blanca tiene una arquitectura impresionante.", "Monasterio de Santa Catalina.", "La comida picante puede ser muy fuerte."],
  ["seed-mancora", "seed-user-mateo", "Mateo Norte", "Máncora, Perú", 6, 500, "Amigos", "playa", "Hostel con fiesta.", "Mototaxis.", "Lugar ideal para surf y relax barato.", "Aprender a surfear.", "Mucho ruido de noche si quieres dormir temprano."],
  ["seed-san-pablo", "seed-user-ana", "Ana Camino", "San Pablo, Brasil", 4, 600, "Solo", "ciudad", "Departamento en Vila Madalena.", "Metro (excelente).", "Ciudad vibrante, gigante y con excelente comida.", "Avenida Paulista los domingos.", "El tráfico es infernal, usar solo metro."],
  ["seed-buzios", "seed-user-valen", "Valen Sur", "Búzios, Brasil", 7, 900, "Pareja", "playa", "Pousada tradicional.", "Vans locales (buggys).", "Las playas son hermosas y variadas.", "Playa Joao Fernandes.", "La Rua das Pedras es cara para cenar."],
  ["seed-salvador", "seed-user-cami", "Cami Costa", "Salvador, Brasil", 5, 700, "Amigos", "cultura", "Hostel en el Pelourinho.", "Buses y Uber.", "Mucha historia, música y cultura afrobrasileña.", "Tarde en el Farol da Barra.", "Estar muy atento a la seguridad en el centro histórico."],
  ["seed-cancun", "seed-user-tomas", "Tomas Aire", "Cancún, México", 7, 1500, "Familia", "playa", "Resort All Inclusive.", "Buses R1/R2.", "Ideal para no hacer nada y solo disfrutar la playa.", "Día en Isla Mujeres.", "La zona hotelera no tiene casi cultura local."],
  ["seed-playa-carmen", "seed-user-sofia", "Sofia Andes", "Playa del Carmen, México", 6, 1100, "Pareja", "playa", "Hotel boutique cerca de la Quinta Avenida.", "Caminata y colectivos.", "Un buen punto intermedio entre fiesta y relax.", "Buceo en cenotes.", "Muchos vendedores insistentes en la calle principal."],
  ["seed-barcelona", "seed-user-bruno", "Bruno Mapa", "Barcelona, España", 6, 1200, "Amigos", "ciudad", "Departamento en el Barrio Gótico.", "Metro y bus.", "Gaudí, playa y tapas, todo en una misma ciudad.", "Sagrada Familia (reservar antes).", "Muchos carteristas en el metro."],
  ["seed-sevilla", "seed-user-lucia", "Lucia Rutas", "Sevilla, España", 4, 700, "Pareja", "cultura", "Hotel en Triana.", "Caminatas y tranvía.", "El ambiente y la arquitectura son mágicos.", "Real Alcázar y Plaza de España.", "El calor en verano es insoportable."],
  ["seed-valencia", "seed-user-mateo", "Mateo Norte", "Valencia, España", 5, 800, "Solo", "ciudad", "Hostel cerca de la Ciudad de las Artes.", "Bici y metro.", "Ciudad muy vivible, con parque increíble y playa.", "Recorrer el parque del Turia en bici.", "Las fallas en marzo son ruidosas si buscas paz."],
  ["seed-niza", "seed-user-ana", "Ana Camino", "Niza, Francia", 5, 1100, "Pareja", "playa", "Hotel a tres cuadras del mar.", "Tranvía.", "La Costa Azul es hermosa pero cara.", "Paseo de los Ingleses.", "Las playas son de piedras, no de arena."],
  ["seed-lyon", "seed-user-valen", "Valen Sur", "Lyon, Francia", 3, 600, "Solo", "gastronomia", "Departamento céntrico.", "Metro.", "Capital gastronómica de Francia, excelente comida.", "Comer en un 'Bouchon' tradicional.", "No es tan turística como París, se necesita algo de francés."],
  ["seed-milan", "seed-user-cami", "Cami Costa", "Milán, Italia", 4, 900, "Amigos", "ciudad", "Hotel cerca de estación central.", "Metro y tranvía.", "Capital de la moda y el diseño.", "Catedral del Duomo y terraza.", "Cerrado y silencioso en agosto."],
  ["seed-venecia", "seed-user-tomas", "Tomas Aire", "Venecia, Italia", 3, 800, "Pareja", "cultura", "Hotel en Mestre (afuera).", "Vaporetto y tren.", "Mágica pero muy llena de turistas.", "Perderse por los canales de noche.", "Comer cerca de San Marcos es una trampa para turistas."],
  ["seed-florencia", "seed-user-sofia", "Sofia Andes", "Florencia, Italia", 4, 850, "Solo", "cultura", "Hostel céntrico.", "Caminata.", "Un museo al aire libre.", "Galería Uffizi y atardecer en Piazzale Michelangelo.", "Filas eternas para todo sin reserva."],
  ["seed-napoles", "seed-user-bruno", "Bruno Mapa", "Nápoles, Italia", 3, 500, "Amigos", "gastronomia", "Departamento en el centro histórico.", "Caminata.", "Caótica pero con la mejor pizza del mundo.", "Comer pizza Margarita clásica.", "El tráfico es muy agresivo."],
  ["seed-edimburgo", "seed-user-lucia", "Lucia Rutas", "Edimburgo, Reino Unido", 4, 900, "Solo", "cultura", "Hostel en Old Town.", "Bus y caminatas.", "Ciudad con aire medieval y muy mística.", "Castillo de Edimburgo y Arthur's Seat.", "El clima es lluvia casi constante."],
  ["seed-oporto", "seed-user-mateo", "Mateo Norte", "Oporto, Portugal", 4, 600, "Pareja", "cultura", "Departamento con vista al río.", "Metro y caminata.", "Pintoresca, buen vino y precios amigables.", "Ribeira y degustación de vinos.", "Demasiadas subidas y bajadas muy empinadas."],
  ["seed-munich", "seed-user-ana", "Ana Camino", "Múnich, Alemania", 4, 800, "Amigos", "ciudad", "Hotel cerca de Marienplatz.", "S-Bahn y U-Bahn.", "Ciudad muy limpia, verde y con excelente cerveza.", "English Garden y cervecerías tradicionales.", "Todo cierra temprano y los domingos no hay nada."],
  ["seed-budapest", "seed-user-valen", "Valen Sur", "Budapest, Hungría", 5, 550, "Solo", "ciudad", "Hostel en lado Pest.", "Tranvía y metro.", "Muy majestuosa y amigable con el presupuesto.", "Baños termales y Parlamento.", "El idioma es incomprensible."],
  ["seed-atenas", "seed-user-cami", "Cami Costa", "Atenas, Grecia", 4, 600, "Pareja", "cultura", "Hotel cerca de Plaka.", "Metro.", "La historia antigua te rodea en cada esquina.", "La Acrópolis temprano a la mañana.", "Hace un calor extremo en verano."],
  ["seed-santorini", "seed-user-tomas", "Tomas Aire", "Santorini, Grecia", 5, 1400, "Pareja", "playa", "Hotel cueva en Oia.", "Buses y alquiler de cuatriciclo.", "Las vistas más románticas que vi.", "Atardecer en Oia.", "Saturada de turismo y cruceros."]
];

const seedTrips = seedTripsRaw.map(([id, userId, username, destination, duration, budget, type, experience, accommodation, transport, notes, positive, negative], index) => ({
  id,
  userId,
  username,
  destination,
  duration,
  budget,
  type,
  experience,
  accommodation,
  transport,
  notes,
  recommendations: [
    { kind: "positive", text: positive },
    { kind: "negative", text: negative }
  ],
  createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  image: imageForDestination(destination),
  seeded: true
}));

module.exports = { seedUsers, seedTrips };
