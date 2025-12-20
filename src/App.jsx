import React, { useState } from 'react';
import CassisMap from './CassisMap';
import RealCassisMap from './RealCassisMap';

function App() {
  // Estado que manda em tudo: qual região está ativa?
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionSelect = (regionName) => {
    // Se clicar na mesma região que já está aberta, fecha ela (toggle)
    setActiveRegion(prev => prev === regionName ? null : regionName);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-1/3 min-w-[450px] h-full overflow-y-auto bg-white border-r shadow-2xl z-20 scroll-smooth">
        <CassisMap
          activeRegion={activeRegion}
          onRegionSelect={handleRegionSelect} // 👇 Passamos o controle pra cá também
        />
      </div>

      {/* MAPA */}
      <div className="flex-1 h-full relative z-10">
        <RealCassisMap
          activeRegion={activeRegion}       // 👇 O mapa precisa saber quem filtrar
          onRegionSelect={setActiveRegion}  // 👇 O mapa também pode mudar a região
        />
      </div>

    </div>
  );
}

export default App;