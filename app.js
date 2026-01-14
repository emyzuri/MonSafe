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

/* SIDEBAR */
function showSection(id, el){
  document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.querySelectorAll(".menu a").forEach(a=>a.classList.remove("active"));
  el.classList.add("active");
}

/* ACTIONS */
function simularMovimiento(){
  lat += (Math.random()-0.5)/1000;
  lng += (Math.random()-0.5)/1000;
  marker.setPosition({lat,lng});
  map.setCenter({lat,lng});
  updateCoords();
  addHistory("Movimiento detectado");
  openModal("Movimiento","Ubicación actualizada correctamente.");
}

function zonaSegura(){
  addHistory("Zona segura activada");
  openModal("Zona segura","Se monitoreará si sale del área segura.");
}

function enviarAlerta(){
  document.getElementById("systemStatus").textContent="ALERTA";
  addHistory("Alerta SOS enviada");
  openModal("Alerta SOS","Notificación enviada al contacto de emergencia.");
}

/* NAVBAR */
function goHome(){
  document.querySelector(".menu a").click();
}

function showFeatures(){
  openModal("Funcionalidades",
    "• Monitoreo GPS en tiempo real\n" +
    "• Alertas SOS\n" +
    "• Zonas seguras\n" +
    "• Historial de eventos");
}

function showContact(){
  openModal("Contacto",
    "Centro MONSAFE\n📞 +593 99 999 9999\n✉ soporte@monsafe.org");
}

function showPricing(){
  openModal("Modelo de negocio",
    "Plan Básico: Gratis\nPlan Premium: $4.99/mes");
}

/* HISTORY */
function addHistory(text){
  history.push(text);
  document.getElementById("historyLog").innerHTML =
    history.map(h=>"• "+h).join("<br>");
}

/* MODAL */
function openModal(title,text){
  const modal=document.getElementById("modal");
  document.getElementById("modalTitle").textContent=title;
  document.getElementById("modalText").textContent=text;
  modal.style.display="flex";
  modal.classList.remove("hidden");
}

function closeModal(){
  const modal=document.getElementById("modal");
  modal.classList.add("hidden");
  modal.style.display="none";
}

function showWelcome(){
  openModal(
    "Bienvenido a MONSAFE",
    "Simulación profesional del sistema GPS para collares de seguridad."
  );
}

window.onload = initMap;
