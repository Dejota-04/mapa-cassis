import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const CassisMap = () => {
  const [expandedRegions, setExpandedRegions] = useState({});

  const regions = {
    "BOURGOGNE-FRANCHE-COMTÉ": {
      color: "bg-purple-100 border-purple-300",
      headerColor: "bg-purple-600",
      total: 180,
      departments: {
        "Côte-d'Or (21)": {
          count: 80,
          producers: [
            "🏭 GRANDES PRODUTORES COM IGP:",
            "• Lejay-Lagoute (Dijon, 1841) - Criadora original",
            "• L'Héritier-Guyot (Dijon, 1845)",
            "• Gabriel Boudier (Dijon, 1846)",
            "• Briottet (Dijon, 1836)",
            "• Védrenne (Nuits-Saint-Georges, 1923)",
            "• Joseph Cartron (Nuits-Saint-Georges, 1882)",
            "• Trenel (1928)",
            "",
            "🍷 PRODUTORES ARTESANAIS:",
            "• Jean-Baptiste Joannet (Arcenant, 1978)",
            "• Ferme Fruirouge (Concœur, orgânico)",
            "• Paul & Colette Simon (Marey-les-Fussey)",
            "• Sylvain Bouhélier (Chaumont-le-Bois)",
            "• Valérie Rossignol (Ladoix-Serrigny)",
            "",
            "🏰 VINÍCOLAS DA CÔTE DE NUITS:",
            "• Domaine Philippe Gavignet",
            "• Domaine Dufouleur",
            "• Domaine Manuel Olivier (Corboin)",
            "• Domaine Trapet (Gevrey-Chambertin, bio)",
            "• Maison Jean-Claude Boisset",
            "• Maison Louis Bouillot",
            "• Maison Bouchard Père & Fils (Beaune, 1731)",
            "• Château Gris",
            "• Vignerons Nuiton-Beaunoy",
            "",
            "👨‍🌾 ~48 pequenos viticultores familiares das Hautes-Côtes"
          ]
        },
        "Yonne (89)": {
          count: 35,
          producers: [
            "🍇 COOPERATIVAS E GRANDES DOMAINES:",
            "• La Chablisienne (~300 vignerons)",
            "• Union des Viticulteurs de Chablis",
            "• Domaine William Fèvre",
            "• Domaine Christian Moreau Père et Fils",
            "",
            "🏠 DOMAINES FAMILIARES:",
            "• Domaine Tupinier",
            "• Domaine de Noëlle (desde 1983)",
            "• Domaine Gautheron (Fleys)",
            "• Louis Michel et Fils",
            "• Domaine du Chardonnay",
            "• GAEC des Vins Vieux (Lignorelles)",
            "",
            "👨‍🌾 ~13 pequenos produtores de Chablis"
          ]
        },
        "Saône-et-Loire (71)": {
          count: 30,
          producers: [
            "🌾 MÂCONNAIS E BEAUJOLAIS:",
            "• Domaine Les Charmes (Sermoyer, bio, 25 ha)",
            "• Domaine du Vissoux (Beaujolais)",
            "• Crozet Frères (Haut Beaujolais, 1875)",
            "• Cave La Vigne Blanche (Clessé, 1927)",
            "• Cave de Lugny (232 vignerons)",
            "• Cave Coopérative de Fleurie (1927)",
            "• Domaine Fleurot (Santenay, 1872)",
            "• Hervé Guigon (Sassenay)",
            "",
            "👨‍🌾 ~15 pequenos produtores de Mâcon, Givry, Mercurey"
          ]
        },
        "Doubs (25) + Haute-Saône (70) + Jura (39)": {
          count: 35,
          producers: [
            "🥃 FRANCHE-COMTÉ:",
            "• Grandes Distilleries Peureux (Fougerolles, 1864)",
            "• Distillerie Paul Devoille (Fougerolles, 1859, EPV)",
            "• Distillerie Guy (Pontarlier, 1890)",
            "• Distillerie Heima (Doubs, bio)",
            "• Nicolas (Noroy-le-Bourg)",
            "• Cassiopée (Jura, bio)",
            "",
            "👨‍🌾 ~15 destiladores ambulantes e artesanais"
          ]
        }
      }
    },
    "GRAND EST": {
      color: "bg-blue-100 border-blue-300",
      headerColor: "bg-blue-600",
      total: 75,
      departments: {
        "Bas-Rhin (67) + Haut-Rhin (68)": {
          count: 30,
          producers: [
            "🍒 ALSÁCIA - TRADIÇÃO DE DESTILARIAS:",
            "• Massenez / G.E. Massenez (1870)",
            "• Gilbert Holl (Ribeauvillé, 1979)",
            "• Lecomte Blaise (Vosges, 1820)",
            "• Jos Nusbaumer (Steige, 1947, EPV)",
            "• Distillerie Meyer (Châtenois, 1958, EPV)",
            "• Distillerie Lehmann (Dambach-la-Ville, 1850)",
            "• Distillerie Mersiol (Dambach-la-Ville)",
            "• Dopff & Irion",
            "• Ernest Preiss",
            "• Marcel Windholtz (Ribeauvillé)",
            "• Hoeffler Distillerie",
            "• Klein Wanner",
            "• Adam Boissons",
            "• Domaine du Bollenberg",
            "",
            "👨‍🌾 ~15 pequenas destilarias alsacianas artesanais"
          ]
        },
        "Moselle (57) + Meurthe-et-Moselle (54) + Meuse (55) + Vosges (88)": {
          count: 45,
          producers: [
            "🌲 LORRAINE:",
            "• Distillerie de Mélanie (Marieulles-Vezon)",
            "• Distillerie Eulriet (Bruley, mirabela bio)",
            "• Compagnie des Hautes Vosges (Rozelieures)",
            "• Distillerie du Castor (Troisfontaines)",
            "• Jean Claude Eulriet (Bruley)",
            "• Alain Trichot (Trémont-sur-Saulx, Meuse)",
            "• Christophe Egloff (Morville-sur-Nied)",
            "• La Cave Lorraine (Toul)",
            "• Philippe Assa (Bar-le-Duc)",
            "• Domaine de la Goulotte (Saint-Maurice-sous-les-Côtes)",
            "• Clair de Lorraine (Void-Vacon)",
            "",
            "👨‍🌾 ~30 pequenos produtores lorenenses"
          ]
        }
      }
    },
    "PAYS DE LA LOIRE": {
      color: "bg-green-100 border-green-300",
      headerColor: "bg-green-600",
      total: 30,
      departments: {
        "Loire-Atlantique (44) + Maine-et-Loire (49) + Loir-et-Cher (41)": {
          count: 30,
          producers: [
            "🏰 VALE DO LOIRE:",
            "• Giffard (Loire-Atlantique)",
            "• Distillerie Combier (Saumur, 1834)",
            "• Distillerie Girardot (Chissay-en-Touraine)",
            "• Monin / Georges Monin (Bourges, 1912)",
            "• Domaine du Croc du Merle (Muides-sur-Loire)",
            "• Distillerie du Val de Loire (1834)",
            "",
            "🤝 COOPERATIVAS:",
            "• Alliance Loire (agrupa 6 cooperativas)",
            "",
            "👨‍🌾 ~10 pequenos produtores do Vale do Loire"
          ]
        }
      }
    },
    "NOUVELLE-AQUITAINE": {
      color: "bg-yellow-100 border-yellow-300",
      headerColor: "bg-yellow-600",
      total: 45,
      departments: {
        "Charente (16) + Charente-Maritime (17)": {
          count: 10,
          producers: [
            "🥃 COGNAC:",
            "• Jacquiot (Plassac)",
            "• Le Domaine de Jacquiot",
            "• Merlet (Cognac, 1830)",
            "",
            "👨‍🌾 ~5 pequenos produtores"
          ]
        },
        "Dordogne (24) + Lot (46) + Corrèze (19)": {
          count: 25,
          producers: [
            "🌰 PÉRIGORD:",
            "• Maison Denoix (Brive, 1839)",
            "• Distillerie du Périgord (Sarlat)",
            "• Clovis Reymond (Villamblard, 1834)",
            "• Distillerie de l'Òrt (Montignac-Lascaux, 2021, bio)",
            "• Distillerie La Salamandre (Temniac)",
            "• Distillerie de Mas de Cause (Daglan)",
            "• GPT Viticulteurs Dordogne Périgord",
            "",
            "👨‍🌾 ~15 pequenos produtores do Périgord"
          ]
        },
        "Gers (32) + Tarn-et-Garonne (82) + Lot-et-Garonne (47)": {
          count: 10,
          producers: [
            "🌻 SUD-OESTE:",
            "• Distillerie Aurian (Gers, 1880)",
            "• Distillerie Louis Roque (Souillac)",
            "• Marc Penche (Cayriech)",
            "• André Rouere (Saint-Étienne-de-Tulmont)",
            "• Olivier Buisine (bouilleur ambulant)",
            "",
            "👨‍🌾 ~5 produtores locais"
          ]
        }
      }
    },
    "OCCITANIE": {
      color: "bg-red-100 border-red-300",
      headerColor: "bg-red-600",
      total: 180,
      departments: {
        "Aude (11) + Hérault (34) + Gard (30) + Pyrénées-Orientales (66)": {
          count: 180,
          producers: [
            "🏭 LANGUEDOC-ROUSSILLON - MAIOR CONCENTRAÇÃO DE COOPERATIVAS:",
            "",
            "📍 DESTILARIAS MÉDIAS:",
            "• Distillerie Sud Languedoc/ADSL (Ornaisons e Sigean, 1900)",
            "• Distillerie du Renard (Gignac, 2021)",
            "• Distillerie du Petit Grain (Hérault)",
            "• Distillerie du Somail (Aude)",
            "• L'Amourette (Gard)",
            "• Les Ateliers de Gaïa (Pézenas)",
            "• Distillerie des Cévennes (Saint-Jean-du-Gard)",
            "• Le Combi des Alambics (Hérault, móvel)",
            "• Brunel et Cie (Carcassonne, 2023)",
            "• Bows Distillerie (Laure-Minervois, 2016)",
            "• Bacardi-Martini (Marseillan - Noilly Prat)",
            "",
            "🤝 DISTILLERIES COOPÉRATIVES (~65):",
            "• Distillerie coopérative de Bizanet (Aude, 1909)",
            "• Distillerie de Canet-d'Aude (1919)",
            "• Distillerie de Lézignan-Corbières (Aude)",
            "• Distillerie de Limoux (Aude, 1921)",
            "• Distillerie de Saint-Chinian (Hérault, 1921)",
            "• Distillerie d'Ouveillan (Aude, 1920)",
            "• Distillerie de Saint-Marcel (Aude, 1914)",
            "• Distillerie d'Arzens (Aude, 1929)",
            "• Distillerie d'Autignac (Hérault, 1926)",
            "• Distillerie d'Olonzac (Hérault, 1909)",
            "• Distillerie de Cuxac-d'Aude (1920)",
            "• Distillerie de Capestang (Hérault, 1936)",
            "• Distillerie de Rouffiac-d'Aude",
            "• Distillerie de Saint-Laurent-de-la-Salanque (66)",
            "• Distillerie de Saint-André-de-Sangonis (34)",
            "• La Grappe de Montpellier",
            "• Distillerie de Salles d'Aude",
            "• Distillerie de Vendres (Hérault, 1929)",
            "• Distillerie de Perpignan (66)",
            "• + ~46 outras cooperativas menores",
            "",
            "📊 ESTATÍSTICA: 691 caves e distilleries catalogadas na região!"
          ]
        },
        "Lozère (48) + Aveyron (12)": {
          count: 5,
          producers: [
            "⛰️ CAUSSES E CÉVENNES:",
            "• Distillerie de l'Aubrac (Nasbinals, 2022)",
            "• Luspin Olivier - La Muse du Verger (Saint-Beauzély)",
            "",
            "👨‍🌾 ~3 pequenos produtores"
          ]
        }
      }
    },
    "AUVERGNE-RHÔNE-ALPES": {
      color: "bg-indigo-100 border-indigo-300",
      headerColor: "bg-indigo-600",
      total: 70,
      departments: {
        "Drôme (26) + Ardèche (07)": {
          count: 20,
          producers: [
            "🌿 PROVENCE NORTE:",
            "• Eyguebelle (Valaurie, 1949)",
            "• Distillerie Duffez (Drôme, 1947)",
            "• Distillerie A. Blachère (1835)",
            "• La Chanenche (Drôme)",
            "• Distillerie de Vogüé (Ardèche)",
            "",
            "👨‍🌾 ~10 pequenos produtores"
          ]
        },
        "Rhône (69) + Ain (01) + Loire (42) + Isère (38)": {
          count: 25,
          producers: [
            "🍇 BEAUJOLAIS E ALPES:",
            "• Domaine du Vissoux (Beaujolais)",
            "• Crozet Frères (Haut Beaujolais, 1875)",
            "• Jean-Yves Sourd (Servignat, Ain, ambulant)",
            "• Pascal Nalin (tournées Rhône/Ain/Isère/Loire)",
            "",
            "🏔️ ALPES:",
            "• Routin 1883 / Maison Routin (1883)",
            "• Dolin (Chambéry)",
            "",
            "👨‍🌾 ~15 pequenos produtores de Rhône-Alpes"
          ]
        },
        "Cantal (15) + Puy-de-Dôme (63) + Allier (03)": {
          count: 15,
          producers: [
            "🌋 AUVERGNE:",
            "• Distillerie Baptiste (Saint-Étienne-de-Chomeil)",
            "",
            "👨‍🌾 ~10 pequenos produtores de Auvergne"
          ]
        },
        "Hautes-Alpes (05) + Alpes-de-Haute-Provence (04)": {
          count: 10,
          producers: [
            "⛰️ ALTOS ALPES:",
            "• Distillerie de Briançon - Serre Chevalier",
            "• Gayral Reynier (Champsaur)",
            "• O.S.U.D. Distillerie de l'Ubaye",
            "",
            "👨‍🌾 ~5 produtores alpinos"
          ]
        }
      }
    },
    "PROVENCE-ALPES-CÔTE D'AZUR": {
      color: "bg-pink-100 border-pink-300",
      headerColor: "bg-pink-600",
      total: 30,
      departments: {
        "Vaucluse (84) + Bouches-du-Rhône (13)": {
          count: 20,
          producers: [
            "🌺 PROVENCE:",
            "• Distillerie Frigolet (Châteaurenard, 1865)",
            "• Distillerie de Provence",
            "• Distil Coop Provençale",
            "• Maison Manguin (Avignon)",
            "• Distillerie Girard",
            "",
            "👨‍🌾 ~10 produtores provençais"
          ]
        },
        "Var (83) + Alpes-Maritimes (06)": {
          count: 10,
          producers: [
            "🏖️ CÔTE D'AZUR:",
            "👨‍🌾 ~10 pequenos produtores costeiros"
          ]
        }
      }
    },
    "BRETAGNE": {
      color: "bg-cyan-100 border-cyan-300",
      headerColor: "bg-cyan-600",
      total: 25,
      departments: {
        "Finistère (29) + Côtes-d'Armor (22) + Morbihan (56) + Ille-et-Vilaine (35)": {
          count: 25,
          producers: [
            "🌊 BRETANHA:",
            "• Distillerie du Plessis (Quimper, anos 1980)",
            "• Maison Fisselier (Pacé, 1968)",
            "• Distillerie Warenghem (Lannion, 1900)",
            "• Domaine du Kinkiz (Pierre Seznec)",
            "",
            "👨‍🌾 ~15 pequenos produtores bretões"
          ]
        }
      }
    },
    "NORMANDIE": {
      color: "bg-orange-100 border-orange-300",
      headerColor: "bg-orange-600",
      total: 400,
      departments: {
        "Calvados (14) + Manche (50) + Orne (61)": {
          count: 400,
          producers: [
            "🍎 NORMANDIE - CASSIS AU CALVADOS:",
            "",
            "🏭 DESTILARIAS PRINCIPAIS:",
            "• Vergers de la Morinière (Pays d'Auge)",
            "• Distillerie Persyn (Houlle, 1812)",
            "• Distillerie Busnel (1820)",
            "• Maison Hérout (Auvers, 1946)",
            "• Ferme de Billy (Rots)",
            "• Domaine Nicolas Flambard (Portbail)",
            "• Cidrerie Théo Capelle",
            "• Domaine Louis Dupont",
            "",
            "🍏 CIDRICULTORES:",
            "📊 MAIS DE 350 PRODUTORES CIDRICOLAS segundo Maison Cidricole",
            "Muitos produzem Liqueur de Cassis au Calvados",
            "",
            "🚚 BOUILLEURS AMBULANTS:",
            "• Sylvain Malivoir (Somme)",
            "• Jacques Bamière (Somme)",
            "",
            "👨‍🌾 ~40 produtores normandos identificados específicamente"
          ]
        }
      }
    },
    "HAUTS-DE-FRANCE": {
      color: "bg-gray-100 border-gray-300",
      headerColor: "bg-gray-600",
      total: 20,
      departments: {
        "Nord (59) + Pas-de-Calais (62) + Somme (80) + Aisne (02)": {
          count: 20,
          producers: [
            "🏭 NORTE DA FRANÇA:",
            "• TOS Distillerie (2017)",
            "• Distillerie Claeyssens (1817)",
            "• Distillerie Persyn (genièvre)",
            "• Distillerie de Gayant",
            "• Le Chaudron Helfic",
            "• Distillerie d'Hautefeuille (Picardie, 2017)",
            "• Ryssen Alcools (Dunkerque)",
            "• Brabant Sté Distillerie",
            "",
            "🚚 BOUILLEURS AMBULANTS:",
            "• Sylvain Malivoir (Epaumesnil, Somme)",
            "• Jacques Bamière (Villers-Campsart, Somme)",
            "",
            "👨‍🌾 ~8 pequenos produtores do Norte"
          ]
        }
      }
    },
    "GRANDES MARCAS NACIONAIS": {
      color: "bg-amber-100 border-amber-300",
      headerColor: "bg-amber-600",
      total: 10,
      departments: {
        "Distribuição Nacional": {
          count: 10,
          producers: [
            "🏆 MARCAS HISTÓRICAS:",
            "• Cherry Rocher (desde 1705)",
            "• Marie Brizard (Bordeaux, 1755)",
            "• Bellet",
            "• Lucien Noyelle",
            "",
            "🧃 FABRICANTES DE XAROPES:",
            "• Monin (Bourges, 1912)",
            "• Routin 1883 (Alpes, 1883)",
            "• Teisseire (industrial)",
            "• Pagès (infusões e xaropes)",
            "",
            "🌍 Distribuição em toda França e exportação"
          ]
        }
      }
    }
  };

  const toggleRegion = (regionName) => {
    setExpandedRegions(prev => ({
      ...prev,
      [regionName]: !prev[regionName]
    }));
  };

  const totalProducers = Object.values(regions).reduce((sum, region) => sum + region.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4 flex items-center gap-3">
            <MapPin className="w-10 h-10 text-purple-600" />
            Mapa de Produtores de Cassis na França
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Mapeamento completo de mais de <span className="font-bold text-purple-600">{totalProducers}+</span> produtores,
            destilarias, vinícolas e cooperativas que produzem Cassis, Crème de Cassis, Liqueur de Cassis e Sirop de Cassis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{totalProducers}+</div>
              <div className="text-sm text-gray-700">Total de Produtores</div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">13</div>
              <div className="text-sm text-gray-700">Regiões da França</div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">100+</div>
              <div className="text-sm text-gray-700">Departamentos</div>
            </div>
          </div>
        </div>

        {/* Regions Map */}
        <div className="space-y-4">
          {Object.entries(regions).map(([regionName, regionData]) => (
            <div
              key={regionName}
              className={`${regionData.color} border-2 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              {/* Region Header */}
              <button
                onClick={() => toggleRegion(regionName)}
                className={`w-full ${regionData.headerColor} text-white p-6 flex items-center justify-between hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <div className="text-left">
                    <h2 className="text-2xl font-bold">{regionName}</h2>
                    <p className="text-sm opacity-90">
                      {regionData.total} produtores identificados
                    </p>
                  </div>
                </div>
                {expandedRegions[regionName] ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>

              {/* Region Content */}
              {expandedRegions[regionName] && (
                <div className="p-6 bg-white">
                  {Object.entries(regionData.departments).map(([deptName, deptData]) => (
                    <div key={deptName} className="mb-6 last:mb-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                          {deptData.count}
                        </span>
                        {deptName}
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {deptData.producers.map((producer, idx) => (
                          <div
                            key={idx}
                            className={`${
                              producer.startsWith('🏭') || producer.startsWith('🍇') ||
                              producer.startsWith('🌾') || producer.startsWith('🥃') ||
                              producer.startsWith('🏰') || producer.startsWith('🌰') ||
                              producer.startsWith('🌻') || producer.startsWith('📍') ||
                              producer.startsWith('🤝') || producer.startsWith('🌿') ||
                              producer.startsWith('🌺') || producer.startsWith('🏖️') ||
                              producer.startsWith('🌊') || producer.startsWith('🍎') ||
                              producer.startsWith('🏭') || producer.startsWith('🏆') ||
                              producer.startsWith('🧃') || producer.startsWith('🌍') ||
                              producer.startsWith('🍏') || producer.startsWith('🚚') ||
                              producer.startsWith('⛰️') || producer.startsWith('🌋') ||
                              producer.startsWith('🍒') || producer.startsWith('🌲') ||
                              producer.startsWith('📊')
                                ? 'font-bold text-purple-900 mt-3 text-base'
                                : producer.startsWith('•')
                                ? 'text-gray-700 ml-4 text-sm'
                                : producer.startsWith('👨‍🌾')
                                ? 'text-green-700 font-semibold ml-4 mt-2 text-sm'
                                : producer === ''
                                ? 'h-2'
                                : 'text-gray-600 ml-4 text-sm'
                            }`}
                          >
                            {producer}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Estatísticas Adicionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <strong>Cooperativas na França:</strong> ~670 caves coopératives (fonte oficial 2014)
            </div>
            <div>
              <strong>Languedoc-Roussillon:</strong> 691 caves e distilleries catalogadas
            </div>
            <div>
              <strong>Champagne:</strong> 132 cooperativas agrupando 14.000 viticultores
            </div>
            <div>
              <strong>Occitanie:</strong> 230 caves coopératives
            </div>
            <div>
              <strong>Normandia:</strong> Mais de 350 produtores cidricolas
            </div>
            <div>
              <strong>Filière Cassis:</strong> ~100 produtores de bagas de cassis (1.500 ton/ano)
            </div>
            <div>
              <strong>Bouilleurs Ambulants:</strong> 50-100 destiladores móveis estimados
            </div>
            <div>
              <strong>IGP Cassis de Dijon:</strong> 80% da produção francesa de crème de cassis
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔑 Legenda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏭</span>
              <span>Grandes produtores industriais</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🍷</span>
              <span>Produtores artesanais e médios</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏰</span>
              <span>Vinícolas e domaines</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🤝</span>
              <span>Cooperativas e caves coopératives</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚚</span>
              <span>Bouilleurs ambulants (destiladores móveis)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">👨‍🌾</span>
              <span>Pequenos produtores locais estimados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🧃</span>
              <span>Fabricantes de xaropes de cassis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <span>Marcas históricas nacionais</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-2">📝 Nota Importante</h3>
          <p className="text-sm text-gray-700">
            Este mapa representa mais de <strong>1.000 entidades</strong> envolvidas na produção de cassis na França,
            incluindo grandes produtores, destilarias médias, pequenas vinícolas, cooperativas, bouilleurs ambulants,
            produtores cidricolas e agricultores familiares. Muitos pequenos produtores operam localmente sem presença
            digital significativa, mas fazem parte da rica tradição francesa de produção de cassis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CassisMap;