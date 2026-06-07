"use client";

import type { FeedbackOSCE } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

interface FeedbackOSCEProps {
  feedback: FeedbackOSCE;
  nomePaciente: string;
  tempoDecorrido: number;
}

const limitar = (items: any[], max: number = 2) => {
  if (!items || items.length === 0) return [];
  return items.slice(0, max);
};

function sugestaoRecuperarPontos(competencia: string): string {
  const nome = competencia.toLowerCase();

  if (nome.includes("comunicação")) {
    return "Apresente-se, confirme a identidade do paciente, explique o atendimento, peça consentimento e mantenha linguagem acolhedora.";
  }

  if (nome.includes("anamnese")) {
    return "Explore início, duração, evolução, sintomas associados, fatores de risco, antecedentes, medicamentos, alergias e sinais de gravidade.";
  }

  if (nome.includes("exame físico")) {
    return "Realize sinais vitais e exame físico direcionado ao caso, incluindo inspeção, palpação, percussão e ausculta quando aplicável.";
  }

  if (nome.includes("exames")) {
    return "Solicite exames essenciais para confirmar a hipótese principal, avaliar gravidade e excluir diagnósticos diferenciais importantes.";
  }

  if (nome.includes("raciocínio")) {
    return "Declare o diagnóstico principal, justifique com achados do caso e cite diagnósticos diferenciais plausíveis.";
  }

  if (nome.includes("conduta")) {
    return "Registre tratamento, orientações ao paciente, sinais de alarme, necessidade de retorno, encaminhamento ou internação quando indicado.";
  }

  return "Revise os objetivos da estação e compare sua resposta com a sequência ideal do caso.";
}

function ListaDetalheRubrica({
  titulo,
  itens,
  fallback,
}: {
  titulo: string;
  itens?: string[];
  fallback: string;
}) {
  const lista = Array.isArray(itens) ? itens.filter(Boolean) : [];

  return (
    <div className="space-y-2">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
        {titulo}
      </p>

      {lista.length > 0 ? (
        <ul className="space-y-1 text-sm font-medium text-slate-700">
          {lista.map((item, index) => (
            <li key={index} className="leading-relaxed">
              • {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">{fallback}</p>
      )}
    </div>
  );
}

export default function FeedbackOSCE({
  feedback,
  nomePaciente,
  tempoDecorrido,
}: FeedbackOSCEProps) {
  const minutos = Math.floor(tempoDecorrido / 60);
  const segundos = tempoDecorrido % 60;
  const percentual = Math.round((feedback.nota / 20) * 100);
  const [trofeuFailed, setTrofeuFailed] = useState(false);
  const [rubricaAberta, setRubricaAberta] = useState<string | null>(null);
  const [estudoExpandido, setEstudoExpandido] = useState(false);


  const isAprovado = feedback.nota >= 17;

  function estudoPneumoniaAtipica() {
    return [
      {
        titulo: "1. Reconhecimento do quadro clínico",
        texto: "A pneumonia atípica por provável Mycoplasma pneumoniae costuma ter início mais arrastado, com tosse seca ou pouco produtiva, febre baixa ou moderada, cefaleia, dor de garganta, mal-estar e mialgia. O paciente pode parecer menos toxêmico do que em uma pneumonia bacteriana típica, e a ausculta pode ser pouco exuberante. A principal armadilha é descartar pneumonia apenas porque o exame físico parece discreto.",
      },
      {
        titulo: "2. Anamnese dirigida",
        texto: "A anamnese deve caracterizar duração da tosse, tipo de tosse, presença de febre, dispneia, dor torácica, sintomas sistêmicos e evolução temporal. É importante perguntar sobre contato com pessoas doentes, surtos em escola, faculdade ou trabalho, além de investigar contato com tuberculose, perda ponderal, sudorese noturna e hemoptise. Também devem ser pesquisados antecedentes respiratórios, cardiopatias, imunossupressão, uso de medicamentos, alergias, tabagismo e vacinação quando pertinente.",
      },
      {
        titulo: "3. Avaliação de gravidade",
        texto: "Antes de definir tratamento ambulatorial, o médico deve avaliar gravidade. Devem ser verificados estado geral, nível de consciência, pressão arterial, frequência cardíaca, frequência respiratória, temperatura e saturação de oxigênio. Sinais como SpO2 baixa, taquipneia importante, hipotensão, confusão mental, uso de musculatura acessória, cianose, incapacidade de ingerir líquidos ou comorbidades graves indicam maior risco e podem exigir atendimento hospitalar.",
      },
      {
        titulo: "4. Exame físico esperado",
        texto: "O exame físico deve incluir sinais vitais completos, inspeção respiratória, avaliação do esforço ventilatório, expansibilidade torácica, palpação quando pertinente, percussão pulmonar e ausculta pulmonar anterior e posterior. Na pneumonia atípica, podem existir estertores finos, roncos, sibilos ou murmúrio vesicular reduzido, mas o exame pode ser discreto. Também é útil avaliar hidratação, perfusão periférica e ausculta cardíaca.",
      },
      {
        titulo: "5. Exames complementares",
        texto: "Em uma suspeita de pneumonia, o exame essencial é a radiografia de tórax, que pode mostrar infiltrado intersticial, broncopneumônico ou padrão compatível com pneumonia. Hemograma e marcadores inflamatórios podem ajudar na avaliação, embora não definam isoladamente o agente etiológico. Em casos graves ou com hipoxemia, considerar gasometria, função renal, eletrólitos e outros exames conforme o quadro. Testes específicos para Mycoplasma podem ser considerados em situações selecionadas, mas na prática o tratamento muitas vezes é empírico.",
      },
      {
        titulo: "6. Diagnóstico principal",
        texto: "O diagnóstico deve ser formulado de forma clara: pneumonia atípica adquirida na comunidade, provavelmente por Mycoplasma pneumoniae. A justificativa deve integrar tosse persistente, febre, sintomas sistêmicos leves a moderados, possível contato respiratório, exame físico pouco exuberante e radiografia compatível.",
      },
      {
        titulo: "7. Diagnósticos diferenciais",
        texto: "Os diferenciais devem ser plausíveis para o quadro. Em pneumonia atípica, bons diferenciais incluem tuberculose pulmonar, pneumonia bacteriana típica, virose respiratória, influenza, COVID, bronquite aguda, asma ou broncoespasmo quando houver sibilância e tromboembolismo pulmonar se houver dispneia súbita ou dor pleurítica importante. Tuberculose é um diferencial válido principalmente diante de tosse prolongada, perda de peso, sudorese noturna, hemoptise ou contato epidemiológico.",
      },
      {
        titulo: "8. Conduta terapêutica",
        texto: "Em paciente estável e sem sinais de gravidade, a conduta pode ser ambulatorial. Deve-se iniciar antibioticoterapia com cobertura para germes atípicos, como macrolídeo ou doxiciclina, conforme idade, perfil clínico, contraindicações e protocolos locais. Também devem ser orientados hidratação, repouso relativo, antitérmico ou analgésico se necessário e reavaliação clínica. Em pacientes com comorbidades, gravidade ou risco aumentado, considerar cobertura mais ampla e possível internação.",
      },
      {
        titulo: "9. Sinais de alarme e retorno",
        texto: "A orientação de segurança é parte essencial da conduta. O paciente deve retornar ou procurar emergência se houver piora da falta de ar, febre persistente ou piora após 48 a 72 horas, dor torácica intensa, confusão mental, prostração importante, queda da saturação, cianose, vômitos persistentes, incapacidade de ingerir líquidos, desmaio, hemoptise ou piora do estado geral.",
      },
      {
        titulo: "10. Seguimento",
        texto: "O seguimento deve incluir reavaliação em 48 a 72 horas ou antes se houver piora. O médico deve verificar melhora da febre, dispneia, estado geral e tolerância ao tratamento. Se não houver melhora, deve reconsiderar diagnóstico, adesão, resistência, complicações, tuberculose ou necessidade de internação. A tosse pode persistir por semanas, mas a piora clínica ou ausência de resposta exige reavaliação.",
      },
      {
        titulo: "Resposta modelo para o aluno",
        texto: "Diagnóstico principal: pneumonia atípica adquirida na comunidade, provavelmente por Mycoplasma pneumoniae. Diferenciais: tuberculose pulmonar, pneumonia bacteriana típica e virose respiratória/influenza/COVID. Conduta: paciente estável, sem sinais de gravidade no momento. Indico tratamento ambulatorial com antibioticoterapia com cobertura para germes atípicos, como macrolídeo ou doxiciclina conforme perfil e contraindicações. Solicito ou avalio radiografia de tórax e hemograma, mantenho hidratação, antitérmico ou analgésico se necessário e repouso relativo. Oriento retorno em 48 a 72 horas para reavaliação, ou antes se houver piora da dispneia, febre persistente, dor torácica, confusão mental, prostração importante, queda da saturação, vômitos persistentes ou piora do estado geral. Se houver tosse prolongada, perda ponderal, sudorese noturna, hemoptise ou contato com tuberculose, investigar TB com exames específicos.",
      },
    ];
  }

  function estudoGenericoDoCaso() {
    return [
      {
        titulo: "1. Organização inicial do atendimento",
        texto: "O atendimento deve começar com comunicação adequada: apresentar-se, confirmar a identidade do paciente, explicar o que será feito e pedir consentimento. Em seguida, o médico deve organizar a consulta em anamnese, exame físico, exames complementares, raciocínio diagnóstico e conduta.",
      },
      {
        titulo: "2. Anamnese dirigida",
        texto: "A anamnese deve explorar a queixa principal, início, duração, evolução, fatores de melhora e piora, sintomas associados, sinais de gravidade, antecedentes, medicamentos, alergias, hábitos e contexto epidemiológico ou familiar quando pertinente.",
      },
      {
        titulo: "3. Exame físico direcionado",
        texto: "O exame físico deve começar pelos sinais vitais e seguir para o exame direcionado ao sistema acometido. O aluno deve demonstrar técnica, sequência lógica e relação entre os achados físicos e as hipóteses diagnósticas.",
      },
      {
        titulo: "4. Exames complementares",
        texto: "Os exames devem ser solicitados de forma justificada, buscando confirmar a hipótese principal, avaliar gravidade, identificar complicações e excluir diagnósticos diferenciais importantes.",
      },
      {
        titulo: "5. Raciocínio diagnóstico",
        texto: "O raciocínio deve apresentar o diagnóstico principal, justificar com dados da história, exame físico e exames complementares, além de citar diferenciais plausíveis para o quadro.",
      },
      {
        titulo: "6. Conduta",
        texto: "A conduta deve incluir tratamento inicial, orientações ao paciente, sinais de alarme, necessidade de retorno, encaminhamento ou internação quando indicado, sempre de acordo com a gravidade do caso.",
      },
    ];
  }

  function gerarEstudoFinalDoCaso(fb: FeedbackOSCE) {
    const diagnostico = String(
      fb?.resumoCaso?.diagnosticoEsperado ||
      ""
    ).toLowerCase();

    if (
      diagnostico.includes("pneumonia atípica") ||
      diagnostico.includes("mycoplasma") ||
      diagnostico.includes("mycoplasma pneumoniae")
    ) {
      return estudoPneumoniaAtipica();
    }

    return estudoGenericoDoCaso();
  }

  const estudoFinal = gerarEstudoFinalDoCaso(feedback);

  // Assets dos cards
  const assetsCards = [
    { src: "/images/feedback/jaleco.png", alt: "Comunicação" },
    { src: "/images/feedback/checklist.png", alt: "Anamnese" },
    { src: "/images/feedback/estetoscopio.png", alt: "Exame físico" },
    { src: "/images/feedback/microscopio.png", alt: "Exames" },
    { src: "/images/feedback/simbolo-medicina.png", alt: "Raciocínio" },
    { src: "/images/feedback/checklist.png", alt: "Conduta" },
  ];

  // Cores para cada competência
  const competenciasCores = [
    { cor: "blue", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", asset: assetsCards[0] },
    { cor: "cyan", bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-900", asset: assetsCards[1] },
    { cor: "violet", bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-900", asset: assetsCards[2] },
    { cor: "emerald", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", asset: assetsCards[3] },
    { cor: "amber", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", asset: assetsCards[4] },
    { cor: "rose", bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-900", asset: assetsCards[5] },
  ];

  const obterCorTexto = (cor: string) => {
    const cores: Record<string, string> = {
      blue: "text-blue-700",
      cyan: "text-cyan-700",
      violet: "text-violet-700",
      emerald: "text-emerald-700",
      amber: "text-amber-700",
      rose: "text-rose-700",
    };
    return cores[cor] || "text-blue-700";
  };

  const obterCorFundo = (cor: string) => {
    const cores: Record<string, string> = {
      blue: "bg-blue-200",
      cyan: "bg-cyan-200",
      violet: "bg-violet-200",
      emerald: "bg-emerald-200",
      amber: "bg-amber-200",
      rose: "bg-rose-200",
    };
    return cores[cor] || "bg-blue-200";
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none space-y-6">
        {/* CARD PRINCIPAL AZUL */}
        <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-8 py-10 text-white shadow-xl border border-blue-900/40">
          {/* TÍTULO */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-white">
              Feedback do Atendimento
            </h1>
            <p className="mt-3 text-base md:text-lg text-blue-100">
              {nomePaciente} • {minutos}m {segundos}s
            </p>
          </div>

          {/* GRID: 4 ÁREAS */}
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[260px_220px_minmax(0,1fr)_300px] xl:items-center">
            {/* ÁREA 1: NOTA */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
                Nota final
              </p>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-7xl font-black leading-none text-white">
                  {feedback.nota.toFixed(1)}
                </span>
                <span className="mb-2 text-3xl font-bold text-blue-200">
                  /20
                </span>
              </div>

              <div className="mt-5 inline-flex w-fit rounded-full bg-emerald-500 px-5 py-2 text-lg font-black text-white shadow-lg">
                {percentual}% de desempenho
              </div>
            </div>

            {/* ÁREA 2: GRÁFICO CIRCULAR */}
            <div className="flex items-center justify-center">
              <div className="relative h-40 w-40">
                <svg viewBox="0 0 120 120" className="h-40 w-40">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="14"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={`${(percentual / 100) * 301} 301`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">
                    {percentual}%
                  </span>
                  <span className="text-sm font-semibold text-blue-200">
                    Desempenho
                  </span>
                </div>
              </div>
            </div>

            {/* ÁREA 3: DIAGNÓSTICO */}
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
                Diagnóstico esperado
              </p>

              <h2 className="mt-3 text-4xl font-black leading-tight text-white xl:text-5xl break-words whitespace-normal">
                {feedback.resumoCaso?.diagnosticoEsperado || "Diagnóstico não informado"}
              </h2>

              <p className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-blue-200">
                Diagnóstico informado
              </p>

              <p className="mt-2 text-lg font-semibold leading-relaxed text-blue-100 break-words whitespace-normal">
                {feedback.resumoCaso?.diagnosticoEsperado || "Não informado"}
              </p>

              {feedback.justificativaNota && (
                <div className="mt-5 rounded-2xl bg-blue-900/50 px-5 py-4 text-base font-medium leading-relaxed text-blue-50">
                  {feedback.justificativaNota}
                </div>
              )}
            </div>

            {/* ÁREA 4: TROFÉU */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex h-48 w-full items-center justify-center">
                {!trofeuFailed && (
                  <img
                    src="/images/feedback/estetoscopio.png"
                    alt="Troféu de aprovação"
                    className="h-80 w-80 md:h-88 md:w-88 object-contain drop-shadow-xl"
                    onError={() => setTrofeuFailed(true)}
                  />
                )}
                {trofeuFailed && (
                  <div className="text-8xl drop-shadow-xl">🏆</div>
                )}
              </div>

              {isAprovado && (
                <>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    <img
                      src="/images/feedback/confetes.gif"
                      alt="Confetes"
                      className="h-40 w-96 object-contain"
                    />
                  </div>
                  <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-3xl font-black text-white shadow-lg">
                    <span>✓</span>
                    <span>{feedback.classificacao || "Aprovado"}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* DESEMPENHO POR COMPETÊNCIA */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">Desempenho por Competência</h2>
            <p className="mt-2 text-base text-slate-600">Veja onde você foi bem e quais pontos priorizar no próximo atendimento.</p>
            {feedback.rubricaAvaliacao && feedback.rubricaAvaliacao.length > 0 && (
              <p className="mt-1 text-sm text-slate-500">
                Somatório da rubrica: {feedback.rubricaAvaliacao.reduce((total, item) => total + Number(item.pontosObtidos || 0), 0)}/{feedback.rubricaAvaliacao.reduce((total, item) => total + Number(item.pontosMaximos || 0), 0)}
              </p>
            )}
          </div>

          {feedback.rubricaAvaliacao && feedback.rubricaAvaliacao.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {feedback.rubricaAvaliacao.map((competencia, idx) => {
                const cores = competenciasCores[idx] || competenciasCores[0];
                const percentualComp = Math.round((competencia.pontosObtidos / competencia.pontosMaximos) * 100);
                const estaAberta = rubricaAberta === competencia.nome;

                return (
                  <div key={idx} className={`relative ${cores.bg} rounded-3xl border ${cores.border} p-6 shadow-sm min-h-[260px] overflow-hidden`}>
                    <div className="absolute bottom-2 right-3 opacity-30 pointer-events-none">
                      <img
                        src={cores.asset.src}
                        alt={cores.asset.alt}
                        className="h-32 w-32 object-contain"
                      />
                    </div>

                    {estaAberta ? (
                      // JANELA FLUTUANTE DE RUBRICA
                      <div className="absolute inset-0 z-30 max-h-[420px] overflow-y-auto rounded-3xl border p-5 shadow-2xl backdrop-blur-md md:max-h-[520px] bg-white/95">
                        {/* CABEÇALHO DA JANELA */}
                        <div className="relative z-10 flex items-start justify-between gap-3 pb-4 border-b border-slate-200 mb-4">
                          <div>
                            <h4 className={`text-lg font-black ${cores.text}`}>
                              {competencia.nome}
                            </h4>
                            <p className="mt-1 text-xs font-medium text-slate-600">
                              Peso na nota: {competencia.pontosMaximos} pontos
                            </p>
                          </div>

                          <button
                            type="button"
                            aria-label="Fechar detalhes da rubrica"
                            onClick={() => setRubricaAberta(null)}
                            className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-600 shadow-sm hover:bg-white transition-colors shrink-0"
                          >
                            ✕
                          </button>
                        </div>

                        {/* BARRA DE PROGRESSO */}
                        <div className="relative z-10 mb-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-700">
                              {competencia.pontosObtidos}/{competencia.pontosMaximos} pontos
                            </span>
                            <span className="text-xs text-slate-500">{percentualComp}%</span>
                          </div>
                          <div className="h-3 rounded-full bg-white/60 overflow-hidden">
                            <div
                              className={`h-3 rounded-full transition-all ${obterCorFundo(cores.cor)}`}
                              style={{ width: `${percentualComp}%` }}
                            />
                          </div>
                        </div>

                        {/* CONTEÚDO DA RUBRICA */}
                        <div className="relative z-10 space-y-5">
                          <ListaDetalheRubrica
                            titulo="O que foi reconhecido"
                            itens={competencia.acertos}
                            fallback="Nenhum acerto específico foi registrado pela avaliação."
                          />

                          <ListaDetalheRubrica
                            titulo="O que faltou para fechar a pontuação"
                            itens={competencia.melhorias}
                            fallback="Nenhuma melhoria crítica identificada."
                          />

                          <ListaDetalheRubrica
                            titulo="Evidências usadas pela avaliação"
                            itens={competencia.evidencias}
                            fallback="Nenhuma evidência textual registrada."
                          />

                          {/* SUGESTÃO DE RECUPERAÇÃO */}
                          <div className="space-y-2 rounded-lg bg-slate-100/80 p-3">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-600">
                              Como recuperar esses pontos
                            </p>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">
                              {sugestaoRecuperarPontos(competencia.nome)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // VISTA RESUMIDA DO CARD
                      <>
                        {/* CABEÇALHO */}
                        <div className="relative z-20 flex items-start justify-between gap-3 mb-4">
                          <h3 className={`text-lg font-black leading-tight ${cores.text}`}>
                            {competencia.nome}
                          </h3>

                          <button
                            type="button"
                            aria-label={`Ver detalhes da rubrica de ${competencia.nome}`}
                            onClick={() =>
                              setRubricaAberta(
                                rubricaAberta === competencia.nome ? null : competencia.nome
                              )
                            }
                            className="relative z-20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/80 text-xs font-black text-slate-800 shadow-md transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                          >
                            <span>{competencia.pontosObtidos}</span>
                            <span className="mx-0.5 text-slate-400">/</span>
                            <span>{competencia.pontosMaximos}</span>
                          </button>
                        </div>

                        {/* BARRA DE PROGRESSO */}
                        <div className="h-2 rounded-full bg-white/80 overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all ${obterCorFundo(cores.cor)}`}
                            style={{ width: `${percentualComp}%` }}
                          />
                        </div>

                        {/* ACERTOS */}
                        {competencia.acertos.length > 0 && (
                          <div>
                            <p className={`mt-5 text-sm font-black ${cores.text}`}>Acertos</p>
                            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-slate-700">
                              {limitar(competencia.acertos, 2).map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* MELHORIAS */}
                        {competencia.melhorias.length > 0 && (
                          <div>
                            <p className={`mt-4 text-sm font-black ${obterCorTexto(cores.cor)}`}>Melhorar</p>
                            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-slate-700">
                              {limitar(competencia.melhorias, 2).map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* ESTUDO FINAL DO CASO */}
        <section className={`relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/40 to-blue-50/40 p-6 shadow-sm md:p-8 transition-all ${
          estudoExpandido ? "" : "min-h-[260px]"
        } ${estudoExpandido ? "" : "max-h-[260px]"}`}>
          <img
            src="/images/feedback/consultorio.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 right-4 h-44 w-44 object-contain opacity-10"
            onError={() => {}}
          />

          <div className={`relative z-10 ${estudoExpandido ? "" : "overflow-hidden"}`}>
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
                Estudo final do caso
              </p>

              <div className="flex items-start justify-between gap-3 mt-2">
                <h2 className="text-3xl font-black text-slate-950">
                  Como conduzir este caso na prática
                </h2>

                <button
                  type="button"
                  aria-label={estudoExpandido ? "Colapsar estudo" : "Expandir estudo"}
                  onClick={() => setEstudoExpandido(!estudoExpandido)}
                  className="relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-white/80 text-sm font-black text-emerald-700 shadow-md transition hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  {estudoExpandido ? "−" : "+"}
                </button>
              </div>

              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
                Resumo técnico estruturado para revisar a condução ideal deste atendimento e transformar as falhas da simulação em plano de estudo.
              </p>
            </div>

            <div className="space-y-4">
              {estudoFinal.map((secao, index) => (
                <article
                  key={index}
                  className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm md:p-5"
                >
                  <h3 className="text-base font-black text-slate-900 md:text-lg">
                    {secao.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                    {secao.texto}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BOTÕES FINAIS */}
        <div className="flex gap-4 pt-6">
          <Link href="/" className="flex-1">
            <button className="w-full rounded-2xl border-2 border-slate-300 bg-white px-6 py-4 text-base font-black text-slate-900 transition-all hover:bg-slate-50 active:scale-[0.98]">
              ← Voltar ao início
            </button>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 rounded-2xl bg-blue-600 px-6 py-4 text-base font-black text-white transition-all hover:bg-blue-700 active:scale-[0.98] shadow-lg"
          >
            🔄 Tentar novo caso
          </button>
        </div>
      </div>
    </main>
  );
}
