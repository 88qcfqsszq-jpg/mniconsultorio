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

export default function FeedbackOSCE({
  feedback,
  nomePaciente,
  tempoDecorrido,
}: FeedbackOSCEProps) {
  const minutos = Math.floor(tempoDecorrido / 60);
  const segundos = tempoDecorrido % 60;
  const percentual = Math.round((feedback.nota / 20) * 100);
  const [trofeuFailed, setTrofeuFailed] = useState(false);

  const prioridadesMelhoria = [
    ...(feedback.raciocinioDiagnostico?.diferenciaisFaltantes || []),
    ...(feedback.anamnese?.faltouPerguntar || []),
    ...(feedback.exameFisico?.manobrasEsquecidas || []),
    ...(feedback.examesComplementares?.faltantes || []),
    ...(feedback.conduta?.erros || []),
  ].slice(0, 3);

  const sequenciaIdeal = feedback.respostaModeloOSCE
    ? feedback.respostaModeloOSCE.split("\n").filter(l => l.trim()).slice(0, 5)
    : [];

  const planoEstudo = limitar(
    feedback.planoDeEstudo?.map(item => typeof item === "object" ? item : { topico: item, explicacao: "" }) || [],
    4
  );

  const isAprovado = feedback.nota >= 17;

  // Cores para cada competência
  const competenciasCores = [
    { cor: "blue", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", icon: "💬" },
    { cor: "cyan", bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-900", icon: "📋" },
    { cor: "violet", bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-900", icon: "🫁" },
    { cor: "emerald", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", icon: "🔬" },
    { cor: "amber", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", icon: "🧠" },
    { cor: "rose", bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-900", icon: "❤️" },
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
                    src="/images/feedback/trofeu-aprovado.png"
                    alt="Troféu de aprovação"
                    className="h-40 w-40 object-contain drop-shadow-xl"
                    onError={() => setTrofeuFailed(true)}
                  />
                )}
                {trofeuFailed && (
                  <div className="text-8xl drop-shadow-xl">🏆</div>
                )}
              </div>

              {isAprovado && (
                <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-8 py-4 text-3xl font-black text-white shadow-lg">
                  <span>✓</span>
                  <span>{feedback.classificacao || "Aprovado"}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* DESEMPENHO POR COMPETÊNCIA */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900">Desempenho por Competência</h2>
            <p className="mt-2 text-base text-slate-600">Veja onde você foi bem e quais pontos priorizar no próximo atendimento.</p>
          </div>

          {feedback.rubricaAvaliacao && feedback.rubricaAvaliacao.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {feedback.rubricaAvaliacao.map((competencia, idx) => {
                const cores = competenciasCores[idx] || competenciasCores[0];
                const percentualComp = Math.round((competencia.pontosObtidos / competencia.pontosMaximos) * 100);

                return (
                  <div key={idx} className={`${cores.bg} rounded-3xl border ${cores.border} p-6 shadow-sm min-h-[260px]`}>
                    {/* CABEÇALHO */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                          {cores.icon}
                        </div>
                        <h3 className={`text-xl font-black ${cores.text}`}>
                          {competencia.nome}
                        </h3>
                      </div>

                      <span className={`rounded-xl bg-white/70 px-3 py-1 text-sm font-black ${cores.text}`}>
                        {competencia.pontosObtidos}/{competencia.pontosMaximos}
                      </span>
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
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>

        {/* BLOCOS INFERIORES */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* PRIORIDADES */}
          {prioridadesMelhoria.length > 0 && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">⭐</span>
                <h3 className="text-2xl font-black text-amber-900">Prioridades de melhoria</h3>
              </div>
              <ol className="space-y-3">
                {prioridadesMelhoria.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 font-black text-amber-900 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-base font-medium text-slate-700 pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* SEQUÊNCIA IDEAL */}
          {sequenciaIdeal.length > 0 && (
            <div className="rounded-3xl border border-blue-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📋</span>
                <h3 className="text-2xl font-black text-blue-900">Sequência ideal neste caso</h3>
              </div>
              <ol className="space-y-3">
                {sequenciaIdeal.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 font-black text-blue-900 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-base font-medium text-slate-700 pt-0.5">
                      {typeof item === "string" ? item.replace(/^\d+\.\s*/, "") : item}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* PRÓXIMOS FOCOS */}
          {planoEstudo.length > 0 && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🎓</span>
                <h3 className="text-2xl font-black text-emerald-900">Próximos focos de estudo</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {planoEstudo.map((item, idx) => {
                  const topico = typeof item === "string" ? item : item.topico;
                  return (
                    <span key={idx} className="inline-flex rounded-full bg-white px-4 py-2 text-base font-bold text-emerald-800 border border-emerald-200 shadow-sm">
                      {topico}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

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
