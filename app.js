let map, marker;
let lat = -0.1807;
let lng = -78.4678;
let history = [];

function initMap(){
  map = new google.maps.Map(document.getElementById("map"),{
    center:{lat,lng},
    zoom:15
  });

  marker = new google.maps.Marker({
    position:{lat,lng},
    map
  });

  updateCoords();
  showWelcome();
}

function updateCoords(){
  document.getElementById("lat").textContent = lat.toFixed(5);
  document.getElementById("lng").textContent = lng.toFixed(5);
}

function simulateMove(){
  lat += (Math.random()-0.5)/1000;
  lng += (Math.random()-0.5)/1000;
  marker.setPosition({lat,lng});
  map.setCenter({lat,lng});
  updateCoords();
  addHistory("Movimiento detectado");
  openModal("Movimiento","Ubicación actualizada correctamente.");
}

function safeZone(){
  addHistory("Zona segura activada");
  openModal("Zona segura","Se monitoreará si sale del área definida.");
}

function sendSOS(){
  document.getElementById("systemStatus").textContent="ALERTA";
  addHistory("Alerta SOS enviada");
  openModal("Alerta SOS","Notificación enviada al contacto de emergencia.");
}

function addHistory(text){
  history.push(text);
  document.getElementById("historyLog").innerHTML = history.map(h=>"• "+h).join("<br>");
}

function showSection(id, el){
  document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.querySelectorAll(".sidebar a").forEach(a=>a.classList.remove("active"));
  el.classList.add("active");
}

/* MODAL */
function openModal(title,text){
  document.getElementById("modalTitle").textContent=title;
  document.getElementById("modalText").textContent=text;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal(){
  document.getElementById("modal").classList.add("hidden");
}

function showWelcome(){
  openModal(
    "Bienvenido a MONSAFE",
    "Esta es una simulación profesional del sistema GPS para collares de seguridad."
  );
}

window.onload = initMap;
