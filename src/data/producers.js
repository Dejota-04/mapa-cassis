// Produtores de cassis (crème, liqueur, sirop) na França.
//
// Campos:
//   name     nome do produtor
//   city     cidade (null se não souber: o pino cai no centro do departamento)
//   dept     código do departamento (null: fica só na lista, fora do mapa)
//   type     chave de TYPES
//   founded  ano de fundação (opcional)
//   tags     'igp' (IGP Cassis de Dijon), 'bio' (orgânico), 'epv' (Entreprise du
//            Patrimoine Vivant) (opcional)
//   note     observação curta (opcional)
//
// Cidade nova? Rode `npm run geocode` para gravar as coordenadas em coords.js.

export const TYPES = {
  licorista: { label: 'Licoristas tradicionais', color: '#6d1b4f' },
  destilaria: { label: 'Destilarias', color: '#b45309' },
  artesanal: { label: 'Produtores artesanais', color: '#be123c' },
  domaine: { label: 'Vinícolas e domaines', color: '#4338ca' },
  cooperativa: { label: 'Cooperativas', color: '#0f766e' },
  cidricultor: { label: 'Cidra e Calvados', color: '#65a30d' },
  ambulante: { label: 'Destiladores ambulantes', color: '#57534e' },
  xarope: { label: 'Fabricantes de xarope', color: '#0284c7' },
  marca: { label: 'Marcas históricas nacionais', color: '#a16207' },
}

export const TAGS = {
  igp: { label: 'IGP Cassis de Dijon', short: 'IGP' },
  bio: { label: 'Orgânico (bio)', short: 'Bio' },
  epv: { label: 'Entreprise du Patrimoine Vivant', short: 'EPV' },
}

export const PRODUCERS = [
  // ── Bourgogne · Côte-d'Or ─────────────────────────────────────────────
  { name: 'Lejay-Lagoute', city: 'Dijon', dept: '21', type: 'licorista', founded: 1841, tags: ['igp'], note: 'Criadora original do crème de cassis' },
  { name: "L'Héritier-Guyot", city: 'Dijon', dept: '21', type: 'licorista', founded: 1845, tags: ['igp'] },
  { name: 'Gabriel Boudier', city: 'Dijon', dept: '21', type: 'licorista', founded: 1846, tags: ['igp'] },
  { name: 'Briottet', city: 'Dijon', dept: '21', type: 'licorista', founded: 1836, tags: ['igp'] },
  { name: 'Védrenne', city: 'Nuits-Saint-Georges', dept: '21', type: 'licorista', founded: 1923, tags: ['igp'] },
  { name: 'Joseph Cartron', city: 'Nuits-Saint-Georges', dept: '21', type: 'licorista', founded: 1882, tags: ['igp'] },
  { name: 'Jean-Baptiste Joannet', city: 'Arcenant', dept: '21', type: 'artesanal', founded: 1978 },
  { name: 'Ferme Fruirouge', city: 'Concœur-et-Corboin', dept: '21', type: 'artesanal', tags: ['bio'] },
  { name: 'Paul & Colette Simon', city: 'Marey-lès-Fussey', dept: '21', type: 'artesanal' },
  { name: 'Sylvain Bouhélier', city: 'Chaumont-le-Bois', dept: '21', type: 'artesanal' },
  { name: 'Valérie Rossignol', city: 'Ladoix-Serrigny', dept: '21', type: 'artesanal' },
  { name: 'Domaine Philippe Gavignet', city: 'Nuits-Saint-Georges', dept: '21', type: 'domaine' },
  { name: 'Domaine Dufouleur', city: 'Nuits-Saint-Georges', dept: '21', type: 'domaine' },
  { name: 'Domaine Manuel Olivier', city: 'Concœur-et-Corboin', dept: '21', type: 'domaine' },
  { name: 'Domaine Trapet', city: 'Gevrey-Chambertin', dept: '21', type: 'domaine', tags: ['bio'] },
  { name: 'Maison Jean-Claude Boisset', city: 'Nuits-Saint-Georges', dept: '21', type: 'domaine' },
  { name: 'Maison Louis Bouillot', city: 'Nuits-Saint-Georges', dept: '21', type: 'domaine' },
  { name: 'Maison Bouchard Père & Fils', city: 'Beaune', dept: '21', type: 'domaine', founded: 1731 },
  { name: 'Château Gris', city: 'Nuits-Saint-Georges', dept: '21', type: 'domaine' },
  { name: 'Vignerons Nuiton-Beaunoy', city: 'Beaune', dept: '21', type: 'cooperativa' },
  { name: 'Domaine Fleurot', city: 'Santenay', dept: '21', type: 'domaine', founded: 1872 },

  // ── Bourgogne · Yonne ─────────────────────────────────────────────────
  { name: 'La Chablisienne', city: 'Chablis', dept: '89', type: 'cooperativa', note: 'Cerca de 300 vignerons' },
  { name: 'Union des Viticulteurs de Chablis', city: 'Chablis', dept: '89', type: 'cooperativa' },
  { name: 'Domaine William Fèvre', city: 'Chablis', dept: '89', type: 'domaine' },
  { name: 'Domaine Christian Moreau Père et Fils', city: 'Chablis', dept: '89', type: 'domaine' },
  { name: 'Domaine Tupinier', city: null, dept: '89', type: 'domaine' },
  { name: 'Domaine de Noëlle', city: null, dept: '89', type: 'domaine', founded: 1983 },
  { name: 'Domaine Gautheron', city: 'Fleys', dept: '89', type: 'domaine' },
  { name: 'Louis Michel et Fils', city: 'Chablis', dept: '89', type: 'domaine' },
  { name: 'Domaine du Chardonnay', city: 'Chablis', dept: '89', type: 'domaine' },
  { name: 'GAEC des Vins Vieux', city: 'Lignorelles', dept: '89', type: 'domaine' },

  // ── Bourgogne · Saône-et-Loire ────────────────────────────────────────
  { name: 'Trenel', city: 'Charnay-lès-Mâcon', dept: '71', type: 'licorista', founded: 1928, tags: ['igp'] },
  { name: 'Cave La Vigne Blanche', city: 'Clessé', dept: '71', type: 'cooperativa', founded: 1927 },
  { name: 'Cave de Lugny', city: 'Lugny', dept: '71', type: 'cooperativa', note: '232 vignerons' },
  { name: 'Hervé Guigon', city: 'Sassenay', dept: '71', type: 'artesanal' },

  // ── Franche-Comté ─────────────────────────────────────────────────────
  { name: 'Grandes Distilleries Peureux', city: 'Fougerolles', dept: '70', type: 'destilaria', founded: 1864 },
  { name: 'Distillerie Paul Devoille', city: 'Fougerolles', dept: '70', type: 'destilaria', founded: 1859, tags: ['epv'] },
  { name: 'Nicolas', city: 'Noroy-le-Bourg', dept: '70', type: 'destilaria' },
  { name: 'Distillerie Guy', city: 'Pontarlier', dept: '25', type: 'destilaria', founded: 1890 },
  { name: 'Distillerie Heima', city: null, dept: '25', type: 'destilaria', tags: ['bio'] },
  { name: 'Cassiopée', city: null, dept: '39', type: 'artesanal', tags: ['bio'] },

  // ── Grand Est · Alsace ────────────────────────────────────────────────
  { name: 'G.E. Massenez', city: 'Dieffenbach-au-Val', dept: '67', type: 'destilaria', founded: 1870 },
  { name: 'Jos Nusbaumer', city: 'Steige', dept: '67', type: 'destilaria', founded: 1947, tags: ['epv'] },
  { name: 'Distillerie Meyer', city: 'Châtenois', dept: '67', type: 'destilaria', founded: 1958, tags: ['epv'] },
  { name: 'Distillerie Lehmann', city: 'Obernai', dept: '67', type: 'destilaria', founded: 1850 },
  { name: 'Distillerie Mersiol', city: 'Dambach-la-Ville', dept: '67', type: 'destilaria' },
  { name: 'Gilbert Holl', city: 'Ribeauvillé', dept: '68', type: 'destilaria', founded: 1979 },
  { name: 'Marcel Windholtz', city: 'Ribeauvillé', dept: '68', type: 'destilaria' },
  { name: 'Dopff & Irion', city: 'Riquewihr', dept: '68', type: 'domaine' },
  { name: 'Domaine du Bollenberg', city: 'Westhalten', dept: '68', type: 'domaine' },
  { name: 'Ernest Preiss', city: null, dept: '68', type: 'domaine' },
  { name: 'Hoeffler Distillerie', city: null, dept: '67', type: 'destilaria' },
  { name: 'Klein Wanner', city: null, dept: '67', type: 'destilaria' },
  { name: 'Adam Boissons', city: null, dept: '67', type: 'destilaria' },

  // ── Grand Est · Lorraine e Vosges ─────────────────────────────────────
  { name: 'Lecomte Blaise', city: null, dept: '88', type: 'destilaria', founded: 1820 },
  { name: 'Compagnie des Hautes Vosges', city: 'Rozelieures', dept: '54', type: 'destilaria' },
  { name: 'Distillerie de Mélanie', city: 'Marieulles', dept: '57', type: 'destilaria' },
  { name: 'Christophe Egloff', city: 'Morville-sur-Nied', dept: '57', type: 'artesanal' },
  { name: 'Distillerie Eulriet (Jean-Claude Eulriet)', city: 'Bruley', dept: '54', type: 'destilaria', tags: ['bio'], note: 'Também mirabela' },
  { name: 'La Cave Lorraine', city: 'Toul', dept: '54', type: 'artesanal' },
  { name: 'Clair de Lorraine', city: 'Void-Vacon', dept: '55', type: 'artesanal' },
  { name: 'Distillerie du Castor', city: 'Troisfontaines', dept: '57', type: 'destilaria' },
  { name: 'Alain Trichot', city: 'Trémont-sur-Saulx', dept: '55', type: 'artesanal' },
  { name: 'Philippe Assa', city: 'Bar-le-Duc', dept: '55', type: 'artesanal' },
  { name: 'Domaine de la Goulotte', city: 'Saint-Maurice-sous-les-Côtes', dept: '55', type: 'domaine' },

  // ── Pays de la Loire ──────────────────────────────────────────────────
  { name: 'Giffard', city: 'Avrillé', dept: '49', type: 'licorista', founded: 1885 },
  { name: 'Distillerie Combier', city: 'Saumur', dept: '49', type: 'licorista', founded: 1834 },
  { name: 'Alliance Loire', city: null, dept: '49', type: 'cooperativa', note: 'Agrupa 6 cooperativas' },

  // ── Centre-Val de Loire ───────────────────────────────────────────────
  { name: 'Monin', city: 'Bourges', dept: '18', type: 'xarope', founded: 1912, note: 'Xaropes, exporta para o mundo todo' },
  { name: 'Distillerie Girardot', city: 'Chissay-en-Touraine', dept: '41', type: 'destilaria' },
  { name: 'Domaine du Croc du Merle', city: 'Muides-sur-Loire', dept: '41', type: 'domaine' },

  // ── Nouvelle-Aquitaine ────────────────────────────────────────────────
  { name: 'Domaine de Jacquiot', city: 'Plassac', dept: '17', type: 'domaine' },
  { name: 'Merlet', city: 'Saint-Sauvant', dept: '17', type: 'licorista', founded: 1850 },
  { name: 'Maison Denoix', city: 'Brive-la-Gaillarde', dept: '19', type: 'licorista', founded: 1839 },
  { name: 'Distillerie du Périgord', city: 'Sarlat-la-Canéda', dept: '24', type: 'destilaria' },
  { name: 'Clovis Reymond', city: 'Villamblard', dept: '24', type: 'licorista', founded: 1834 },
  { name: "Distillerie de l'Òrt", city: 'Montignac-Lascaux', dept: '24', type: 'destilaria', founded: 2021, tags: ['bio'] },
  { name: 'Distillerie La Salamandre', city: 'Sarlat-la-Canéda', dept: '24', type: 'destilaria', note: 'Em Temniac' },
  { name: 'Distillerie de Mas de Cause', city: 'Daglan', dept: '24', type: 'destilaria' },
  { name: 'GPT Viticulteurs Dordogne Périgord', city: null, dept: '24', type: 'cooperativa' },
  { name: 'Marie Brizard', city: 'Bordeaux', dept: '33', type: 'marca', founded: 1755 },

  // ── Occitanie · Sud-Ouest ─────────────────────────────────────────────
  { name: 'Distillerie Louis Roque', city: 'Souillac', dept: '46', type: 'destilaria' },
  { name: 'Distillerie Aurian', city: 'Condom', dept: '32', type: 'destilaria', founded: 1880 },
  { name: 'Marc Penche', city: 'Cayriech', dept: '82', type: 'artesanal' },
  { name: 'André Rouere', city: 'Saint-Étienne-de-Tulmont', dept: '82', type: 'artesanal' },
  { name: 'Olivier Buisine', city: null, dept: '32', type: 'ambulante' },
  { name: "Distillerie de l'Aubrac", city: 'Nasbinals', dept: '48', type: 'destilaria', founded: 2022 },
  { name: 'La Muse du Verger (Luspin Olivier)', city: 'Saint-Beauzély', dept: '12', type: 'artesanal' },

  // ── Occitanie · Languedoc-Roussillon ──────────────────────────────────
  { name: 'Distillerie Sud Languedoc (ADSL)', city: 'Ornaisons', dept: '11', type: 'destilaria', founded: 1900, note: 'Também em Sigean' },
  { name: 'Distillerie du Renard', city: 'Gignac', dept: '34', type: 'destilaria', founded: 2021 },
  { name: 'Distillerie du Petit Grain', city: null, dept: '34', type: 'destilaria' },
  { name: 'Distillerie du Somail', city: null, dept: '11', type: 'destilaria' },
  { name: "L'Amourette", city: null, dept: '30', type: 'destilaria' },
  { name: 'Les Ateliers de Gaïa', city: 'Pézenas', dept: '34', type: 'destilaria' },
  { name: 'Distillerie des Cévennes', city: 'Saint-Jean-du-Gard', dept: '30', type: 'destilaria' },
  { name: 'Le Combi des Alambics', city: null, dept: '34', type: 'ambulante' },
  { name: 'Brunel et Cie', city: 'Carcassonne', dept: '11', type: 'destilaria', founded: 2023 },
  { name: 'Bows Distillerie', city: 'Laure-Minervois', dept: '11', type: 'destilaria', founded: 2016 },
  { name: 'Noilly Prat (Bacardi-Martini)', city: 'Marseillan', dept: '34', type: 'licorista' },
  { name: 'Distillerie coopérative de Bizanet', city: 'Bizanet', dept: '11', type: 'cooperativa', founded: 1909 },
  { name: "Distillerie de Canet-d'Aude", city: 'Canet', dept: '11', type: 'cooperativa', founded: 1919 },
  { name: 'Distillerie de Lézignan-Corbières', city: 'Lézignan-Corbières', dept: '11', type: 'cooperativa' },
  { name: 'Distillerie de Limoux', city: 'Limoux', dept: '11', type: 'cooperativa', founded: 1921 },
  { name: 'Distillerie de Saint-Chinian', city: 'Saint-Chinian', dept: '34', type: 'cooperativa', founded: 1921 },
  { name: "Distillerie d'Ouveillan", city: 'Ouveillan', dept: '11', type: 'cooperativa', founded: 1920 },
  { name: 'Distillerie de Saint-Marcel', city: 'Saint-Marcel-sur-Aude', dept: '11', type: 'cooperativa', founded: 1914 },
  { name: "Distillerie d'Arzens", city: 'Arzens', dept: '11', type: 'cooperativa', founded: 1929 },
  { name: "Distillerie d'Autignac", city: 'Autignac', dept: '34', type: 'cooperativa', founded: 1926 },
  { name: "Distillerie d'Olonzac", city: 'Olonzac', dept: '34', type: 'cooperativa', founded: 1909 },
  { name: "Distillerie de Cuxac-d'Aude", city: "Cuxac-d'Aude", dept: '11', type: 'cooperativa', founded: 1920 },
  { name: 'Distillerie de Capestang', city: 'Capestang', dept: '34', type: 'cooperativa', founded: 1936 },
  { name: "Distillerie de Rouffiac-d'Aude", city: "Rouffiac-d'Aude", dept: '11', type: 'cooperativa' },
  { name: 'Distillerie de Saint-Laurent-de-la-Salanque', city: 'Saint-Laurent-de-la-Salanque', dept: '66', type: 'cooperativa' },
  { name: 'Distillerie de Saint-André-de-Sangonis', city: 'Saint-André-de-Sangonis', dept: '34', type: 'cooperativa' },
  { name: 'La Grappe de Montpellier', city: 'Montpellier', dept: '34', type: 'cooperativa' },
  { name: "Distillerie de Salles-d'Aude", city: "Salles-d'Aude", dept: '11', type: 'cooperativa' },
  { name: 'Distillerie de Vendres', city: 'Vendres', dept: '34', type: 'cooperativa', founded: 1929 },
  { name: 'Distillerie de Perpignan', city: 'Perpignan', dept: '66', type: 'cooperativa' },

  // ── Auvergne-Rhône-Alpes ──────────────────────────────────────────────
  { name: 'Domaine Les Charmes', city: 'Sermoyer', dept: '01', type: 'domaine', tags: ['bio'], note: '25 ha' },
  { name: 'Jean-Yves Sourd', city: 'Servignat', dept: '01', type: 'ambulante' },
  { name: 'Domaine du Vissoux', city: 'Saint-Vérand', dept: '69', type: 'domaine' },
  { name: 'Crozet Frères', city: null, dept: '69', type: 'domaine', founded: 1875, note: 'Haut Beaujolais' },
  { name: 'Cave Coopérative de Fleurie', city: 'Fleurie', dept: '69', type: 'cooperativa', founded: 1927 },
  { name: 'Pascal Nalin', city: null, dept: '69', type: 'ambulante', note: 'Rodadas por Rhône, Ain, Isère e Loire' },
  { name: 'Routin 1883', city: 'Chambéry', dept: '73', type: 'xarope', founded: 1883 },
  { name: 'Dolin', city: 'Chambéry', dept: '73', type: 'licorista' },
  { name: 'Cherry Rocher', city: 'La Côte-Saint-André', dept: '38', type: 'marca', founded: 1705 },
  { name: 'Teisseire', city: 'Crolles', dept: '38', type: 'xarope' },
  { name: 'Eyguebelle', city: 'Valaurie', dept: '26', type: 'licorista', founded: 1949 },
  { name: 'Distillerie Duffez', city: null, dept: '26', type: 'destilaria', founded: 1947 },
  { name: 'Distillerie A. Blachère', city: null, dept: '26', type: 'destilaria', founded: 1835 },
  { name: 'La Chanenche', city: null, dept: '26', type: 'artesanal' },
  { name: 'Distillerie de Vogüé', city: 'Vogüé', dept: '07', type: 'destilaria' },
  { name: 'Distillerie Baptiste', city: 'Saint-Étienne-de-Chomeil', dept: '15', type: 'destilaria' },
  { name: 'Pagès', city: 'Le Puy-en-Velay', dept: '43', type: 'xarope', note: 'Infusões e xaropes' },

  // ── Provence-Alpes-Côte d'Azur ────────────────────────────────────────
  { name: 'Distillerie de Briançon (Serre Chevalier)', city: 'Briançon', dept: '05', type: 'destilaria' },
  { name: 'Gayral Reynier', city: null, dept: '05', type: 'artesanal', note: 'Vale do Champsaur' },
  { name: "Distillerie de l'Ubaye (O.S.U.D.)", city: 'Barcelonnette', dept: '04', type: 'destilaria' },
  { name: 'Distillerie Frigolet', city: 'Châteaurenard', dept: '13', type: 'licorista', founded: 1865 },
  { name: 'Distillerie de Provence', city: null, dept: '84', type: 'destilaria' },
  { name: 'Distil Coop Provençale', city: null, dept: '84', type: 'cooperativa' },
  { name: 'Maison Manguin', city: 'Avignon', dept: '84', type: 'destilaria' },
  { name: 'Distillerie Girard', city: null, dept: '84', type: 'destilaria' },

  // ── Bretagne ──────────────────────────────────────────────────────────
  { name: 'Distillerie Warenghem', city: 'Lannion', dept: '22', type: 'destilaria', founded: 1900 },
  { name: 'Distillerie du Plessis', city: 'Quimper', dept: '29', type: 'destilaria' },
  { name: 'Domaine du Kinkiz (Pierre Seznec)', city: 'Quimper', dept: '29', type: 'cidricultor' },
  { name: 'Maison Fisselier', city: 'Pacé', dept: '35', type: 'licorista', founded: 1968 },

  // ── Normandie ─────────────────────────────────────────────────────────
  { name: 'Vergers de la Morinière', city: null, dept: '14', type: 'cidricultor', note: "Pays d'Auge" },
  { name: 'Distillerie Busnel', city: 'Cormeilles', dept: '27', type: 'destilaria', founded: 1820 },
  { name: 'Maison Hérout', city: 'Auvers', dept: '50', type: 'cidricultor', founded: 1946 },
  { name: 'Ferme de Billy', city: 'Rots', dept: '14', type: 'cidricultor' },
  { name: 'Domaine Nicolas Flambard', city: 'Portbail', dept: '50', type: 'cidricultor' },
  { name: 'Cidrerie Théo Capelle', city: null, dept: '50', type: 'cidricultor' },
  { name: 'Domaine Louis Dupont', city: 'Victot-Pontfol', dept: '14', type: 'cidricultor' },

  // ── Hauts-de-France ───────────────────────────────────────────────────
  { name: 'Distillerie Persyn', city: 'Houlle', dept: '62', type: 'destilaria', founded: 1812, note: 'Genièvre' },
  { name: 'Distillerie Claeyssens', city: 'Wambrechies', dept: '59', type: 'destilaria', founded: 1817 },
  { name: 'Distillerie de Gayant', city: 'Douai', dept: '59', type: 'destilaria' },
  { name: 'Ryssen Alcools', city: 'Dunkerque', dept: '59', type: 'destilaria' },
  { name: 'TOS Distillerie', city: null, dept: '59', type: 'destilaria', founded: 2017 },
  { name: 'Le Chaudron Helfic', city: null, dept: '59', type: 'destilaria' },
  { name: 'Brabant Sté Distillerie', city: null, dept: '59', type: 'destilaria' },
  { name: "Distillerie d'Hautefeuille", city: null, dept: '80', type: 'destilaria', founded: 2017 },
  { name: 'Sylvain Malivoir', city: 'Épaumesnil', dept: '80', type: 'ambulante' },
  { name: 'Jacques Bamière', city: 'Villers-Campsart', dept: '80', type: 'ambulante' },

  // ── Sem localização conhecida ─────────────────────────────────────────
  { name: 'Bellet', city: null, dept: null, type: 'marca' },
  { name: 'Lucien Noyelle', city: null, dept: null, type: 'marca' },
]

// Produtores que não têm nome na lista, só uma estimativa de quantos existem.
// Não entram no mapa nem no total de produtores. Os departamentos de uma
// estimativa são todos da mesma região.
// Ficaram de fora, por não serem específicos de cassis: os ~350 produtores de
// sidra da Normandia e as ~46 destilarias cooperativas menores do Languedoc
// (ambos citados em "Contexto do setor").
export const ESTIMATES = [
  { depts: ['21'], approx: 48, label: 'pequenos viticultores familiares das Hautes-Côtes' },
  { depts: ['89'], approx: 13, label: 'pequenos produtores de Chablis' },
  { depts: ['71'], approx: 15, label: 'pequenos produtores de Mâcon, Givry e Mercurey' },
  { depts: ['25', '70', '39'], approx: 15, label: 'destiladores ambulantes e artesanais da Franche-Comté' },
  { depts: ['67', '68'], approx: 15, label: 'pequenas destilarias artesanais da Alsácia' },
  { depts: ['57', '54', '55', '88'], approx: 30, label: 'pequenos produtores da Lorraine' },
  { depts: ['49', '44'], approx: 10, label: 'pequenos produtores do Vale do Loire' },
  { depts: ['16', '17'], approx: 5, label: 'pequenos produtores da região de Cognac' },
  { depts: ['24', '19'], approx: 15, label: 'pequenos produtores do Périgord' },
  { depts: ['32', '82', '46'], approx: 5, label: 'produtores locais do Sudoeste' },
  { depts: ['48', '12'], approx: 3, label: 'pequenos produtores das Causses e Cévennes' },
  { depts: ['26', '07'], approx: 10, label: 'pequenos produtores de Drôme e Ardèche' },
  { depts: ['69', '01', '42', '38'], approx: 15, label: 'pequenos produtores de Rhône-Alpes' },
  { depts: ['15', '63', '03'], approx: 10, label: 'pequenos produtores da Auvergne' },
  { depts: ['05', '04'], approx: 5, label: 'produtores alpinos' },
  { depts: ['84', '13'], approx: 10, label: 'produtores provençais' },
  { depts: ['83', '06'], approx: 10, label: "pequenos produtores da Côte d'Azur" },
  { depts: ['29', '22', '56', '35'], approx: 15, label: 'pequenos produtores bretões' },
  { depts: ['59', '62', '80', '02'], approx: 8, label: 'pequenos produtores do Norte' },
]
