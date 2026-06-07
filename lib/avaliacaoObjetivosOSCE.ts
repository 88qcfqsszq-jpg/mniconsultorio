// Normaliza texto removendo acentos, pontuação, espaços múltiplos e convertendo para minúsculas
export function normalizarTexto(texto: string): string {
  if (!texto) return "";

  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // Remove acentos
    .replace(/[^\w\s]/g, "") // Remove pontuação
    .replace(/\s+/g, " ") // Remove espaços múltiplos
    .trim();
}

// Verifica se um texto normalizado contém uma palavra-chave
function contemPalavraChave(textNormalizado: string, palavraChave: string): boolean {
  const palavras = textNormalizado.split(" ");
  const chavesNormalizadas = palavraChave.split(" ");

  // Se a palavra-chave tem múltiplas palavras, procura pela sequência
  if (chavesNormalizadas.length > 1) {
    return textNormalizado.includes(palavraChave.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""));
  }

  // Se é uma única palavra, verifica se está entre as palavras
  return palavras.some(p => p === chavesNormalizadas[0]);
}

// Mapas de objetivos por competência
const OBJETIVOS_SINAIS_VITAIS = [
  "sinais vitais",
  "pa",
  "pressao arterial",
  "pressao",
  "fc",
  "frequencia cardiaca",
  "frequencia",
  "cardiaca",
  "fr",
  "frequencia respiratoria",
  "respiratoria",
  "spo2",
  "saturacao",
  "oxigenio",
  "temperatura",
  "temp",
  "glicemia",
  "glicose"
];

const OBJETIVOS_AUSCULTA_PULMONAR = [
  "ausculta pulmonar",
  "auscultar pulmoes",
  "auscultar pulmão",
  "auscultar campos pulmonares",
  "auscultar campos",
  "auscultar bases",
  "auscultar apices",
  "auscultar apex",
  "murmurio vesicular",
  "murmúrio vesicular",
  "mv",
  "crepitacoes",
  "crepitação",
  "estertores",
  "estertor",
  "sibilos",
  "sibilancia",
  "roncos",
  "ronco",
  "ausculta respiratoria",
  "ausculta toracica"
];

const OBJETIVOS_PERCUSSAO_PULMONAR = [
  "percussao pulmonar",
  "percussao",
  "percutir torax",
  "percutir",
  "submacicez",
  "macicez",
  "hipersonoridade",
  "som claro pulmonar",
  "som claro",
  "timpanico"
];

const OBJETIVOS_PALPACAO_TORACICA = [
  "palpacao toracica",
  "palpacao",
  "expansibilidade",
  "fremito toracovocal",
  "fremito",
  "ftv",
  "palpar torax",
  "palpar expansao"
];

const OBJETIVOS_AUSCULTA_CARDIACA = [
  "ausculta cardiaca",
  "ausculta cardia",
  "auscultar coracao",
  "auscultar coração",
  "precordio",
  "foco mitral",
  "foco aortico",
  "foco aórtico",
  "foco pulmonar",
  "foco tricuspide",
  "foco tricúspide",
  "bulhas",
  "bulha",
  "b1",
  "b2",
  "b3",
  "b4",
  "sopro",
  "ictus",
  "turgencia jugular",
  "turgência jugular",
  "tj"
];

const OBJETIVOS_EXAME_ABDOME = [
  "ausculta abdominal",
  "auscultar abdome",
  "palpacao abdominal",
  "palpar abdome",
  "percussao abdominal",
  "percutir abdome",
  "inspecao abdominal",
  "examinar abdome",
  "abdome",
  "ascite",
  "circulacao colateral"
];

const OBJETIVOS_MEMBROS_INFERIORES = [
  "edema",
  "cacifo",
  "panturrilha",
  "homans",
  "bancroft",
  "pulsos perifericos",
  "pulso pedioso",
  "pulso tibial",
  "pulso dorsal",
  "perfusao periferica",
  "empastamento",
  "turgor",
  "sinal de godet",
  "varizes",
  "mmii",
  "membros inferiores"
];

const OBJETIVOS_INSPECAO_GERAL = [
  "inspecao",
  "inspeção",
  "aspecto",
  "aparencia",
  "aparência",
  "palidez",
  "cianose",
  "ictericia",
  "icterícia",
  "edema",
  "acianose",
  "bem nutrido",
  "emagrecido",
  "obeso",
  "postura",
  "condicao geral",
  "condição geral"
];

const OBJETIVOS_PALPACAO_GERAL = [
  "palpacao",
  "palpar",
  "temperatura",
  "turgor",
  "linfonodo",
  "linfonodomegalia",
  "linfonodos",
  "consistencia",
  "consistência",
  "dureza",
  "flutuacao",
  "flutuação"
];

const OBJETIVOS_ANTIBIOTICO = [
  "antibiotico",
  "antibiótico",
  "atb",
  "antibioticoterapia",
  "iniciar atb",
  "prescrever atb",
  "amoxicilina",
  "clavulanato",
  "ceftriaxona",
  "cefalosporina",
  "macrolidio",
  "macrolídio",
  "azitromicina",
  "penicilinag",
  "penicilina g"
];

const OBJETIVOS_OXIGENIO = [
  "oxigenio",
  "oxigênio",
  "o2",
  "cateter nasal",
  "mascara",
  "máscara",
  "corrigir saturacao",
  "corrigir saturação",
  "suplementar oxigenio",
  "suplementar oxigênio",
  "vm",
  "ventilacao",
  "ventilação"
];

const OBJETIVOS_HIDRATACAO = [
  "hidratacao",
  "hidratação",
  "soro",
  "fluido",
  "liquido",
  "líquido",
  "acesso venoso",
  "venoclise",
  "soro fisiologico",
  "soro isotônico",
  "soro hipertonico",
  "cristaloide"
];

const OBJETIVOS_MONITORAMENTO = [
  "monitorar",
  "monitoramento",
  "uti",
  "internacao",
  "internação",
  "unidade terapeutica",
  "unidade terapêutica",
  "icu",
  "leito",
  "observacao",
  "observação",
  "frequente",
  "reavaliacao",
  "reavaliação"
];

const OBJETIVOS_HOSPITALIZACAO = [
  "hospitalizacao",
  "hospitalização",
  "internacao",
  "internação",
  "referencia",
  "referência",
  "transferencia",
  "transferência",
  "uti",
  "unidade critica",
  "unidade crítica",
  "leito",
  "admitir"
];

const OBJETIVOS_DIAGNOSTICO_IAM = [
  "iam",
  "infarto agudo do miocardio",
  "infarto",
  "sindrome coronaria aguda",
  "síndrome coronária aguda",
  "sca",
  "angina"
];

const OBJETIVOS_ECG = [
  "ecg",
  "eletrocardiograma",
  "eletrocardiografia",
  "cardiograma",
  "traçado"
];

const OBJETIVOS_TROPONINA = [
  "troponina",
  "troponina i",
  "troponina t",
  "marcador miocardico",
  "marcador miocárdico",
  "biomarcador",
  "enzima cardiaca",
  "enzima cardíaca"
];

const OBJETIVOS_RADIOGRAFIA = [
  "radiografia",
  "rx",
  "raio x",
  "raio-x",
  "radiografia de torax",
  "radiografia de tórax",
  "imaging",
  "imagem"
];

const OBJETIVOS_HEMOGRAMA = [
  "hemograma",
  "cbc",
  "contagem de celulas",
  "contagem de células",
  "leucocitos",
  "leucócitos",
  "hemoglobina",
  "hematocrito",
  "plaquetas",
  "glicemia"
];

const OBJETIVOS_ELETROLITOS = [
  "eletrolitos",
  "eletrólitos",
  "sodio",
  "sódio",
  "potassio",
  "potássio",
  "calcio",
  "cálcio",
  "magnesio",
  "magnésio",
  "cloro",
  "bicaronato",
  "bicarbonato"
];

const OBJETIVOS_FUNCAO_RENAL = [
  "funcao renal",
  "função renal",
  "creatinina",
  "ureia",
  "clearance",
  "filtragao glomerular",
  "filtração glomerular",
  "egfr",
  "insuficiencia renal",
  "insuficiência renal"
];

const OBJETIVOS_ENZIMAS_HEPATICAS = [
  "enzimas hepaticas",
  "enzimas hepáticas",
  "ast",
  "alt",
  "fosfatase alcalina",
  "fosfatase",
  "bilirrubina",
  "albumina",
  "funcao hepatica",
  "função hepática"
];

const OBJETIVOS_GASOMETRIA = [
  "gasometria",
  "gasometria arterial",
  "ga",
  "ph",
  "paco2",
  "pao2",
  "bicarbonato",
  "base deficit",
  "acidose",
  "alcalose"
];

const OBJETIVOS_PCR = [
  "pcr",
  "proteina c reativa",
  "proteína c reativa",
  "marcador inflamacao",
  "marcador inflamação"
];

const OBJETIVOS_ECOCARDIOGRAFIA = [
  "ecocardiografia",
  "ecocardiograma",
  "eco",
  "ultrassom cardiaco",
  "ultrassom cardíaco",
  "feve",
  "funcao ventricula",
  "função ventricular"
];

export const MAPEAMENTO_OBJETIVOS = {
  sinaisVitais: OBJETIVOS_SINAIS_VITAIS,
  auscultaPulmonar: OBJETIVOS_AUSCULTA_PULMONAR,
  percussaoPulmonar: OBJETIVOS_PERCUSSAO_PULMONAR,
  palpacaoToracica: OBJETIVOS_PALPACAO_TORACICA,
  auscultaCardiaca: OBJETIVOS_AUSCULTA_CARDIACA,
  exameAbdome: OBJETIVOS_EXAME_ABDOME,
  membroInferior: OBJETIVOS_MEMBROS_INFERIORES,
  inspecaoGeral: OBJETIVOS_INSPECAO_GERAL,
  palpacaoGeral: OBJETIVOS_PALPACAO_GERAL,
  antibiotico: OBJETIVOS_ANTIBIOTICO,
  oxigenio: OBJETIVOS_OXIGENIO,
  hidratacao: OBJETIVOS_HIDRATACAO,
  monitoramento: OBJETIVOS_MONITORAMENTO,
  hospitalizacao: OBJETIVOS_HOSPITALIZACAO,
  diagnosticoIAM: OBJETIVOS_DIAGNOSTICO_IAM,
  ecg: OBJETIVOS_ECG,
  troponina: OBJETIVOS_TROPONINA,
  radiografia: OBJETIVOS_RADIOGRAFIA,
  hemograma: OBJETIVOS_HEMOGRAMA,
  eletrolitos: OBJETIVOS_ELETROLITOS,
  funcaoRenal: OBJETIVOS_FUNCAO_RENAL,
  enzimasHepaticas: OBJETIVOS_ENZIMAS_HEPATICAS,
  gasometria: OBJETIVOS_GASOMETRIA,
  pcr: OBJETIVOS_PCR,
  ecocardiografia: OBJETIVOS_ECOCARDIOGRAFIA
};

// Identifica quais objetivos foram realizados em um texto
export function identificarObjetivosCumpridos(
  texto: string,
  mapaObjetivos: string[]
): boolean {
  const textoNormalizado = normalizarTexto(texto);

  for (const objetivo of mapaObjetivos) {
    const objetivoNormalizado = normalizarTexto(objetivo);
    if (contemPalavraChave(textoNormalizado, objetivoNormalizado)) {
      return true;
    }
  }

  return false;
}

// Obtém lista de objetivos cumpridos de um texto
export function obterObjetivosCumpridosDoTexto(
  texto: string,
  mapaObjetivos: Record<string, string[]>
): string[] {
  const objetivos: string[] = [];
  const textoNormalizado = normalizarTexto(texto);

  for (const [nomeObjetivo, listaObjetivos] of Object.entries(mapaObjetivos)) {
    for (const objetivo of listaObjetivos) {
      const objetivoNormalizado = normalizarTexto(objetivo);
      if (contemPalavraChave(textoNormalizado, objetivoNormalizado)) {
        if (!objetivos.includes(nomeObjetivo)) {
          objetivos.push(nomeObjetivo);
        }
        break;
      }
    }
  }

  return objetivos;
}
