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
}

function showSection(id, el){
    document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');

    document.querySelectorAll('.menu a').forEach(a=>a.classList.remove('active'));
    el.classList.add('active');
}

function simularMovimiento(){
    lat += (Math.random()-0.5)/1000;
    lng += (Math.random()-0.5)/1000;

    const pos = {lat,lng};
    marker.setPosition(pos);
    map.setCenter(pos);

    document.getElementById('lat').textContent = lat.toFixed(5);
    document.getElementById('lng').textContent = lng.toFixed(5);

    addHistory('Movimiento simulado');
}

function enviarAlerta(){
    document.getElementById('systemStatus').textContent = 'ALERTA ACTIVA';
    addHistory('🚨 Alerta SOS enviada');
    alert('Alerta SOS enviada correctamente');
}

function zonaSegura(){
    addHistory('Zona segura activada');
    alert('Zona segura configurada');
}

function addHistory(text){
    history.push(text);
    document.getElementById('historyLog').innerHTML =
        history.map(h => '• ' + h).join('<br>');
}

window.onload = initMap;
