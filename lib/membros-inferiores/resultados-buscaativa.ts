import { PadraoMembrosInferiores, RegiaoMembroInferior } from './types'

type ChaveResultado = `${PadraoMembrosInferiores}|${RegiaoMembroInferior}|${string}`

interface Resultado {
  titulo: string
  resultado: string
  alterado?: boolean
}

// Resultados brutos por padrão + região + ação
const resultados: Record<ChaveResultado, Resultado> = {
  // ====== NORMAL ======
  'normal|coxa_direita|inspecionar_geral': {
    titulo: 'Inspeção',
    resultado: 'Coxa direita simétrica, coloração normal, sem edema.',
  },
  'normal|coxa_esquerda|inspecionar_geral': {
    titulo: 'Inspeção',
    resultado: 'Coxa esquerda simétrica, coloração normal, sem edema.',
  },
  'normal|coxa_direita|palpar_pulso_femoral': {
    titulo: 'Pulso femoral direito',
    resultado: 'Pulso femoral direito: 2+/4 (presente e simétrico).',
  },
  'normal|coxa_esquerda|palpar_pulso_femoral': {
    titulo: 'Pulso femoral esquerdo',
    resultado: 'Pulso femoral esquerdo: 2+/4 (presente e simétrico).',
  },
  'normal|regiao_poplitea_direita|palpar_pulso_popliteo': {
    titulo: 'Pulso poplíteo direito',
    resultado: 'Pulso poplíteo direito: 2+/4 (presente).',
  },
  'normal|regiao_poplitea_esquerda|palpar_pulso_popliteo': {
    titulo: 'Pulso poplíteo esquerdo',
    resultado: 'Pulso poplíteo esquerdo: 2+/4 (presente).',
  },
  'normal|panturrilha_direita|inspecionar_geral': {
    titulo: 'Inspeção',
    resultado: 'Panturrilha direita simétrica, coloração normal, sem edema.',
  },
  'normal|panturrilha_esquerda|inspecionar_geral': {
    titulo: 'Inspeção',
    resultado: 'Panturrilha esquerda simétrica, coloração normal, sem edema.',
  },
  'normal|panturrilha_direita|medir_circunferencia_panturrilha': {
    titulo: 'Circunferência da panturrilha',
    resultado: 'Panturrilha direita: 36 cm.',
  },
  'normal|panturrilha_esquerda|medir_circunferencia_panturrilha': {
    titulo: 'Circunferência da panturrilha',
    resultado: 'Panturrilha esquerda: 36 cm.',
  },
  'normal|tornozelo_direito|palpar_pulso_tibial_posterior': {
    titulo: 'Pulso tibial posterior direito',
    resultado: 'Pulso tibial posterior direito: 2+/4 (presente).',
  },
  'normal|tornozelo_esquerdo|palpar_pulso_tibial_posterior': {
    titulo: 'Pulso tibial posterior esquerdo',
    resultado: 'Pulso tibial posterior esquerdo: 2+/4 (presente).',
  },
  'normal|dorso_pe_direito|palpar_pulso_pedioso': {
    titulo: 'Pulso pedioso direito',
    resultado: 'Pulso pedioso direito: 2+/4 (presente).',
  },
  'normal|dorso_pe_esquerdo|palpar_pulso_pedioso': {
    titulo: 'Pulso pedioso esquerdo',
    resultado: 'Pulso pedioso esquerdo: 2+/4 (presente).',
  },
  'normal|dorso_pe_direito|inspecionar_coloracao': {
    titulo: 'Coloração',
    resultado: 'Dorso do pé direito com coloração normal, sem palidez.',
  },
  'normal|dorso_pe_esquerdo|inspecionar_coloracao': {
    titulo: 'Coloração',
    resultado: 'Dorso do pé esquerdo com coloração normal, sem palidez.',
  },
  'normal|dorso_pe_direito|avaliar_temperatura': {
    titulo: 'Temperatura',
    resultado: 'Temperatura preservada no dorso do pé direito.',
  },
  'normal|dorso_pe_esquerdo|avaliar_temperatura': {
    titulo: 'Temperatura',
    resultado: 'Temperatura preservada no dorso do pé esquerdo.',
  },
  'normal|tornozelo_direito|avaliar_edema': {
    titulo: 'Edema',
    resultado: 'Sem edema evidente em tornozelo direito.',
  },
  'normal|tornozelo_esquerdo|avaliar_edema': {
    titulo: 'Edema',
    resultado: 'Sem edema evidente em tornozelo esquerdo.',
  },

  // ====== DAOP ======
  'daop|dorso_pe_direito|inspecionar_coloracao': {
    titulo: 'Coloração',
    resultado: 'Pé direito pálido em repouso, com tendência à rubescência ao pendente.',
    alterado: true,
  },
  'daop|dorso_pe_direito|avaliar_temperatura': {
    titulo: 'Temperatura',
    resultado: 'Pé direito mais frio que o esquerdo.',
    alterado: true,
  },
  'daop|panturrilha_direita|inspecionar_geral': {
    titulo: 'Inspeção',
    resultado: 'Pele da panturrilha direita brilhante, sem pelos (rarefação), compatível com isquemia crônica.',
    alterado: true,
  },
  'daop|dorso_pe_direito|palpar_pulso_pedioso': {
    titulo: 'Pulso pedioso direito',
    resultado: 'Pulso pedioso direito: 0/4 (ausente).',
    alterado: true,
  },
  'daop|tornozelo_direito|palpar_pulso_tibial_posterior': {
    titulo: 'Pulso tibial posterior direito',
    resultado: 'Pulso tibial posterior direito: 0/4 (ausente).',
    alterado: true,
  },
  'daop|coxa_direita|palpar_pulso_femoral': {
    titulo: 'Pulso femoral direito',
    resultado: 'Pulso femoral direito: 2+/4 (presente).',
  },
  'daop|regiao_poplitea_direita|palpar_pulso_popliteo': {
    titulo: 'Pulso poplíteo direito',
    resultado: 'Pulso poplíteo direito: 1+/4 (reduzido).',
    alterado: true,
  },
  'daop|tornozelo_direito|calcular_itb': {
    titulo: 'ITB direito',
    resultado: 'ITB direito: 0,59.',
    alterado: true,
  },
  'daop|tornozelo_esquerdo|calcular_itb': {
    titulo: 'ITB esquerdo',
    resultado: 'ITB esquerdo: 0,99.',
  },
  'daop|panturrilha_direita|prova_marcha': {
    titulo: 'Prova da marcha',
    resultado: 'Paciente interrompe marcha após aproximadamente 80 metros por dor em panturrilha direita, com melhora ao repouso.',
    alterado: true,
  },

  // ====== TVP ======
  'tvp|panturrilha_direita|inspecionar_geral': {
    titulo: 'Inspeção',
    resultado: 'Aumento de volume em panturrilha direita em comparação à esquerda.',
    alterado: true,
  },
  'tvp|panturrilha_direita|palpar': {
    titulo: 'Palpação',
    resultado: 'Dor à palpação profunda da panturrilha direita.',
    alterado: true,
  },
  'tvp|panturrilha_direita|medir_circunferencia_panturrilha': {
    titulo: 'Circunferência da panturrilha',
    resultado: 'Panturrilha direita: 42 cm. Panturrilha esquerda: 36 cm. Diferença de 6 cm.',
    alterado: true,
  },
  'tvp|panturrilha_direita|sinal_bandeira': {
    titulo: 'Sinal da Bandeira',
    resultado: 'Sinal da Bandeira positivo à direita.',
    alterado: true,
  },
  'tvp|panturrilha_direita|sinal_homans': {
    titulo: 'Sinal de Homans',
    resultado: 'Sinal de Homans positivo à direita (ressalva: baixa sensibilidade e especificidade).',
    alterado: true,
  },
  'tvp|panturrilha_direita|sinal_olow': {
    titulo: 'Sinal de Olow',
    resultado: 'Sinal de Olow positivo à direita.',
    alterado: true,
  },
  'tvp|dorso_pe_direito|palpar_pulso_pedioso': {
    titulo: 'Pulso pedioso direito',
    resultado: 'Pulso pedioso direito: 2+/4 (preservado).',
  },
  'tvp|panturrilha_direita|avaliar_edema': {
    titulo: 'Edema',
    resultado: 'Edema com cacifo em panturrilha direita.',
    alterado: true,
  },

  // ====== TEP ======
  'tep|panturrilha_direita|inspecionar_geral': {
    titulo: 'Inspeção',
    resultado: 'Leve edema em panturrilha direita.',
    alterado: true,
  },
  'tep|tornozelo_direito|avaliar_edema': {
    titulo: 'Edema',
    resultado: 'Edema com cacifo em tornozelo direito.',
    alterado: true,
  },
  'tep|panturrilha_direita|palpar': {
    titulo: 'Palpação',
    resultado: 'Leve dor à palpação da panturrilha direita.',
    alterado: true,
  },

  // ====== INSUFICIÊNCIA VENOSA ======
  'insuficiencia_venosa|trajeto_venoso_superficial_direito|procurar_varizes': {
    titulo: 'Varizes',
    resultado: 'Varizes tortuosas visíveis em perna direita, com traçado typical.',
    alterado: true,
  },
  'insuficiencia_venosa|maleolo_medial_direito|avaliar_dermatite_ocre': {
    titulo: 'Dermatite ocre',
    resultado: 'Hiperpigmentação acastanhada em região perimaleolar direita.',
    alterado: true,
  },
  'insuficiencia_venosa|tornozelo_direito|avaliar_edema': {
    titulo: 'Edema',
    resultado: 'Edema com cacifo em tornozelo direito.',
    alterado: true,
  },
  'insuficiencia_venosa|dorso_pe_direito|palpar_pulso_pedioso': {
    titulo: 'Pulso pedioso direito',
    resultado: 'Pulso pedioso direito: 2+/4 (presente e simétrico).',
  },
  'insuficiencia_venosa|panturrilha_direita|medir_circunferencia_panturrilha': {
    titulo: 'Circunferência da panturrilha',
    resultado: 'Panturrilha direita: 38 cm. Panturrilha esquerda: 36 cm. Leve assimetria.',
    alterado: true,
  },

  // ====== ÚLCERA ARTERIAL ======
  'ulcera_arterial|dorso_pe_direito|procurar_lesao_distal': {
    titulo: 'Lesão distal',
    resultado: 'Úlcera de margem bem delimitada em dorso do pé direito, dolorosa, fundo necrótico.',
    alterado: true,
  },
  'ulcera_arterial|dorso_pe_direito|inspecionar_coloracao': {
    titulo: 'Coloração',
    resultado: 'Pé direito pálido, com lesão ulcerada.',
    alterado: true,
  },
  'ulcera_arterial|dorso_pe_direito|avaliar_temperatura': {
    titulo: 'Temperatura',
    resultado: 'Pé direito frio.',
    alterado: true,
  },
  'ulcera_arterial|dorso_pe_direito|palpar_pulso_pedioso': {
    titulo: 'Pulso pedioso direito',
    resultado: 'Pulso pedioso direito: 0/4 (ausente).',
    alterado: true,
  },
  'ulcera_arterial|tornozelo_direito|calcular_itb': {
    titulo: 'ITB direito',
    resultado: 'ITB direito: 0,48 (indicativo de isquemia crítica).',
    alterado: true,
  },

  // ====== ÚLCERA VENOSA ======
  'ulcera_venosa|maleolo_medial_direito|procurar_ulcera_venosa': {
    titulo: 'Úlcera venosa',
    resultado: 'Úlcera de margem irregular em região perimaleolar medial, fundo granuloso, exsudativa.',
    alterado: true,
  },
  'ulcera_venosa|maleolo_medial_direito|avaliar_dermatite_ocre': {
    titulo: 'Dermatite ocre',
    resultado: 'Hiperpigmentação acastanhada perimetral à úlcera.',
    alterado: true,
  },
  'ulcera_venosa|trajeto_venoso_superficial_direito|procurar_varizes': {
    titulo: 'Varizes',
    resultado: 'Varizes visíveis em trajeto superficial.',
    alterado: true,
  },
  'ulcera_venosa|dorso_pe_direito|palpar_pulso_pedioso': {
    titulo: 'Pulso pedioso direito',
    resultado: 'Pulso pedioso direito: 2+/4 (preservado).',
  },
  'ulcera_venosa|tornozelo_direito|avaliar_edema': {
    titulo: 'Edema',
    resultado: 'Edema com cacifo em tornozelo direito.',
    alterado: true,
  },
}

// Função para obter resultado ou fallback normal
export function obterResultadoBuscaAtiva(
  padrao: PadraoMembrosInferiores,
  regiao: RegiaoMembroInferior,
  acaoId: string,
): Resultado {
  const chave: ChaveResultado = `${padrao}|${regiao}|${acaoId}`

  if (resultados[chave]) {
    return resultados[chave]
  }

  // Fallback para resultado normal/neutro
  return obterResultadoNeutro(acaoId)
}

function obterResultadoNeutro(acaoId: string): Resultado {
  const neutros: Record<string, Resultado> = {
    inspecionar_geral: { titulo: 'Inspeção', resultado: 'Sem alteração evidente nessa região.' },
    inspecionar_coloracao: { titulo: 'Coloração', resultado: 'Coloração normal, sem palidez ou alteração.' },
    palpar: { titulo: 'Palpação', resultado: 'Sem dor à palpação nessa região.' },
    avaliar_temperatura: { titulo: 'Temperatura', resultado: 'Temperatura preservada.' },
    avaliar_edema: { titulo: 'Edema', resultado: 'Sem edema evidente nessa região.' },
    avaliar_enchimento_capilar: { titulo: 'Enchimento capilar', resultado: 'Enchimento capilar normal (<2 segundos).' },
    avaliar_trofismo: { titulo: 'Trofismo', resultado: 'Trofismo preservado nessa região.' },
    procurar_lesao_distal: { titulo: 'Lesão distal', resultado: 'Sem lesões visíveis nessa região.' },
    procurar_varizes: { titulo: 'Varizes', resultado: 'Sem varizes visíveis nessa região.' },
    procurar_telangiectasias: { titulo: 'Telangiectasias', resultado: 'Sem telangiectasias visíveis nessa região.' },
    procurar_ulcera_venosa: { titulo: 'Úlcera venosa', resultado: 'Sem úlcera venosa nessa região.' },
    avaliar_dermatite_ocre: { titulo: 'Dermatite ocre', resultado: 'Sem dermatite ocre nessa região.' },
    palpar_pulso_femoral: { titulo: 'Pulso femoral', resultado: 'Pulso femoral 2+/4 (presente).' },
    palpar_pulso_popliteo: { titulo: 'Pulso poplíteo', resultado: 'Pulso poplíteo 2+/4 (presente).' },
    palpar_pulso_tibial_posterior: { titulo: 'Pulso tibial posterior', resultado: 'Pulso tibial posterior 2+/4 (presente).' },
    palpar_pulso_pedioso: { titulo: 'Pulso pedioso', resultado: 'Pulso pedioso 2+/4 (presente).' },
    sinal_homans: { titulo: 'Sinal de Homans', resultado: 'Sinal de Homans negativo nessa região.' },
    sinal_olow: { titulo: 'Sinal de Olow', resultado: 'Sinal de Olow negativo nessa região.' },
    sinal_bancroft_moses: { titulo: 'Sinal de Bancroft/Moses', resultado: 'Sinal de Bancroft/Moses negativo nessa região.' },
    sinal_bandeira: { titulo: 'Sinal da Bandeira', resultado: 'Sinal da Bandeira negativo nessa região.' },
    avaliar_dor_posterior: { titulo: 'Dor posterior', resultado: 'Sem dor posterior nessa região.' },
    prova_marcha: { titulo: 'Prova da marcha', resultado: 'Marcha preservada, sem claudicação.' },
    avaliar_assimetria: { titulo: 'Assimetria', resultado: 'Sem assimetria significativa.' },
    medir_circunferencia_panturrilha: { titulo: 'Circunferência', resultado: 'Circunferência da panturrilha: 36 cm.' },
    calcular_itb: { titulo: 'ITB', resultado: 'ITB: 0,95 (normal).' },
    solicitar_doppler_arterial: { titulo: 'Doppler arterial', resultado: 'Pode ser solicitado conforme julgamento clínico.' },
    solicitar_doppler_venoso: { titulo: 'Doppler venoso', resultado: 'Pode ser solicitado conforme julgamento clínico.' },
    solicitar_ddimero: { titulo: 'D-dímero', resultado: 'Pode ser solicitado conforme julgamento clínico.' },
    solicitar_angio_tc: { titulo: 'Angio-TC', resultado: 'Pode ser solicitado conforme julgamento clínico.' },
  }

  return neutros[acaoId] || { titulo: 'Achado', resultado: 'Sem achado específico registrado.' }
}
