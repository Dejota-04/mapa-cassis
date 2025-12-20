import React, { useState } from 'react';
import CassisMap from './CassisMap';
import RealCassisMap from './RealCassisMap';

function App() {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionSelect = (regionName) => {
    setActiveRegion(prev => prev === regionName ? null : regionName);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-1/3 min-w-[450px] h-full overflow-y-auto bg-white border-r shadow-2xl z-20 scroll-smooth">
        <CassisMap
          activeRegion={activeRegion}
          onRegionSelect={handleRegionSelect}
        />
      </div>

      {/* MAPA */}
      <div className="flex-1 h-full relative z-10">
        <RealCassisMap
          activeRegion={activeRegion}
          onRegionSelect={setActiveRegion}
        />
      </div>

    </div>
  );
}

export default App;