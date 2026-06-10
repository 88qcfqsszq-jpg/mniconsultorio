import { DefinicaoRegiaoMembro, AcaoBuscaAtiva } from './types'

// Definições de ações por aba
const acoesInspecao: AcaoBuscaAtiva[] = [
  {
    id: 'inspecionar_coloracao',
    label: 'Inspecionar coloração',
    categoria: 'inspecao',
    regioesPermitidas: ['dorso_pe_direito', 'dorso_pe_esquerdo', 'planta_pe_direito', 'planta_pe_esquerdo', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'inspecionar_geral',
    label: 'Inspecionar região',
    categoria: 'inspecao',
    regioesPermitidas: ['coxa_direita', 'coxa_esquerda', 'regiao_poplitea_direita', 'regiao_poplitea_esquerda', 'panturrilha_direita', 'panturrilha_esquerda', 'tornozelo_direito', 'tornozelo_esquerdo', 'maleolo_medial_direito', 'maleolo_medial_esquerdo'],
  },
  {
    id: 'procurar_lesao_distal',
    label: 'Procurar lesão distal',
    categoria: 'inspecao',
    regioesPermitidas: ['dorso_pe_direito', 'dorso_pe_esquerdo', 'planta_pe_direito', 'planta_pe_esquerdo', 'halux_direito', 'halux_esquerdo'],
  },
  {
    id: 'procurar_ulcera_venosa',
    label: 'Procurar úlcera venosa',
    categoria: 'inspecao',
    regioesPermitidas: ['maleolo_medial_direito', 'maleolo_medial_esquerdo', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'procurar_varizes',
    label: 'Procurar varizes',
    categoria: 'inspecao',
    regioesPermitidas: ['trajeto_venoso_superficial_direito', 'trajeto_venoso_superficial_esquerdo', 'coxa_direita', 'coxa_esquerda', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'procurar_telangiectasias',
    label: 'Procurar telangiectasias',
    categoria: 'inspecao',
    regioesPermitidas: ['trajeto_venoso_superficial_direito', 'trajeto_venoso_superficial_esquerdo'],
  },
  {
    id: 'avaliar_dermatite_ocre',
    label: 'Avaliar dermatite ocre',
    categoria: 'inspecao',
    regioesPermitidas: ['maleolo_medial_direito', 'maleolo_medial_esquerdo'],
  },
]

const acoesPalpacao: AcaoBuscaAtiva[] = [
  {
    id: 'palpar',
    label: 'Palpar',
    categoria: 'palpacao',
    regioesPermitidas: ['coxa_direita', 'coxa_esquerda', 'regiao_poplitea_direita', 'regiao_poplitea_esquerda', 'panturrilha_direita', 'panturrilha_esquerda', 'tornozelo_direito', 'tornozelo_esquerdo', 'maleolo_medial_direito', 'maleolo_medial_esquerdo'],
  },
  {
    id: 'avaliar_temperatura',
    label: 'Avaliar temperatura',
    categoria: 'palpacao',
    regioesPermitidas: ['dorso_pe_direito', 'dorso_pe_esquerdo', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'avaliar_edema',
    label: 'Avaliar edema com cacifo',
    categoria: 'palpacao',
    regioesPermitidas: ['tornozelo_direito', 'tornozelo_esquerdo', 'maleolo_medial_direito', 'maleolo_medial_esquerdo', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'avaliar_enchimento_capilar',
    label: 'Avaliar enchimento capilar',
    categoria: 'palpacao',
    regioesPermitidas: ['dorso_pe_direito', 'dorso_pe_esquerdo', 'halux_direito', 'halux_esquerdo'],
  },
  {
    id: 'avaliar_trofismo',
    label: 'Avaliar trofismo',
    categoria: 'palpacao',
    regioesPermitidas: ['dorso_pe_direito', 'dorso_pe_esquerdo', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
]

const acoesPulsos: AcaoBuscaAtiva[] = [
  {
    id: 'palpar_pulso_femoral',
    label: 'Palpar pulso femoral',
    categoria: 'pulsos',
    regioesPermitidas: ['coxa_direita', 'coxa_esquerda'],
  },
  {
    id: 'palpar_pulso_popliteo',
    label: 'Palpar pulso poplíteo',
    categoria: 'pulsos',
    regioesPermitidas: ['regiao_poplitea_direita', 'regiao_poplitea_esquerda'],
  },
  {
    id: 'palpar_pulso_tibial_posterior',
    label: 'Palpar pulso tibial posterior',
    categoria: 'pulsos',
    regioesPermitidas: ['tornozelo_direito', 'tornozelo_esquerdo', 'maleolo_medial_direito', 'maleolo_medial_esquerdo'],
  },
  {
    id: 'palpar_pulso_pedioso',
    label: 'Palpar pulso pedioso',
    categoria: 'pulsos',
    regioesPermitidas: ['dorso_pe_direito', 'dorso_pe_esquerdo'],
  },
]

const acoesManobras: AcaoBuscaAtiva[] = [
  {
    id: 'sinal_homans',
    label: 'Sinal de Homans',
    categoria: 'manobras',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'sinal_olow',
    label: 'Sinal de Olow',
    categoria: 'manobras',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'sinal_bancroft_moses',
    label: 'Sinal de Bancroft/Moses',
    categoria: 'manobras',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'sinal_bandeira',
    label: 'Sinal da Bandeira',
    categoria: 'manobras',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'avaliar_dor_posterior',
    label: 'Avaliar dor posterior',
    categoria: 'manobras',
    regioesPermitidas: ['regiao_poplitea_direita', 'regiao_poplitea_esquerda'],
  },
  {
    id: 'prova_marcha',
    label: 'Prova da marcha',
    categoria: 'manobras',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'avaliar_assimetria',
    label: 'Avaliar assimetria',
    categoria: 'manobras',
    regioesPermitidas: ['coxa_direita', 'coxa_esquerda', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
]

const acoesMedidas: AcaoBuscaAtiva[] = [
  {
    id: 'medir_circunferencia_panturrilha',
    label: 'Medir circunferência da panturrilha',
    categoria: 'medidas',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'calcular_itb',
    label: 'Calcular ITB (Índice tornozelo-braquial)',
    categoria: 'medidas',
    regioesPermitidas: ['tornozelo_direito', 'tornozelo_esquerdo'],
  },
]

const acoesExames: AcaoBuscaAtiva[] = [
  {
    id: 'solicitar_doppler_arterial',
    label: 'Solicitar Doppler arterial',
    categoria: 'exames',
    regioesPermitidas: ['coxa_direita', 'coxa_esquerda', 'regiao_poplitea_direita', 'regiao_poplitea_esquerda', 'panturrilha_direita', 'panturrilha_esquerda', 'tornozelo_direito', 'tornozelo_esquerdo', 'dorso_pe_direito', 'dorso_pe_esquerdo'],
  },
  {
    id: 'solicitar_doppler_venoso',
    label: 'Solicitar Doppler venoso',
    categoria: 'exames',
    regioesPermitidas: ['coxa_direita', 'coxa_esquerda', 'panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'solicitar_ddimero',
    label: 'Solicitar D-dímero',
    categoria: 'exames',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda'],
  },
  {
    id: 'solicitar_angio_tc',
    label: 'Solicitar angio-TC de tórax',
    categoria: 'exames',
    regioesPermitidas: ['panturrilha_direita', 'panturrilha_esquerda', 'maleolo_medial_direito', 'maleolo_medial_esquerdo'],
  },
]

// Definição de regiões com ações disponíveis
export const regioesMembroInferior: DefinicaoRegiaoMembro[] = [
  {
    id: 'coxa_direita',
    nome: 'Coxa direita',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('coxa_direita')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('coxa_direita')),
      ...acoesManobras.filter(a => a.regioesPermitidas.includes('coxa_direita')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('coxa_direita')),
    ],
  },
  {
    id: 'coxa_esquerda',
    nome: 'Coxa esquerda',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('coxa_esquerda')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('coxa_esquerda')),
      ...acoesManobras.filter(a => a.regioesPermitidas.includes('coxa_esquerda')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('coxa_esquerda')),
    ],
  },
  {
    id: 'regiao_poplitea_direita',
    nome: 'Região poplítea direita',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('regiao_poplitea_direita')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('regiao_poplitea_direita')),
      ...acoesManobras.filter(a => a.regioesPermitidas.includes('regiao_poplitea_direita')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('regiao_poplitea_direita')),
    ],
  },
  {
    id: 'regiao_poplitea_esquerda',
    nome: 'Região poplítea esquerda',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('regiao_poplitea_esquerda')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('regiao_poplitea_esquerda')),
      ...acoesManobras.filter(a => a.regioesPermitidas.includes('regiao_poplitea_esquerda')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('regiao_poplitea_esquerda')),
    ],
  },
  {
    id: 'panturrilha_direita',
    nome: 'Panturrilha direita',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('panturrilha_direita')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('panturrilha_direita')),
      ...acoesManobras.filter(a => a.regioesPermitidas.includes('panturrilha_direita')),
      ...acoesMedidas.filter(a => a.regioesPermitidas.includes('panturrilha_direita')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('panturrilha_direita')),
    ],
  },
  {
    id: 'panturrilha_esquerda',
    nome: 'Panturrilha esquerda',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('panturrilha_esquerda')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('panturrilha_esquerda')),
      ...acoesManobras.filter(a => a.regioesPermitidas.includes('panturrilha_esquerda')),
      ...acoesMedidas.filter(a => a.regioesPermitidas.includes('panturrilha_esquerda')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('panturrilha_esquerda')),
    ],
  },
  {
    id: 'tornozelo_direito',
    nome: 'Tornozelo direito',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('tornozelo_direito')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('tornozelo_direito')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('tornozelo_direito')),
      ...acoesMedidas.filter(a => a.regioesPermitidas.includes('tornozelo_direito')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('tornozelo_direito')),
    ],
  },
  {
    id: 'tornozelo_esquerdo',
    nome: 'Tornozelo esquerdo',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('tornozelo_esquerdo')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('tornozelo_esquerdo')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('tornozelo_esquerdo')),
      ...acoesMedidas.filter(a => a.regioesPermitidas.includes('tornozelo_esquerdo')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('tornozelo_esquerdo')),
    ],
  },
  {
    id: 'maleolo_medial_direito',
    nome: 'Maléolo medial direito',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('maleolo_medial_direito')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('maleolo_medial_direito')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('maleolo_medial_direito')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('maleolo_medial_direito')),
    ],
  },
  {
    id: 'maleolo_medial_esquerdo',
    nome: 'Maléolo medial esquerdo',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('maleolo_medial_esquerdo')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('maleolo_medial_esquerdo')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('maleolo_medial_esquerdo')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('maleolo_medial_esquerdo')),
    ],
  },
  {
    id: 'dorso_pe_direito',
    nome: 'Dorso do pé direito',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('dorso_pe_direito')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('dorso_pe_direito')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('dorso_pe_direito')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('dorso_pe_direito')),
    ],
  },
  {
    id: 'dorso_pe_esquerdo',
    nome: 'Dorso do pé esquerdo',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('dorso_pe_esquerdo')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('dorso_pe_esquerdo')),
      ...acoesPulsos.filter(a => a.regioesPermitidas.includes('dorso_pe_esquerdo')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('dorso_pe_esquerdo')),
    ],
  },
  {
    id: 'planta_pe_direito',
    nome: 'Planta do pé direito',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('planta_pe_direito')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('planta_pe_direito')),
    ],
  },
  {
    id: 'planta_pe_esquerdo',
    nome: 'Planta do pé esquerdo',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('planta_pe_esquerdo')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('planta_pe_esquerdo')),
    ],
  },
  {
    id: 'halux_direito',
    nome: 'Hálux direito',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('halux_direito')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('halux_direito')),
    ],
  },
  {
    id: 'halux_esquerdo',
    nome: 'Hálux esquerdo',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('halux_esquerdo')),
      ...acoesPalpacao.filter(a => a.regioesPermitidas.includes('halux_esquerdo')),
    ],
  },
  {
    id: 'trajeto_venoso_superficial_direito',
    nome: 'Trajeto venoso superficial direito',
    lado: 'direito',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('trajeto_venoso_superficial_direito')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('trajeto_venoso_superficial_direito')),
    ],
  },
  {
    id: 'trajeto_venoso_superficial_esquerdo',
    nome: 'Trajeto venoso superficial esquerdo',
    lado: 'esquerdo',
    acoesDisponiveis: [
      ...acoesInspecao.filter(a => a.regioesPermitidas.includes('trajeto_venoso_superficial_esquerdo')),
      ...acoesExames.filter(a => a.regioesPermitidas.includes('trajeto_venoso_superficial_esquerdo')),
    ],
  },
]

export function obterRegiaoMembro(regiao: string): DefinicaoRegiaoMembro | undefined {
  return regioesMembroInferior.find(r => r.id === regiao)
}

export function obterAcoesRegiao(regiao: string): AcaoBuscaAtiva[] {
  const definicao = obterRegiaoMembro(regiao)
  return definicao ? definicao.acoesDisponiveis : []
}
