import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import producersData from './producers-coords.json'; // Garanta que o JSON existe

// --- Hack de Ícones do Leaflet (para não quebrar no build) ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
// -----------------------------------------------------------

// Componente auxiliar para controlar o Zoom Automático
const MapController = ({ activeRegion, filteredProducers }) => {
  const map = useMap();

  useEffect(() => {
    if (activeRegion && filteredProducers.length > 0) {
      // Cria limites (bounds) baseados nos pinos visíveis e dá zoom neles
      const bounds = L.latLngBounds(filteredProducers.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    } else if (!activeRegion) {
      // Se limpar o filtro, volta para a visão geral da França
      map.setView([46.603354, 1.888334], 6);
    }
  }, [activeRegion, filteredProducers, map]);

  return null;
};

const RealCassisMap = ({ activeRegion, onRegionSelect }) => {

  // Lógica de Filtro: Se tem região ativa, filtra o JSON. Se não, usa tudo.
  const displayedProducers = activeRegion
    ? producersData.filter(p => p.region === activeRegion)
    : producersData;

  return (
    // Importante: relative para o header flutuante funcionar dentro dele
    <div className="relative h-full w-full bg-gray-100">

      {/* --- HEADER FLUTUANTE (Novo Visual Clean) --- */}
      {/* z-[400] garante que fique acima do mapa */}
      <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 min-w-[220px] transition-all duration-300">
        <h1 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-1">
          <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${activeRegion ? 'bg-purple-600' : 'bg-green-500'}`}></span>
          Mapa Interativo
        </h1>
        <div className="text-xs text-gray-500 font-medium">
           {activeRegion ? (
             <>Filtrando: <span className="text-purple-600 font-bold">{activeRegion}</span></>
           ) : (
             <span>Visualizando toda a França</span>
           )}
        </div>
        <div className="mt-2 text-[10px] text-gray-400 border-t pt-2">
          {displayedProducers.length} locais encontrados
        </div>
      </div>

      {/* --- O MAPA --- */}
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0" // Garante que o mapa fique no fundo
      >
        {/* TileLayer Clean (CartoDB Positron) - Fundo cinza/branco elegante */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Controlador de Zoom */}
        <MapController activeRegion={activeRegion} filteredProducers={displayedProducers} />

        {/* Pinos */}
        {displayedProducers.map((producer, idx) => (
          <Marker
            key={idx}
            position={[producer.lat, producer.lng]}
            eventHandlers={{
              click: () => {
                // Ao clicar no pino, avisa o App.jsx para abrir a lista lateral
                onRegionSelect(producer.region);
              },
            }}
          >
            <Popup>
              <div className="p-1 min-w-[150px]">
                <h3 className="font-bold text-gray-800 text-sm">{producer.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{producer.city}</p>
                <span className="text-[10px] uppercase font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">
                  {producer.region}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RealCassisMap;