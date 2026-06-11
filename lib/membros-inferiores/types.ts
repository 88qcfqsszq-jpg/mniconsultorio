// Tipos para avaliação dos membros inferiores

export type Lado = 'direito' | 'esquerdo' | 'bilateral' | 'nao-aplicavel'

export type IntensidadePulso = '0/4' | '1+/4' | '2+/4' | '3+/4'

export type Categoria = 'inspecao' | 'palpacao' | 'pulsos' | 'manobras' | 'medidas' | 'exames'

export type PadraoMembrosInferiores = 'normal' | 'daop' | 'tvp' | 'tep' | 'insuficiencia_venosa' | 'ulcera_arterial' | 'ulcera_venosa'

export type RegiaoMembroInferior =
  | 'coxa_direita'
  | 'coxa_esquerda'
  | 'regiao_poplitea_direita'
  | 'regiao_poplitea_esquerda'
  | 'panturrilha_direita'
  | 'panturrilha_esquerda'
  | 'tornozelo_direito'
  | 'tornozelo_esquerdo'
  | 'maleolo_medial_direito'
  | 'maleolo_medial_esquerdo'
  | 'dorso_pe_direito'
  | 'dorso_pe_esquerdo'
  | 'planta_pe_direito'
  | 'planta_pe_esquerdo'
  | 'halux_direito'
  | 'halux_esquerdo'
  | 'trajeto_venoso_superficial_direito'
  | 'trajeto_venoso_superficial_esquerdo'

export interface AchadoMembrosInferiores {
  id: string
  titulo: string
  descricao: string
  categoria: Categoria
  lado?: Lado
  regiao?: RegiaoMembroInferior
  acaoRealizada?: string
}

export interface ResultadoPulso {
  femoralDireito?: IntensidadePulso
  femoralEsquerdo?: IntensidadePulso
  popliteoDireito?: IntensidadePulso
  popliteoEsquerdo?: IntensidadePulso
  tibialPosteriorDireito?: IntensidadePulso
  tibialPosteriorEsquerdo?: IntensidadePulso
  pediosoDireito?: IntensidadePulso
  pediosoEsquerdo?: IntensidadePulso
}

export interface MedidasMembrosInferiores {
  panturrilhaDireita?: number
  panturrilhaEsquerda?: number
  pasBraquialDireita?: number
  pasBraquialEsquerda?: number
  pasTornozeloDireito?: number
  pasTornozeloEsquerdo?: number
  itbDireito?: number
  itbEsquerdo?: number
}

export interface ResultadoMembrosInferiores {
  padrao: PadraoMembrosInferiores
  achados: AchadoMembrosInferiores[]
  pulsos?: ResultadoPulso
  medidas?: MedidasMembrosInferiores
}

export interface AcaoMembrosInferiores {
  id: string
  titulo: string
  descricao: string
  aba: 'inspecao' | 'pulsos' | 'manobras' | 'medidas' | 'exames'
  funcao: (padrao: PadraoMembrosInferiores) => AchadoMembrosInferiores | AchadoMembrosInferiores[] | null
}

export interface AcaoBuscaAtiva {
  id: string
  label: string
  categoria: Categoria
  regioesPermitidas: RegiaoMembroInferior[]
}

export interface ResultadoBuscaAtiva {
  id: string
  regiao: RegiaoMembroInferior
  acaoId: string
  acaoLabel: string
  resultado: string
  alterado?: boolean
}

export interface DefinicaoRegiaoMembro {
  id: RegiaoMembroInferior
  nome: string
  lado: 'direito' | 'esquerdo'
  acoesDisponiveis: AcaoBuscaAtiva[]
}

export type PulsoArterialMI =
  | 'femoral_direita'
  | 'femoral_esquerda'
  | 'poplitea_direita'
  | 'poplitea_esquerda'
  | 'tibial_posterior_direita'
  | 'tibial_posterior_esquerda'
  | 'dorsal_pe_direita'
  | 'dorsal_pe_esquerda'

export interface PulsoArterial {
  id: PulsoArterialMI
  label: string
  labelCurto: string
  vista: 'frontal' | 'posterior' | 'plantar'
  regiaoClinica: string
  x: number
  y: number
  tolerancia: number
}

export interface PulsoPositionado {
  id: PulsoArterialMI
  xDrop: number
  yDrop: number
  vista: 'frontal' | 'posterior' | 'plantar'
}
