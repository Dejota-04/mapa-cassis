import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import producersData from './producers-coords.json';

// --- Hack de Ícones ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
// --------------------

// Componente auxiliar para controlar o Zoom/Pan do mapa
const MapController = ({ activeRegion, filteredProducers }) => {
  const map = useMap();

  useEffect(() => {
    if (activeRegion && filteredProducers.length > 0) {
      // 1. Cria um grupo de coordenadas
      const bounds = L.latLngBounds(filteredProducers.map(p => [p.lat, p.lng]));
      // 2. Manda o mapa se ajustar para caber todos esses pinos
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    } else if (!activeRegion) {
      // Se limpar o filtro, volta a ver a França inteira
      map.setView([46.603354, 1.888334], 6);
    }
  }, [activeRegion, filteredProducers, map]);

  return null;
};

const RealCassisMap = ({ activeRegion, onRegionSelect }) => {

  // Lógica de Filtro: Se tem região ativa, mostra só ela. Se não, mostra tudo.
  const displayedProducers = activeRegion
    ? producersData.filter(p => p.region === activeRegion)
    : producersData;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="bg-purple-900 p-3 text-white shadow-md z-10 flex justify-between items-center">
        <h1 className="text-lg font-bold flex items-center gap-2">
          🗺️ Mapa Interativo
        </h1>
        <div className="text-xs bg-purple-800 px-3 py-1 rounded">
           {activeRegion ? `Filtrando: ${activeRegion}` : "Mostrando tudo"}
           ({displayedProducers.length} locais)
        </div>
      </div>

      <div className="flex-1">
        <MapContainer
          center={[46.603354, 1.888334]}
          zoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Controlador de Zoom Automático */}
          <MapController activeRegion={activeRegion} filteredProducers={displayedProducers} />

          {displayedProducers.map((producer, idx) => (
            <Marker
              key={idx}
              position={[producer.lat, producer.lng]}
              eventHandlers={{
                click: () => {
                  // Ao clicar no pino, ativa a região dele na sidebar
                  onRegionSelect(producer.region);
                },
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-purple-900">{producer.name}</h3>
                  <p className="text-sm text-gray-600">{producer.city}</p>
                  <span className="text-xs font-semibold bg-purple-100 text-purple-800 px-2 rounded-full mt-1 inline-block">
                    {producer.region}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RealCassisMap;