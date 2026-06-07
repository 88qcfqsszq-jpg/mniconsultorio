import { NextRequest, NextResponse } from "next/server";

function parseJSONSeguro(respostaRaw: string) {
  try {
    return JSON.parse(respostaRaw);
  } catch (erroInicial) {
    const inicio = respostaRaw.indexOf("{");
    const fim = respostaRaw.lastIndexOf("}");

    if (inicio !== -1 && fim !== -1 && fim > inicio) {
      const jsonExtraido = respostaRaw.slice(inicio, fim + 1);
      return JSON.parse(jsonExtraido);
    }

    throw erroInicial;
  }
}

function gerarFallback(diagnosticoEsperado: string) {
  return {
    titulo: "Como conduzir este caso na prática",
    subtitulo: "Mini-aula objetiva de especialista para revisar a condução ideal deste atendimento.",
    diagnosticoBase: diagnosticoEsperado || "Caso clínico",
    especialidadeReferencia: "Clínica Médica",
    resumoEspecialista: "",
    secoes: [
      {
        titulo: "1. Visão do especialista",
        texto: "O especialista avalia este caso considerando a fisiopatologia, apresentação clínica e conduta padrão da especialidade.",
        oQueRastrear: [],
        pontosOSCE: [],
        errosComuns: [],
      },
    ],
    checklistNotaMaxima: [],
    respostaModelo: "",
    errosCriticos: [],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { caso, feedback, rubricaAvaliacao, diagnosticoEsperado, diagnosticoInformado } =
      await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY não configurada");
      return NextResponse.json(
        gerarFallback(diagnosticoEsperado),
        { status: 200 }
      );
    }

    const dadosCaso = JSON.stringify(caso, null, 2);
    const dadosFeedback = JSON.stringify(feedback, null, 2);

    const prompt = `Você vai gerar uma mini-aula objetiva de um especialista médico sobre como conduzir um caso OSCE.

PAPEL:
Você é um professor médico especialista na área do caso clínico. Escreva como um especialista experiente, com autoridade técnica, raciocínio fisiopatológico profundo e foco em OSCE. A explicação deve ser profunda, mas OBJETIVA: sem rodeios, sem texto vazio, sem parágrafos longos demais. O aluno deve terminar a leitura sabendo exatamente o que rastrear, perguntar, examinar, solicitar e conduzir.

DIAGNÓSTICO E ESPECIALIDADE:
Diagnóstico esperado: ${diagnosticoEsperado}

Identifique a especialidade de referência mais adequada. Exemplos:
- Cardiopatias (angina, IAM, SCA, HAS, pericardite, IC, valvopatias, endocardite): Cardiologia
- Endocardite infecciosa: Cardiologia/Infectologia
- Pulmonares (pneumonia, asma, DPOC, TEP, TB): Pneumologia/Infectologia
- Doenças vasculares (DAOP, TVP, isquemia): Angiologia/Cirurgia Vascular
- Doenças hematológicas (anemia, leucemia, linfoma): Hematologia
- Arboviroses (dengue, zika, chikungunya): Infectologia
- Outras: identifique a mais adequada

DADOS DO CASO:
${dadosCaso}

FEEDBACK ATUAL:
${dadosFeedback}

DIRETRIZES DE QUALIDADE:
1. Cada seção deve ser CURTA, DENSA e ÚTIL. Ideal: 1 parágrafo de 4 a 7 linhas.
2. Explique o mecanismo e a conduta SEM RODEIOS.
3. Não escreva frases genéricas como "realizar anamnese completa". Diga EXATAMENTE o que perguntar e por quê.
4. Não transforme em apostila longa. Profundidade sim, mas leitura rápida.
5. Profundidade sem excesso. Seja conciso.
6. Não recalcule nota. Não reavalíe o aluno. Não contradiga a rubrica. Ensine a condução ideal.

ESTRUTURA OBRIGATÓRIA (7 a 9 seções):
1. Visão do especialista sobre o caso
2. Como a doença acontece (mecanismo fisiopatológico)
3. O que rastrear na anamnese
4. O que buscar no exame físico
5. Exames complementares: o que pedir e por quê
6. Diagnóstico principal e diferenciais
7. Conduta ideal
8. Sinais de alarme, complicações e seguimento
(Adapte se algum tópico não se aplicar)

INSTRUÇÕES POR SEÇÃO:

"Como a doença acontece":
- Explique o mecanismo fisiopatológico principal
- Explique por que os sintomas aparecem
- Explique por que os achados físicos ocorrem
- Diga quais complicações rastrear
Exemplo de estilo: "Na endocardite infecciosa, a bacteremia permite adesão de microrganismos ao endotélio valvar lesado, formando vegetações compostas por fibrina, plaquetas e bactérias. Essas vegetações sustentam febre persistente, sopro novo por lesão valvar e fenômenos embólicos. Por isso, o aluno deve rastrear porta de entrada, cardiopatia prévia, manifestações periféricas, insuficiência cardíaca e embolizações."

"O que rastrear na anamnese":
- Listar itens práticos e específicos
- Não genéricos

"O que buscar no exame físico":
- Listar sinais específicos esperados
- Explicar por que cada um importa

"Exames complementares":
- Ser objetivo: qual exame, por quê, o que esperar

"Diagnóstico principal e diferenciais":
- Critérios de diagnóstico
- Diferenciais relevantes
- Como diferenciar

"Conduta ideal":
- Tratamento inicial
- Orientações
- Internação vs ambulatorial
- Encaminhamento

"Sinais de alarme":
- Quando retornar
- Complicações
- Seguimento

FORMATO OBRIGATÓRIO DO JSON:
{
  "titulo": "Como conduzir este caso na prática",
  "subtitulo": "Mini-aula objetiva de especialista para revisar a condução ideal deste atendimento.",
  "diagnosticoBase": "${diagnosticoEsperado}",
  "especialidadeReferencia": "string (ex: Cardiologia, Pneumologia, etc)",
  "resumoEspecialista": "string com 2-3 linhas resumindo a visão do especialista sobre o caso",
  "secoes": [
    {
      "titulo": "string",
      "texto": "string com 4-7 linhas de profundidade, sem rodeisos",
      "oQueRastrear": ["item prático", "item prático", ...],
      "pontosOSCE": ["item objetivo", "item objetivo", ...],
      "errosComuns": ["erro", "erro", ...]
    },
    ...
  ],
  "checklistNotaMaxima": ["item específico", "item específico", ...],
  "respostaModelo": "string com 1-2 parágrafos bem escritos, resposta ideal do aluno",
  "errosCriticos": ["erro grave", "erro grave", ...]
}

CHECKLIST PARA NOTA MÁXIMA:
Gere 8-14 itens específicos do caso, não genéricos.
Exemplo BOM: "perguntar procedimento odontológico recente"
Exemplo RUIM: "fazer anamnese completa"

RESPOSTA MODELO:
1-2 parágrafos bem escritos, como resposta final ideal do aluno.
Conter: diagnóstico, justificativa, diferenciais, exames, conduta, orientações/seguimento.
Objetivo, profundo, sem ser longo demais.

ERROS CRÍTICOS:
5-8 itens que realmente são graves no caso.

JSON OBRIGATÓRIO:
Responda APENAS em JSON válido. Sem markdown, sem texto fora do JSON. JSON estruturado e completo.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Você é um professor médico especialista na área do caso clínico. Escreva como um especialista experiente, com autoridade técnica, raciocínio fisiopatológico e foco em OSCE. A explicação deve ser profunda, mas objetiva: sem rodeios, sem texto vazio, sem parágrafos longos demais. O aluno deve terminar a leitura sabendo exatamente o que rastrear, perguntar, examinar, solicitar e conduzir. Responda exclusivamente em JSON válido, sem markdown e sem texto fora do JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 8000,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      console.error("Erro ao chamar OpenAI:", response.statusText);
      return NextResponse.json(
        gerarFallback(diagnosticoEsperado),
        { status: 200 }
      );
    }

    const data = await response.json();
    const conteudoRaw = data.choices?.[0]?.message?.content;

    if (!conteudoRaw) {
      console.error("Resposta vazia da OpenAI");
      return NextResponse.json(
        gerarFallback(diagnosticoEsperado),
        { status: 200 }
      );
    }

    const estudoFinal = parseJSONSeguro(conteudoRaw);

    return NextResponse.json(estudoFinal, { status: 200 });
  } catch (erro) {
    console.error("Erro ao gerar estudo final do caso:", erro);
    return NextResponse.json(
      {
        titulo: "Como conduzir este caso na prática",
        subtitulo: "Mini-aula objetiva de especialista para revisar a condução ideal deste atendimento.",
        diagnosticoBase: "Caso clínico",
        especialidadeReferencia: "Clínica Médica",
        resumoEspecialista: "",
        secoes: [
          {
            titulo: "Estudo final em preparação",
            texto: "O estudo final deste caso está sendo gerado. Por favor, recarregue a página em alguns instantes para visualizar o conteúdo individualizado.",
            oQueRastrear: [],
            pontosOSCE: [],
            errosComuns: [],
          },
        ],
        checklistNotaMaxima: [],
        respostaModelo: "",
        errosCriticos: [],
      },
      { status: 200 }
    );
  }
}
