export function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

const sinonimosClinicosComuns: Record<string, string[]> = {
  tuberculose: ["tb", "tuberculose pulmonar", "tb pulmonar", "tuberculose ativa"],
  pneumonia: ["pneumonia adquirida", "pneumonia da comunidade", "pac"],
  "síndrome coronariana": ["sca", "infarto", "iam", "dor torácica isquêmica", "angina"],
  "infarto agudo": ["iam", "infarto do miocárdio", "sca"],
  insuficiência: ["ic", "insuficiência cardíaca", "ic descompensada"],
  asma: ["crise asmática", "asma aguda"],
  dpoc: ["exacerbação de dpoc", "dpoc exacerbado", "doença pulmonar obstrutiva"],
  diabetes: ["dm", "diabetes mellitus"],
  hipertensão: ["hats", "hipertensão arterial"],
  dengue: ["dengue hemorrágica", "dengue com manifestações hemorrágicas"],
  pneumotórax: ["pneumotórax espontâneo", "colapso pulmonar"],
  "tromboembolismo": ["tep", "tromboembolismo pulmonar", "embolia pulmonar"],
  apendicite: ["abdômen agudo", "apendicite aguda"],
  colecistite: ["cólica biliar", "colecistite aguda"],
  "gastroenterite": ["gastroenterite viral", "gastroenterite bacteriana"],
  meningite: ["meningite viral", "meningite bacteriana"],
  sepse: ["choque séptico", "sepse grave"],
};

export function verificarDiagnosticoCompativel(
  diagnosticoAluno: string,
  diagnosticoEsperado: string
): boolean {
  if (!diagnosticoAluno || !diagnosticoEsperado) {
    return false;
  }

  const normalAluno = normalizarTexto(diagnosticoAluno);
  const normalEsperado = normalizarTexto(diagnosticoEsperado);

  // Comparação exata normalizada
  if (normalAluno === normalEsperado) {
    return true;
  }

  // Verificar se um contém o outro (significativo)
  const palavrasAluno = normalAluno.split(/\s+/);
  const palavrasEsperado = normalEsperado.split(/\s+/);

  // Se a palavra principal está em ambos
  const palavraPrincipalAluno = palavrasAluno[0];
  const palavraPrincipalEsperado = palavrasEsperado[0];

  if (palavraPrincipalAluno === palavraPrincipalEsperado) {
    return true;
  }

  // Verificar sinônimos em ambas as direções
  for (const [chave, sinonimos] of Object.entries(sinonimosClinicosComuns)) {
    const normalChave = normalizarTexto(chave);
    const contemChaveAluno = normalAluno.includes(normalChave);
    const contemChaveEsperado = normalEsperado.includes(normalChave);

    if (contemChaveAluno && contemChaveEsperado) {
      return true;
    }

    // Verificar se algum sinônimo está em ambos
    for (const sinonimo of sinonimos) {
      const normalSinonimo = normalizarTexto(sinonimo);
      if (
        normalAluno.includes(normalSinonimo) &&
        normalEsperado.includes(normalSinonimo)
      ) {
        return true;
      }

      // Verificar se sinônimo do aluno existe em esperado (em qualquer chave/sinônimo)
      if (normalSinonimo === normalAluno) {
        // O que o aluno digitou é um sinônimo, verificar se esperado tem essa chave
        const contemEsperado =
          normalEsperado.includes(normalChave) ||
          sinonimos.some((s) => normalEsperado.includes(normalizarTexto(s)));
        if (contemEsperado) {
          return true;
        }
      }
    }

    // Se aluno é exatamente um sinônimo e esperado é a chave
    if (
      sinonimos.some((s) => normalizarTexto(s) === normalAluno) &&
      normalEsperado.includes(normalChave)
    ) {
      return true;
    }
  }

  // Verificar se aluno é abreviação que consta como sinônimo
  for (const [chave, sinonimos] of Object.entries(sinonimosClinicosComuns)) {
    const normalChave = normalizarTexto(chave);
    const estaEmSinonimos = sinonimos.some(
      (s) => normalizarTexto(s) === normalAluno
    );
    const esperadoTemChave = normalEsperado.includes(normalChave);

    if (estaEmSinonimos && esperadoTemChave) {
      return true;
    }

    // Também verificar se esperado é um sinônimo e aluno é a chave
    const esperadoEhSinonimo = sinonimos.some(
      (s) => normalizarTexto(s) === normalEsperado
    );
    if (esperadoEhSinonimo && normalAluno.includes(normalChave)) {
      return true;
    }
  }

  // Última chance: verificar sobreposição significativa de palavras
  const overlap = palavrasAluno.filter((p) =>
    palavrasEsperado.some((pe) => pe.includes(p) || p.includes(pe))
  );

  return overlap.length >= Math.min(2, Math.ceil(palavrasEsperado.length / 2));
}
