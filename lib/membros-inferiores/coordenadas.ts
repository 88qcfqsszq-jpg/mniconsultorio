// Coordenadas das regiões clicáveis em porcentagem
// Baseado em vista anterior do paciente
// IMPORTANTE: direita/esquerda refere-se ao lado anatômico do paciente
// Na tela: lado direito do paciente aparece à esquerda visual

export interface RegiaoCoordenada {
  id: string
  label: string
  x: number // porcentagem desde esquerda
  y: number // porcentagem desde topo
  width: number // largura em porcentagem
  height: number // altura em porcentagem
}

export const REGIOES_MEMBROS_INFERIORES: RegiaoCoordenada[] = [
  // COXAS
  {
    id: 'coxa_direita',
    label: 'Coxa direita',
    x: 22,
    y: 12,
    width: 22,
    height: 26,
  },
  {
    id: 'coxa_esquerda',
    label: 'Coxa esquerda',
    x: 56,
    y: 12,
    width: 22,
    height: 26,
  },

  // JOELHOS (como parte da transição)
  {
    id: 'joelho_direito',
    label: 'Joelho direito',
    x: 28,
    y: 37,
    width: 10,
    height: 8,
  },
  {
    id: 'joelho_esquerdo',
    label: 'Joelho esquerdo',
    x: 62,
    y: 37,
    width: 10,
    height: 8,
  },

  // REGIÃO POPLÍTEA (posterior ao joelho)
  {
    id: 'regiao_poplitea_direita',
    label: 'Região poplítea direita',
    x: 28,
    y: 38,
    width: 10,
    height: 7,
  },
  {
    id: 'regiao_poplitea_esquerda',
    label: 'Região poplítea esquerda',
    x: 62,
    y: 38,
    width: 10,
    height: 7,
  },

  // PANTURRILHAS
  {
    id: 'panturrilha_direita',
    label: 'Panturrilha direita',
    x: 26,
    y: 44,
    width: 14,
    height: 28,
  },
  {
    id: 'panturrilha_esquerda',
    label: 'Panturrilha esquerda',
    x: 60,
    y: 44,
    width: 14,
    height: 28,
  },

  // TORNOZELOS
  {
    id: 'tornozelo_direito',
    label: 'Tornozelo direito',
    x: 28,
    y: 71,
    width: 10,
    height: 6,
  },
  {
    id: 'tornozelo_esquerdo',
    label: 'Tornozelo esquerdo',
    x: 62,
    y: 71,
    width: 10,
    height: 6,
  },

  // MALÉOLO MEDIAL (interno)
  {
    id: 'maleolo_medial_direito',
    label: 'Maléolo medial direito',
    x: 37,
    y: 74,
    width: 6,
    height: 5,
  },
  {
    id: 'maleolo_medial_esquerdo',
    label: 'Maléolo medial esquerdo',
    x: 57,
    y: 74,
    width: 6,
    height: 5,
  },

  // DORSO DO PÉ
  {
    id: 'dorso_pe_direito',
    label: 'Dorso do pé direito',
    x: 22,
    y: 76,
    width: 16,
    height: 12,
  },
  {
    id: 'dorso_pe_esquerdo',
    label: 'Dorso do pé esquerdo',
    x: 62,
    y: 76,
    width: 16,
    height: 12,
  },

  // PLANTA DO PÉ
  {
    id: 'planta_pe_direito',
    label: 'Planta do pé direito',
    x: 22,
    y: 87,
    width: 16,
    height: 8,
  },
  {
    id: 'planta_pe_esquerdo',
    label: 'Planta do pé esquerdo',
    x: 62,
    y: 87,
    width: 16,
    height: 8,
  },

  // HÁLUX (polegar do pé)
  {
    id: 'halux_direito',
    label: 'Hálux direito',
    x: 40,
    y: 84,
    width: 4,
    height: 6,
  },
  {
    id: 'halux_esquerdo',
    label: 'Hálux esquerdo',
    x: 56,
    y: 84,
    width: 4,
    height: 6,
  },

  // TRAJETO VENOSO SUPERFICIAL
  {
    id: 'trajeto_venoso_superficial_direito',
    label: 'Trajeto venoso superficial direito',
    x: 20,
    y: 15,
    width: 8,
    height: 55,
  },
  {
    id: 'trajeto_venoso_superficial_esquerdo',
    label: 'Trajeto venoso superficial esquerdo',
    x: 72,
    y: 15,
    width: 8,
    height: 55,
  },
]

export function obterRegiaoCoordenada(regiaId: string): RegiaoCoordenada | undefined {
  return REGIOES_MEMBROS_INFERIORES.find(r => r.id === regiaId)
}

export function obterRegioesPorLado(lado: 'direito' | 'esquerdo'): RegiaoCoordenada[] {
  return REGIOES_MEMBROS_INFERIORES.filter(r => r.id.includes(lado))
}
