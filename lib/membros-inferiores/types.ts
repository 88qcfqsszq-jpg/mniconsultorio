// Tipos para avaliação dos membros inferiores

export type Lado = 'direito' | 'esquerdo' | 'bilateral' | 'nao-aplicavel'

export type IntensidadePulso = '0/4' | '1+/4' | '2+/4' | '3+/4'

export type Categoria = 'inspecao' | 'palpacao' | 'pulsos' | 'manobras' | 'medidas' | 'exames'

export type PadraoMembrosInferiores = 'normal' | 'daop' | 'tvp' | 'tep' | 'insuficiencia_venosa' | 'ulcera_arterial' | 'ulcera_venosa'

export interface AchadoMembrosInferiores {
  id: string
  titulo: string
  descricao: string
  categoria: Categoria
  lado?: Lado
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
