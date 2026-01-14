let map, marker;
let lat = -0.1807;
let lng = -78.4678;
let history = [];

function initMap(){
  map = new google.maps.Map(document.getElementById('map'),{
    zoom:15,
    center:{lat,lng}
  });

  marker = new google.maps.Marker({
    position:{lat,lng},
    map
  });

  updateCoords();
}

function updateCoords(){
  document.getElementById('lat').textContent = lat.toFixed(5);
  document.getElementById('lng').textContent = lng.toFixed(5);
}

function showSection(id,el){
  document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  document.querySelectorAll('.menu a').forEach(a=>a.classList.remove('active'));
  el.classList.add('active');
}

function simularMovimiento(){
  lat += (Math.random()-0.5)/1000;
  lng += (Math.random()-0.5)/1000;
  marker.setPosition({lat,lng});
  map.setCenter({lat,lng});
  updateCoords();
  addHistory('Movimiento detectado');
  openModal('Movimiento','La ubicación se actualizó correctamente.');
}

function enviarAlerta(){
  document.getElementById('systemStatus').textContent='ALERTA';
  addHistory('Alerta SOS enviada');
  openModal('Alerta SOS','La alerta fue enviada al contacto de emergencia.');
}

function zonaSegura(){
  addHistory('Zona segura activada');
  openModal('Zona segura','Se notificará si el usuario sale del área definida.');
}

function addHistory(text){
  history.push(text);
  document.getElementById('historyLog').innerHTML =
    history.map(h=>'• '+h).join('<br>');
}

/* MODAL */
function openModal(title,text){
  const modal=document.getElementById('modal');
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalText').textContent=text;
  modal.style.display='flex';
  modal.classList.remove('hidden');
}

function closeModal(){
  const modal=document.getElementById('modal');
  modal.classList.add('hidden');
  modal.style.display='none';
}

function showWelcome(){
  openModal(
    'Bienvenido a MONSAFE',
    'Esta es una simulación profesional del sistema GPS para collares de seguridad.'
  );
}

window.onload = ()=>{
  initMap();
  showWelcome();
};
