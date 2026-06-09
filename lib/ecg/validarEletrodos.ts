import { ECGLeadPosition, ECGPlacementResult, ECGZone } from './types'

// Definir as zonas corretas para cada eletrodo (em porcentagem)
// Assumindo que a imagem tem 100% de largura e altura
const ECG_ZONES: ECGZone[] = [
  {
    lead: 'V1',
    x: { min: 45, max: 55 },
    y: { min: 35, max: 45 },
    descricao: '4º espaço intercostal, borda esternal direita',
  },
  {
    lead: 'V2',
    x: { min: 40, max: 50 },
    y: { min: 35, max: 45 },
    descricao: '4º espaço intercostal, borda esternal esquerda',
  },
  {
    lead: 'V3',
    x: { min: 35, max: 50 },
    y: { min: 38, max: 48 },
    descricao: 'Entre V2 e V4',
  },
  {
    lead: 'V4',
    x: { min: 30, max: 45 },
    y: { min: 40, max: 50 },
    descricao: '5º espaço intercostal, linha hemiclavicular esquerda',
  },
  {
    lead: 'V5',
    x: { min: 25, max: 40 },
    y: { min: 40, max: 50 },
    descricao: 'Linha axilar anterior esquerda, mesmo nível de V4',
  },
  {
    lead: 'V6',
    x: { min: 20, max: 35 },
    y: { min: 40, max: 50 },
    descricao: 'Linha axilar média esquerda, mesmo nível de V4',
  },
  {
    lead: 'RA',
    x: { min: 70, max: 85 },
    y: { min: 15, max: 30 },
    descricao: 'Membro superior direito',
  },
  {
    lead: 'LA',
    x: { min: 15, max: 30 },
    y: { min: 15, max: 30 },
    descricao: 'Membro superior esquerdo',
  },
  {
    lead: 'RL',
    x: { min: 70, max: 85 },
    y: { min: 70, max: 85 },
    descricao: 'Membro inferior direito',
  },
  {
    lead: 'LL',
    x: { min: 15, max: 30 },
    y: { min: 70, max: 85 },
    descricao: 'Membro inferior esquerdo',
  },
]

function obterZona(lead: string): ECGZone | undefined {
  return ECG_ZONES.find((z) => z.lead === lead)
}

function estaProximo(
  valor: number,
  min: number,
  max: number,
  tolerancia: number = 10
): boolean {
  return valor >= min - tolerancia && valor <= max + tolerancia
}

export function validarEletrodos(eletrodos: ECGLeadPosition[]): ECGPlacementResult {
  const eletrodosCorretos: string[] = []
  const eletrodosAusentes: string[] = []
  const eletrodosMalPosicionados: string[] = []
  const mensagensTecnicas: string[] = []

  // Verificar cada eletrodo esperado
  for (const zona of ECG_ZONES) {
    const eletrodo = eletrodos.find((e) => e.lead === zona.lead)

    if (!eletrodo || !eletrodo.isPlaced) {
      eletrodosAusentes.push(zona.lead)
      mensagensTecnicas.push(`${zona.lead} não foi colocado. ${zona.descricao}`)
      continue
    }

    // Verificar se está na zona correta
    const dentroZona =
      eletrodo.x >= zona.x.min &&
      eletrodo.x <= zona.x.max &&
      eletrodo.y >= zona.y.min &&
      eletrodo.y <= zona.y.max

    if (dentroZona) {
      eletrodosCorretos.push(zona.lead)
    } else {
      // Verificar se está próximo (tolerância de 10%)
      const proximo =
        estaProximo(eletrodo.x, zona.x.min, zona.x.max, 10) &&
        estaProximo(eletrodo.y, zona.y.min, zona.y.max, 10)

      if (proximo) {
        eletrodosCorretos.push(zona.lead)
        mensagensTecnicas.push(
          `⚠️ ${zona.lead} está próximo da posição correta. ${zona.descricao}`
        )
      } else {
        eletrodosMalPosicionados.push(zona.lead)
        mensagensTecnicas.push(
          `❌ ${zona.lead} está mal posicionado. ${zona.descricao}`
        )
      }
    }
  }

  const percentualAcerto = (eletrodosCorretos.length / 10) * 100
  const exameTecnicamenteAdequado = eletrodosCorretos.length >= 8

  if (!exameTecnicamenteAdequado) {
    mensagensTecnicas.push(
      `Exame tecnicamente inadequado. ${eletrodosCorretos.length}/10 eletrodos corretos. Reposicione os eletrodos.`
    )
  } else {
    mensagensTecnicas.push(`✅ Exame tecnicamente adequado (${percentualAcerto.toFixed(0)}%)`)
  }

  return {
    eletrodosCorretos: eletrodosCorretos as any[],
    eletrodosAusentes: eletrodosAusentes as any[],
    eletrodosMalPosicionados: eletrodosMalPosicionados as any[],
    percentualAcerto,
    exameTecnicamenteAdequado,
    mensagensTecnicas,
  }
}
