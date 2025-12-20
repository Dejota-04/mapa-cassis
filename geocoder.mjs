import fs from 'fs';

// --- CONFIGURAÇÕES ---
const OUTPUT_FILE = './src/producers-coords.json';
const DELAY_MS = 1200; // Delay para não ser bloqueado pela API
const USER_AGENT = 'CassisMapApp/1.0';

// --- SEUS DADOS ---
const regions = {
  "BOURGOGNE-FRANCHE-COMTÉ": {
    departments: {
      "Côte-d'Or (21)": {
        producers: [
          "• Lejay-Lagoute (Dijon, 1841) - Criadora original",
          "• L'Héritier-Guyot (Dijon, 1845)",
          "• Gabriel Boudier (Dijon, 1846)",
          "• Briottet (Dijon, 1836)",
          "• Védrenne (Nuits-Saint-Georges, 1923)",
          "• Joseph Cartron (Nuits-Saint-Georges, 1882)",
          "• Trenel (1928)",
          "• Jean-Baptiste Joannet (Arcenant, 1978)",
          "• Ferme Fruirouge (Concœur, orgânico)",
          "• Paul & Colette Simon (Marey-les-Fussey)",
          "• Sylvain Bouhélier (Chaumont-le-Bois)",
          "• Valérie Rossignol (Ladoix-Serrigny)",
          "• Domaine Philippe Gavignet (Nuits-Saint-Georges)",
          "• Domaine Dufouleur (Nuits-Saint-Georges)",
          "• Domaine Manuel Olivier (Corboin)",
          "• Domaine Trapet (Gevrey-Chambertin, bio)",
          "• Maison Jean-Claude Boisset (Nuits-Saint-Georges)",
          "• Maison Louis Bouillot (Nuits-Saint-Georges)",
          "• Maison Bouchard Père & Fils (Beaune, 1731)",
          "• Château Gris (Nuits-Saint-Georges)",
          "• Vignerons Nuiton-Beaunoy (Beaune)"
        ]
      },
      "Yonne (89)": {
        producers: [
          "• La Chablisienne (Chablis)",
          "• Union des Viticulteurs de Chablis (Chablis)",
          "• Domaine William Fèvre (Chablis)",
          "• Domaine Christian Moreau Père et Fils (Chablis)",
          "• Domaine Tupinier (Chablis)",
          "• Domaine de Noëlle (Chablis)",
          "• Domaine Gautheron (Fleys)",
          "• Louis Michel et Fils (Chablis)",
          "• Domaine du Chardonnay (Chablis)",
          "• GAEC des Vins Vieux (Lignorelles)"
        ]
      },
      "Saône-et-Loire (71)": {
        producers: [
          "• Domaine Les Charmes (Sermoyer, bio, 25 ha)",
          "• Domaine du Vissoux (Saint-Vérand)",
          "• Crozet Frères (Lancié)",
          "• Cave La Vigne Blanche (Clessé, 1927)",
          "• Cave de Lugny (Lugny)",
          "• Cave Coopérative de Fleurie (Fleurie)",
          "• Domaine Fleurot (Santenay, 1872)",
          "• Hervé Guigon (Sassenay)"
        ]
      },
      "Doubs (25) + Haute-Saône (70) + Jura (39)": {
        producers: [
          "• Grandes Distilleries Peureux (Fougerolles, 1864)",
          "• Distillerie Paul Devoille (Fougerolles, 1859, EPV)",
          "• Distillerie Guy (Pontarlier, 1890)",
          "• Distillerie Heima (Les Hôpitaux-Neufs)",
          "• Nicolas (Noroy-le-Bourg)",
          "• Cassiopée (Château-Chalon)"
        ]
      }
    }
  },
  "GRAND EST": {
    departments: {
      "Bas-Rhin (67) + Haut-Rhin (68)": {
        producers: [
          "• Massenez / G.E. Massenez (Dieffenbach-au-Val)",
          "• Gilbert Holl (Ribeauvillé, 1979)",
          "• Lecomte Blaise (Le Syndicat)",
          "• Jos Nusbaumer (Steige, 1947, EPV)",
          "• Distillerie Meyer (Châtenois, 1958, EPV)",
          "• Distillerie Lehmann (Dambach-la-Ville, 1850)",
          "• Distillerie Mersiol (Dambach-la-Ville)",
          "• Dopff & Irion (Riquewihr)",
          "• Ernest Preiss (Riquewihr)",
          "• Marcel Windholtz (Ribeauvillé)",
          "• Hoeffler Distillerie (Ribeauvillé)",
          "• Klein Wanner (Dambach-la-Ville)",
          "• Adam Boissons (Guewenheim)",
          "• Domaine du Bollenberg (Westhalten)"
        ]
      },
      "Moselle (57) + Meurthe-et-Moselle (54) + Meuse (55) + Vosges (88)": {
        producers: [
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
          "• Clair de Lorraine (Void-Vacon)"
        ]
      }
    }
  },
  "PAYS DE LA LOIRE": {
    departments: {
      "Loire-Atlantique (44) + Maine-et-Loire (49) + Loir-et-Cher (41)": {
        producers: [
          "• Giffard (Avrillé)",
          "• Distillerie Combier (Saumur, 1834)",
          "• Distillerie Girardot (Chissay-en-Touraine)",
          "• Monin / Georges Monin (Bourges, 1912)",
          "• Domaine du Croc du Merle (Muides-sur-Loire)",
          "• Distillerie du Val de Loire (Saumur)"
        ]
      }
    }
  },
  "NOUVELLE-AQUITAINE": {
    departments: {
      "Charente (16) + Charente-Maritime (17)": {
        producers: [
          "• Jacquiot (Plassac)",
          "• Le Domaine de Jacquiot (Plassac)",
          "• Merlet (Saint-Sauvant)"
        ]
      },
      "Dordogne (24) + Lot (46) + Corrèze (19)": {
        producers: [
          "• Maison Denoix (Brive-la-Gaillarde)",
          "• Distillerie du Périgord (Sarlat-la-Canéda)",
          "• Clovis Reymond (Villamblard, 1834)",
          "• Distillerie de l'Òrt (Montignac-Lascaux, 2021, bio)",
          "• Distillerie La Salamandre (Sarlat-la-Canéda)",
          "• Distillerie de Mas de Cause (Daglan)"
        ]
      },
      "Gers (32) + Tarn-et-Garonne (82) + Lot-et-Garonne (47)": {
        producers: [
          "• Distillerie Aurian (Condom)",
          "• Distillerie Louis Roque (Souillac)",
          "• Marc Penche (Cayriech)",
          "• André Rouere (Saint-Étienne-de-Tulmont)",
          "• Olivier Buisine (Montauban)"
        ]
      }
    }
  },
  "OCCITANIE": {
    departments: {
      "Aude (11) + Hérault (34) + Gard (30) + Pyrénées-Orientales (66)": {
        producers: [
          "• Distillerie Sud Languedoc/ADSL (Sigean)",
          "• Distillerie du Renard (Gignac, 2021)",
          "• Distillerie du Petit Grain (Saint-Jean-de-Minervois)",
          "• Distillerie du Somail (Ginestas)",
          "• L'Amourette (Saint-Laurent-d'Aigouze)",
          "• Les Ateliers de Gaïa (Pézenas)",
          "• Distillerie des Cévennes (Saint-Jean-du-Gard)",
          "• Brunel et Cie (Carcassonne, 2023)",
          "• Bows Distillerie (Laure-Minervois, 2016)",
          "• Bacardi-Martini (Marseillan)",
          "• Distillerie coopérative de Bizanet (Bizanet)",
          "• Distillerie de Canet-d'Aude (Canet)",
          "• Distillerie de Lézignan-Corbières (Lézignan-Corbières)",
          "• Distillerie de Limoux (Limoux)",
          "• Distillerie de Saint-Chinian (Saint-Chinian)",
          "• Distillerie d'Ouveillan (Ouveillan)",
          "• Distillerie de Saint-Marcel (Saint-Marcel-sur-Aude)",
          "• Distillerie d'Arzens (Arzens)",
          "• Distillerie d'Autignac (Autignac)",
          "• Distillerie d'Olonzac (Olonzac)",
          "• Distillerie de Cuxac-d'Aude (Cuxac-d'Aude)",
          "• Distillerie de Capestang (Capestang)",
          "• Distillerie de Vendres (Vendres)"
        ]
      },
      "Lozère (48) + Aveyron (12)": {
        producers: [
          "• Distillerie de l'Aubrac (Nasbinals, 2022)",
          "• Luspin Olivier - La Muse du Verger (Saint-Beauzély)"
        ]
      }
    }
  },
  "AUVERGNE-RHÔNE-ALPES": {
    departments: {
      "Drôme (26) + Ardèche (07)": {
        producers: [
          "• Eyguebelle (Valaurie, 1949)",
          "• Distillerie Duffez (Bouchet)",
          "• Distillerie A. Blachère (Châteauneuf-du-Pape)",
          "• La Chanenche (La Motte-Chalancon)",
          "• Distillerie de Vogüé (Vogüé)"
        ]
      },
      "Rhône (69) + Ain (01) + Loire (42) + Isère (38)": {
        producers: [
          "• Routin 1883 / Maison Routin (La Motte-Servolex)",
          "• Dolin (Chambéry)",
          "• Jean-Yves Sourd (Servignat)",
          "• Domaine du Vissoux (Saint-Vérand)"
        ]
      },
      "Cantal (15) + Puy-de-Dôme (63) + Allier (03)": {
        producers: [
          "• Distillerie Baptiste (Saint-Étienne-de-Chomeil)"
        ]
      },
      "Hautes-Alpes (05) + Alpes-de-Haute-Provence (04)": {
        producers: [
          "• Distillerie de Briançon (Briançon)",
          "• Gayral Reynier (Saint-Jean-Saint-Nicolas)",
          "• O.S.U.D. Distillerie de l'Ubaye (Barcelonnette)"
        ]
      }
    }
  },
  "PROVENCE-ALPES-CÔTE D'AZUR": {
    departments: {
      "Vaucluse (84) + Bouches-du-Rhône (13)": {
        producers: [
          "• Distillerie Frigolet (Châteaurenard, 1865)",
          "• Distillerie de Provence (Forcalquier)",
          "• Maison Manguin (Avignon)",
          "• Distillerie Girard (Jonquières)"
        ]
      }
    }
  },
  "BRETAGNE": {
    departments: {
      "Finistère (29) + Côtes-d'Armor (22) + Morbihan (56) + Ille-et-Vilaine (35)": {
        producers: [
          "• Distillerie du Plessis (Quimper)",
          "• Maison Fisselier (Pacé)",
          "• Distillerie Warenghem (Lannion, 1900)",
          "• Domaine du Kinkiz (Quimper)"
        ]
      }
    }
  },
  "NORMANDIE": {
    departments: {
      "Calvados (14) + Manche (50) + Orne (61)": {
        producers: [
          "• Vergers de la Morinière (La Chapelle-Viel)",
          "• Distillerie Persyn (Houlle, 1812)",
          "• Distillerie Busnel (Cormeilles)",
          "• Maison Hérout (Auvers, 1946)",
          "• Ferme de Billy (Rots)",
          "• Domaine Nicolas Flambard (Portbail)",
          "• Cidrerie Théo Capelle (Sotteville)",
          "• Domaine Louis Dupont (Victot-Pontfol)"
        ]
      }
    }
  },
  "HAUTS-DE-FRANCE": {
    departments: {
      "Nord (59) + Pas-de-Calais (62) + Somme (80) + Aisne (02)": {
        producers: [
          "• TOS Distillerie (Havrincourt)",
          "• Distillerie Claeyssens (Wambrechies)",
          "• Distillerie Persyn (Houlle)",
          "• Distillerie d'Hautefeuille (Beaucourt-en-Santerre)",
          "• Ryssen Alcools (Dunkerque)",
          "• Sylvain Malivoir (Epaumesnil)",
          "• Jacques Bamière (Villers-Campsart)"
        ]
      }
    }
  },
  "GRANDES MARCAS NACIONAIS": {
    departments: {
      "Distribuição Nacional": {
        producers: [
          "• Cherry Rocher (La Côte-Saint-André)",
          "• Marie Brizard (Bordeaux)",
          "• Monin (Bourges)",
          "• Teisseire (Crolles)",
          "• Pagès (Le Puy-en-Velay)"
        ]
      }
    }
  }
};

// --- FUNÇÕES DE LÓGICA ---

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const extractCity = (text) => {
  if (!text.includes('•')) return null;

  // Regex para pegar o texto dentro dos parênteses
  const match = text.match(/\(([^,)]+)/);
  if (match && match[1]) {
    let city = match[1].trim();
    if (city.match(/^\d+$/) || city.includes('~')) return null;
    return city;
  }
  return null;
};

const main = async () => {
  console.log('🚀 Iniciando Geocoding Completo...');
  console.log(`📦 Processando dados...`);

  let results = [];
  let processedCount = 0;

  for (const [region, regData] of Object.entries(regions)) {
    if (!regData.departments) continue;

    for (const [dept, deptData] of Object.entries(regData.departments)) {
      if(!deptData.producers) continue;

      for (const producerLine of deptData.producers) {

        const city = extractCity(producerLine);

        if (city) {
          try {
            process.stdout.write(`Scanning: ${city.padEnd(30)} \r`);

            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)},France&format=json&limit=1`;

            const response = await fetch(url, {
              headers: { 'User-Agent': USER_AGENT }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();

            if (data && data.length > 0) {
              const place = data[0];
              const cleanName = producerLine.split('(')[0].replace('•', '').trim();

              results.push({
                name: cleanName,
                originalText: producerLine,
                city: city,
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lon),
                region: region,
                details: producerLine
              });
              processedCount++;
            }

          } catch (error) {
            // Ignora erro e continua
          }

          await sleep(DELAY_MS);
        }
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\n\n🎉 SUCESSO!`);
  console.log(`✅ ${processedCount} produtores geolocalizados.`);
  console.log(`📁 Arquivo salvo em: ${OUTPUT_FILE}`);
};

main();