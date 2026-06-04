export interface Manobra {
  id: string;
  nome: string;
  textoAPI: string; // texto a enviar para a API como se digitado
}

export interface Regiao {
  id: string;
  nome: string;
  vista: "frente" | "costas";
  x: number; // posição em % do container
  y: number;
  w: number; // largura em %
  h: number; // altura em %
  manobras: Manobra[];
}

export const regioesBoneco: Regiao[] = [
  // ========== FRENTE ==========
  {
    id: "cabeca_face",
    nome: "Cabeça e Face",
    vista: "frente",
    x: 35,
    y: 3,
    w: 30,
    h: 10,
    manobras: [
      { id: "1", nome: "Inspecionar fácies", textoAPI: "inspecionar facies" },
      { id: "2", nome: "Inspecionar palidez", textoAPI: "inspecionar palidez facial" },
      { id: "3", nome: "Inspecionar cianose central", textoAPI: "inspecionar cianose central" },
    ],
  },
  {
    id: "olhos_conjuntivas",
    nome: "Olhos / Conjuntivas",
    vista: "frente",
    x: 25,
    y: 5,
    w: 15,
    h: 6,
    manobras: [
      { id: "1", nome: "Inspecionar palidez conjuntival", textoAPI: "inspecionar palidez conjuntival" },
      { id: "2", nome: "Inspecionar icterícia escleral", textoAPI: "inspecionar ictericia escleral" },
    ],
  },
  {
    id: "boca_orofaringe",
    nome: "Boca / Orofaringe",
    vista: "frente",
    x: 60,
    y: 5,
    w: 15,
    h: 6,
    manobras: [
      { id: "1", nome: "Inspecionar mucosas", textoAPI: "inspecionar mucosas bucais" },
      { id: "2", nome: "Inspecionar cianose central", textoAPI: "inspecionar cianose central" },
      { id: "3", nome: "Inspecionar lesões orais", textoAPI: "inspecionar lesoes orais" },
    ],
  },
  {
    id: "pescoco",
    nome: "Pescoço",
    vista: "frente",
    x: 35,
    y: 13,
    w: 30,
    h: 8,
    manobras: [
      { id: "1", nome: "Inspecionar turgência jugular", textoAPI: "inspecionar turgencia jugular" },
      { id: "2", nome: "Palpar linfonodos cervicais", textoAPI: "palpar linfonodos cervicais" },
      { id: "3", nome: "Palpar tireoide", textoAPI: "palpar tireoide" },
      { id: "4", nome: "Palpar pulso carotídeo", textoAPI: "palpar pulso carotideo" },
    ],
  },
  {
    id: "torax_anterior",
    nome: "Tórax Anterior",
    vista: "frente",
    x: 20,
    y: 21,
    w: 60,
    h: 25,
    manobras: [
      { id: "1", nome: "Inspecionar padrão respiratório", textoAPI: "inspecionar padrao respiratorio" },
      { id: "2", nome: "Palpar expansibilidade", textoAPI: "palpar expansibilidade toracica" },
      { id: "3", nome: "Percutir campos pulmonares", textoAPI: "percutir campos pulmonares anteriores" },
      { id: "4", nome: "Auscultar campos pulmonares", textoAPI: "auscultar campos pulmonares anteriores" },
    ],
  },
  {
    id: "precordio",
    nome: "Precórdio",
    vista: "frente",
    x: 35,
    y: 35,
    w: 30,
    h: 12,
    manobras: [
      { id: "1", nome: "Inspecionar ictus", textoAPI: "inspecionar ictus cordis" },
      { id: "2", nome: "Palpar ictus cordis", textoAPI: "palpar ictus cordis" },
      { id: "3", nome: "Palpar frêmitos", textoAPI: "palpar fremitos precordiais" },
      { id: "4", nome: "Auscultar foco aórtico", textoAPI: "auscultar foco aortico" },
      { id: "5", nome: "Auscultar foco pulmonar", textoAPI: "auscultar foco pulmonar" },
      { id: "6", nome: "Auscultar foco tricúspide", textoAPI: "auscultar foco tricuspide" },
      { id: "7", nome: "Auscultar foco mitral", textoAPI: "auscultar foco mitral" },
    ],
  },
  {
    id: "abdome",
    nome: "Abdome",
    vista: "frente",
    x: 20,
    y: 48,
    w: 60,
    h: 20,
    manobras: [
      { id: "1", nome: "Inspecionar abdome", textoAPI: "inspecionar abdome" },
      { id: "2", nome: "Auscultar ruídos hidroaéreos", textoAPI: "auscultar ruidos hidroaereos" },
      { id: "3", nome: "Percutir abdome", textoAPI: "percutir abdome" },
      { id: "4", nome: "Palpar superficialmente", textoAPI: "palpar abdome superficial" },
      { id: "5", nome: "Palpar profundamente", textoAPI: "palpar abdome profundo" },
      { id: "6", nome: "Pesquisar sinal de Blumberg", textoAPI: "pesquisar sinal de blumberg descompressao brusca" },
      { id: "7", nome: "Pesquisar sinal de Murphy", textoAPI: "pesquisar sinal de murphy" },
    ],
  },
  {
    id: "maos_dedos",
    nome: "Mãos e Dedos",
    vista: "frente",
    x: 10,
    y: 52,
    w: 12,
    h: 15,
    manobras: [
      { id: "1", nome: "Inspecionar baqueteamento", textoAPI: "inspecionar baqueteamento digital" },
      { id: "2", nome: "Inspecionar cianose periférica", textoAPI: "inspecionar cianose periferica dedos" },
      { id: "3", nome: "Inspecionar palidez palmar", textoAPI: "inspecionar palidez palmar" },
      { id: "4", nome: "Inspecionar lesões de Janeway", textoAPI: "inspecionar lesoes de janeway" },
      { id: "5", nome: "Inspecionar nódulos de Osler", textoAPI: "inspecionar nodulos de osler" },
      { id: "6", nome: "Inspecionar hemorragias subungueais", textoAPI: "inspecionar hemorragias subungueais" },
    ],
  },
  {
    id: "membros_inferiores",
    nome: "Membros Inferiores",
    vista: "frente",
    x: 20,
    y: 68,
    w: 60,
    h: 25,
    manobras: [
      { id: "1", nome: "Inspecionar edema", textoAPI: "inspecionar edema membros inferiores" },
      { id: "2", nome: "Palpar edema com cacifo", textoAPI: "palpar edema com cacifo" },
      { id: "3", nome: "Palpar pulsos periféricos", textoAPI: "palpar pulsos perifericos" },
      { id: "4", nome: "Avaliar perfusão periférica", textoAPI: "avaliar perfusao periferica" },
    ],
  },

  // ========== COSTAS ==========
  {
    id: "cabeca_face_posterior",
    nome: "Cabeça e Face",
    vista: "costas",
    x: 35,
    y: 3,
    w: 30,
    h: 10,
    manobras: [
      { id: "1", nome: "Inspecionar couro cabeludo", textoAPI: "inspecionar couro cabeludo" },
      { id: "2", nome: "Inspecionar postura da cabeça", textoAPI: "inspecionar postura cabeca" },
      { id: "3", nome: "Inspecionar assimetrias", textoAPI: "inspecionar assimetrias cabeca posterior" },
    ],
  },
  {
    id: "pescoco_posterior",
    nome: "Pescoço",
    vista: "costas",
    x: 35,
    y: 13,
    w: 30,
    h: 8,
    manobras: [
      { id: "1", nome: "Inspecionar região cervical", textoAPI: "inspecionar regiao cervical posterior" },
      { id: "2", nome: "Palpar musculatura cervical", textoAPI: "palpar musculatura cervical" },
      { id: "3", nome: "Palpar linfonodos cervicais posteriores", textoAPI: "palpar linfonodos cervicais posteriores" },
      { id: "4", nome: "Avaliar rigidez de nuca", textoAPI: "avaliar rigidez nuca" },
    ],
  },
  {
    id: "torax_posterior",
    nome: "Tórax Posterior",
    vista: "costas",
    x: 20,
    y: 21,
    w: 60,
    h: 35,
    manobras: [
      { id: "1", nome: "Inspecionar expansibilidade posterior", textoAPI: "inspecionar expansibilidade toracica posterior" },
      { id: "2", nome: "Palpar expansibilidade posterior", textoAPI: "palpar expansibilidade toracica posterior" },
      { id: "3", nome: "Palpar frêmito toracovocal", textoAPI: "palpar fremito toracovocal posterior" },
      { id: "4", nome: "Percutir ápices pulmonares", textoAPI: "percutir apices pulmonares posteriores" },
      { id: "5", nome: "Percutir bases pulmonares", textoAPI: "percutir bases pulmonares posteriores" },
      { id: "6", nome: "Auscultar ápices posteriores", textoAPI: "auscultar apices posteriores" },
      { id: "7", nome: "Auscultar campos médios posteriores", textoAPI: "auscultar campos medios posteriores" },
      { id: "8", nome: "Auscultar bases posteriores", textoAPI: "auscultar bases pulmonares posteriores" },
    ],
  },
  {
    id: "lombar",
    nome: "Região Lombar",
    vista: "costas",
    x: 20,
    y: 56,
    w: 60,
    h: 15,
    manobras: [
      { id: "1", nome: "Inspecionar região lombar", textoAPI: "inspecionar regiao lombar" },
      { id: "2", nome: "Palpar musculatura paravertebral", textoAPI: "palpar musculatura paravertebral" },
      { id: "3", nome: "Pesquisar dor lombar à palpação", textoAPI: "pesquisar dor lombar palpacao" },
      { id: "4", nome: "Punho-percussão lombar direita", textoAPI: "punho percussao flancos direita renal" },
      { id: "5", nome: "Punho-percussão lombar esquerda", textoAPI: "punho percussao flancos esquerda renal" },
    ],
  },
  {
    id: "membros_inferiores_posteriores",
    nome: "Membros Inferiores Posteriores",
    vista: "costas",
    x: 20,
    y: 71,
    w: 60,
    h: 25,
    manobras: [
      { id: "1", nome: "Inspecionar panturrilhas", textoAPI: "inspecionar panturrilhas posteriores" },
      { id: "2", nome: "Palpar panturrilhas", textoAPI: "palpar panturrilhas" },
      { id: "3", nome: "Pesquisar empastamento de panturrilha", textoAPI: "palpar panturrilha empastamento" },
      { id: "4", nome: "Pesquisar dor à dorsiflexão", textoAPI: "pesquisar dor dorsiflex panturrilha" },
      { id: "5", nome: "Pesquisar sinal de Homans", textoAPI: "pesquisar sinal de homans panturrilha" },
      { id: "6", nome: "Inspecionar edema posterior", textoAPI: "inspecionar edema membros inferiores posteriores" },
      { id: "7", nome: "Avaliar perfusão periférica", textoAPI: "avaliar perfusao periferica posterior" },
    ],
  },
];

export function obterRegioesPorVista(vista: "frente" | "costas"): Regiao[] {
  return regioesBoneco.filter((r) => r.vista === vista);
}
