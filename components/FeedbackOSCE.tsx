"use client";

import type { FeedbackOSCE } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

interface FeedbackOSCEProps {
  feedback: FeedbackOSCE;
  nomePaciente: string;
  tempoDecorrido: number;
}

const renderCondicional = (dados: any[]) => {
  if (!dados || dados.length === 0) {
    return <p className="text-sm text-slate-500 italic">Não houve registro suficiente para avaliar este item.</p>;
  }
  return (
    <div className="space-y-1">
      {dados.map((item, idx) => (
        <p key={idx} className="text-sm text-slate-800">
          • {item}
        </p>
      ))}
    </div>
  );
};

const obterCorNota = (classificacao: string): string => {
  switch (classificacao) {
    case "Excelente":
      return "text-emerald-700";
    case "Bom":
      return "text-blue-700";
    case "Regular":
      return "text-amber-700";
    case "Insuficiente":
      return "text-red-700";
    default:
      return "text-slate-700";
  }
};

export default function FeedbackOSCE({
  feedback,
  nomePaciente,
  tempoDecorrido,
}: FeedbackOSCEProps) {
  const minutos = Math.floor(tempoDecorrido / 60);
  const segundos = tempoDecorrido % 60;

  const [abertaSecao, setAbertaSecao] = useState<string>("desempenho");
  const [apertosPlano, setApertosPlano] = useState<Set<number>>(new Set());

  // Extrair principais acertos e pontos de melhoria
  const obterPrincipalAcerto = (): string => {
    if (feedback.anamnese?.acertos && feedback.anamnese.acertos.length > 0) return feedback.anamnese.acertos[0];
    if (feedback.exameFisico?.achadosEncontrados && feedback.exameFisico.achadosEncontrados.length > 0) return feedback.exameFisico.achadosEncontrados[0];
    if (feedback.comunicacaoMedica && feedback.comunicacaoMedica.acertos && feedback.comunicacaoMedica.acertos.length > 0) return feedback.comunicacaoMedica.acertos[0];
    return "Desempenho aceitável no atendimento";
  };

  const obterPrincipalMelhoria = (): string => {
    if (feedback.raciocinioDiagnostico?.diferenciaisFaltantes?.length > 0) {
      return "Expandir análise de diagnósticos diferenciais";
    }
    if (feedback.anamnese?.faltouPerguntar?.length > 0) return feedback.anamnese.faltouPerguntar[0];
    if (feedback.examesComplementares?.faltantes?.length > 0) return feedback.examesComplementares.faltantes[0];
    return "Melhorar sistematização da abordagem clínica";
  };

  const obterProximoFoco = (): string => {
    if (feedback.planoDeEstudo?.length > 0) {
      const primeiro = feedback.planoDeEstudo[0];
      return typeof primeiro === "object" ? (primeiro as any).topico : primeiro;
    }
    return "Revisar protocolo de abordagem do caso";
  };

  const badgeClassificacao: Record<string, string> = {
    Excelente: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Bom: "bg-blue-100 text-blue-800 border-blue-200",
    Regular: "bg-amber-100 text-amber-800 border-amber-200",
    Insuficiente: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="space-y-5 animate-slideUp">
      {/* === RESUMO EXECUTIVO === */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-1 text-slate-900">Feedback do Atendimento</h1>
            <p className="text-slate-600 text-sm font-medium">
              {nomePaciente} • {minutos}m {segundos}s
            </p>
          </div>
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border shrink-0 ${badgeClassificacao[feedback.classificacao]}`}>
            {feedback.classificacao}
          </span>
        </div>

        {/* Nota Grande */}
        <div className="mb-6 pb-6 border-b border-slate-200">
          <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Nota Final</p>
          <p className={`text-6xl sm:text-7xl font-bold leading-none ${obterCorNota(feedback.classificacao)}`}>
            {feedback.nota.toFixed(1)}
          </p>
          <p className="text-slate-600 text-sm font-medium mt-2">{feedback.percentual}% de desempenho</p>
        </div>

        {/* Diagnóstico Esperado */}
        <div className="mb-6 pb-6 border-b border-slate-200">
          <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Diagnóstico Esperado</p>
          <p className="text-xl font-bold text-slate-900">{feedback.resumoCaso.diagnosticoEsperado}</p>
        </div>

        {/* Acertos e Melhorias */}
        <div className="space-y-4">
          <div>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">✓ Principal Acerto</p>
            <p className="text-base font-semibold text-emerald-700">{obterPrincipalAcerto()}</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">⚠️ Principal Ponto de Melhoria</p>
            <p className="text-base font-semibold text-amber-700">{obterPrincipalMelhoria()}</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">📚 Próximo Foco de Estudo</p>
            <p className="text-base font-semibold text-purple-700">{obterProximoFoco()}</p>
          </div>
        </div>

        {feedback.justificativaNota && (
          <div className="mt-6 pt-6 border-t border-slate-200 bg-slate-50 p-4 rounded-lg">
            <p className="text-slate-800 text-sm leading-relaxed italic">&ldquo;{feedback.justificativaNota}&rdquo;</p>
          </div>
        )}
      </div>

      {/* === CARDS RÁPIDOS === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Acertos Principais */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✓</span>
            <h3 className="font-bold text-emerald-900 text-lg">Acertos Principais</h3>
          </div>
          <div className="space-y-2">
            {feedback.anamnese?.acertos?.slice(0, 3).map((item, idx) => (
              <p key={`acerto-${idx}`} className="text-sm text-emerald-900 font-medium">
                • {item}
              </p>
            )) || <p className="text-sm text-slate-600 italic">Sem registro</p>}
          </div>
        </div>

        {/* Pontos de Atenção */}
        <div className="bg-red-50 rounded-2xl border border-red-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-bold text-red-900 text-lg">Pontos Críticos</h3>
          </div>
          <div className="space-y-2">
            {(feedback.errosCriticos?.slice(0, 3) || []).length > 0 ? (
              feedback.errosCriticos.slice(0, 3).map((item, idx) => (
                <p key={`erro-${idx}`} className="text-sm text-red-900 font-medium">
                  • {item}
                </p>
              ))
            ) : (
              <p className="text-sm text-slate-600 italic">Nenhum erro crítico</p>
            )}
          </div>
        </div>
      </div>

      {/* === 3 ACCORDIONS PRINCIPAIS === */}

      {/* ACCORDION 1: Desempenho Clínico */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setAbertaSecao(abertaSecao === "desempenho" ? "none" : "desempenho")}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-3 font-bold text-slate-900 text-lg">
            <span className="text-2xl">👨‍⚕️</span>
            Desempenho Clínico
          </span>
          <svg
            className={`w-5 h-5 text-slate-600 transition-transform shrink-0 ${abertaSecao === "desempenho" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {abertaSecao === "desempenho" && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-200 space-y-6">
            {/* Comunicação */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>💬</span> Comunicação Médica
              </h4>
              {feedback.comunicacaoMedica ? (
                <div className="space-y-4 ml-6">
                  <div>
                    <p className="text-sm font-bold text-emerald-700 mb-2">✓ Acertos:</p>
                    {renderCondicional(feedback.comunicacaoMedica.acertos)}
                  </div>
                  {feedback.comunicacaoMedica.pontosDeMelhoria?.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-amber-700 mb-2">⚠️ Pontos de Melhoria:</p>
                      {renderCondicional(feedback.comunicacaoMedica.pontosDeMelhoria)}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-600 italic ml-6">Avaliação não disponível</p>
              )}
            </div>

            {/* Anamnese */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>🎤</span> Anamnese
              </h4>
              <div className="space-y-4 ml-6">
                <div>
                  <p className="text-sm font-bold text-emerald-700 mb-2">✓ Acertos:</p>
                  {renderCondicional(feedback.anamnese.acertos)}
                </div>
                {feedback.anamnese.faltouPerguntar?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-red-700 mb-2">✗ Perguntas Esquecidas:</p>
                    {renderCondicional(feedback.anamnese.faltouPerguntar)}
                  </div>
                )}
              </div>
            </div>

            {/* Sinais Vitais */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>📊</span> Sinais Vitais
              </h4>
              <div className="space-y-3 ml-6">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-sm font-bold text-slate-900 mb-1">Interpretação:</p>
                  <p className="text-sm text-slate-800">{feedback.sinaisVitais.interpretacao}</p>
                </div>
                {feedback.sinaisVitais.pontosDeAlerta?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-red-700 mb-2">⚠️ Pontos de Alerta:</p>
                    {renderCondicional(feedback.sinaisVitais.pontosDeAlerta)}
                  </div>
                )}
              </div>
            </div>

            {/* Exame Físico */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>🔍</span> Exame Físico
              </h4>
              <div className="space-y-4 ml-6">
                <div>
                  <p className="text-sm font-bold text-emerald-700 mb-2">✓ Manobras Realizadas:</p>
                  {renderCondicional(feedback.exameFisico.manobrasRealizadas)}
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-700 mb-2">✓ Achados Encontrados:</p>
                  {renderCondicional(feedback.exameFisico.achadosEncontrados)}
                </div>
                {feedback.exameFisico.manobrasEsquecidas?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-red-700 mb-2">✗ Manobras Esquecidas:</p>
                    {renderCondicional(feedback.exameFisico.manobrasEsquecidas)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 2: Raciocínio e Conduta */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setAbertaSecao(abertaSecao === "raciocinio" ? "none" : "raciocinio")}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-3 font-bold text-slate-900 text-lg">
            <span className="text-2xl">🧠</span>
            Raciocínio e Conduta
          </span>
          <svg
            className={`w-5 h-5 text-slate-600 transition-transform shrink-0 ${abertaSecao === "raciocinio" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {abertaSecao === "raciocinio" && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-200 space-y-6">
            {/* Hipótese Diagnóstica */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3">Hipótese Diagnóstica</h4>
              <div className="grid grid-cols-2 gap-3 ml-6">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="text-xs font-bold text-slate-600 uppercase mb-2">Sua Hipótese:</p>
                  <p className="text-sm text-slate-900 font-medium">{feedback.raciocinioDiagnostico.hipoteseDoEstudante}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded">
                  <p className="text-xs font-bold text-slate-600 uppercase mb-2">Esperado:</p>
                  <p className="text-sm text-slate-900 font-medium">{feedback.raciocinioDiagnostico.diagnosticoEsperado}</p>
                </div>
              </div>
              {feedback.raciocinioDiagnostico.avaliacao && (
                <div className="mt-3 ml-6">
                  <p className="text-sm font-bold text-slate-900 mb-1">Avaliação:</p>
                  <p className="text-sm text-slate-800">{feedback.raciocinioDiagnostico.avaliacao}</p>
                </div>
              )}
            </div>

            {/* Diagnósticos Diferenciais */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-slate-900 mb-3">Diagnósticos Diferenciais</h4>
              <div className="space-y-4 ml-6">
                {feedback.raciocinioDiagnostico.diferenciaisAdequados?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-emerald-700 mb-2">✓ Adequados:</p>
                    {renderCondicional(feedback.raciocinioDiagnostico.diferenciaisAdequados)}
                  </div>
                )}
                {feedback.raciocinioDiagnostico.diferenciaisFaltantes?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-red-700 mb-2">✗ Faltantes:</p>
                    {renderCondicional(feedback.raciocinioDiagnostico.diferenciaisFaltantes)}
                  </div>
                )}
              </div>
            </div>

            {/* Exames Complementares */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>🧪</span> Exames Complementares
              </h4>
              <div className="space-y-4 ml-6">
                {feedback.examesComplementares.adequados?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-emerald-700 mb-2">✓ Adequados:</p>
                    {renderCondicional(feedback.examesComplementares.adequados)}
                  </div>
                )}
                {feedback.examesComplementares.faltantes?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-red-700 mb-2">✗ Faltantes:</p>
                    {renderCondicional(feedback.examesComplementares.faltantes)}
                  </div>
                )}
                {feedback.examesComplementares.desnecessarios?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-amber-700 mb-2">⚠️ Desnecessários:</p>
                    {renderCondicional(feedback.examesComplementares.desnecessarios)}
                  </div>
                )}
              </div>
            </div>

            {/* Conduta */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>⚕️</span> Conduta
              </h4>
              <div className="space-y-4 ml-6">
                {feedback.conduta.adequada?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-emerald-700 mb-2">✓ Adequadas:</p>
                    {renderCondicional(feedback.conduta.adequada)}
                  </div>
                )}
                {feedback.conduta.incompleta?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-amber-700 mb-2">⚠️ Incompletas:</p>
                    {renderCondicional(feedback.conduta.incompleta)}
                  </div>
                )}
                {feedback.conduta.erros?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-red-700 mb-2">✗ Erros:</p>
                    {renderCondicional(feedback.conduta.erros)}
                  </div>
                )}
                {feedback.conduta.condutaModelo && (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded">
                    <p className="text-sm font-bold text-slate-900 mb-1">Conduta Modelo:</p>
                    <p className="text-sm text-slate-800">{feedback.conduta.condutaModelo}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Erros Críticos */}
            {feedback.errosCriticos?.length > 0 && (
              <div className="border-t pt-6">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>🚨</span> Erros Críticos
                </h4>
                <div className="space-y-2 ml-6">
                  {feedback.errosCriticos.map((erro, idx) => (
                    <div key={idx} className="bg-red-50 border border-red-200 p-3 rounded">
                      <p className="text-sm text-red-900 font-medium">{erro}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ACCORDION 3: Registro e Estudo */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setAbertaSecao(abertaSecao === "registro" ? "none" : "registro")}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-3 font-bold text-slate-900 text-lg">
            <span className="text-2xl">📚</span>
            Registro e Estudo
          </span>
          <svg
            className={`w-5 h-5 text-slate-600 transition-transform shrink-0 ${abertaSecao === "registro" ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {abertaSecao === "registro" && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-200 space-y-6">
            {/* SOAP */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>📝</span> SOAP
              </h4>
              <div className="space-y-3 ml-6">
                {["S", "O", "A", "P"].map((letter, idx) => {
                  const soapKey = {
                    S: "subjetivo",
                    O: "objetivo",
                    A: "avaliacao",
                    P: "plano",
                  }[letter] as keyof typeof feedback.soap;

                  return (
                    <div key={letter} className="bg-blue-50 border border-blue-200 p-3 rounded">
                      <p className="text-xs font-bold text-slate-600 uppercase mb-2">
                        {letter} — {["Subjetivo", "Objetivo", "Avaliação", "Plano"][idx]}
                      </p>
                      <p className="text-sm text-slate-800">{feedback.soap[soapKey] || "(não preenchido)"}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checklist do Examinador */}
            {feedback.checklistExaminador && (
              <div className="border-t pt-6">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>✅</span> Checklist do Examinador
                </h4>
                <div className="space-y-4 ml-6">
                  {feedback.checklistExaminador.oQueProfessorQuer && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                      <p className="text-sm font-bold text-amber-900 mb-1">👨‍🏫 O que o Professor Quer:</p>
                      <p className="text-sm text-amber-900">{feedback.checklistExaminador.oQueProfessorQuer}</p>
                    </div>
                  )}

                  {feedback.checklistExaminador.itensCumpridos?.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-emerald-700 mb-2">✓ Cumpridos:</p>
                      {renderCondicional(feedback.checklistExaminador.itensCumpridos)}
                    </div>
                  )}

                  {feedback.checklistExaminador.itensNaoCumpridos?.length > 0 && (
                    <div>
                      <p className="text-sm font-bold text-red-700 mb-2">✗ NÃO Cumpridos:</p>
                      {renderCondicional(feedback.checklistExaminador.itensNaoCumpridos)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resposta Modelo */}
            {feedback.respostaModeloOSCE && (
              <div className="border-t pt-6">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>✨</span> Resposta Modelo OSCE
                </h4>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded ml-6">
                  <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {feedback.respostaModeloOSCE}
                  </p>
                </div>
              </div>
            )}

            {/* Plano de Estudo */}
            {feedback.planoDeEstudo?.length > 0 && (
              <div className="border-t pt-6">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>📖</span> Plano de Estudo Personalizado
                </h4>
                <div className="space-y-2 ml-6">
                  {feedback.planoDeEstudo.map((item, idx) => {
                    const isObject = typeof item === "object" && item !== null;
                    const topico = isObject ? (item as any).topico : item;
                    const explicacao = isObject ? (item as any).explicacao : "";
                    const isAberto = apertosPlano.has(idx);

                    return (
                      <div key={idx} className="bg-purple-50 border border-purple-200 rounded overflow-hidden">
                        <button
                          onClick={() => {
                            const novo = new Set(apertosPlano);
                            if (novo.has(idx)) {
                              novo.delete(idx);
                            } else {
                              novo.add(idx);
                            }
                            setApertosPlano(novo);
                          }}
                          className="w-full text-left p-3 hover:bg-purple-100 transition-colors flex justify-between items-center gap-2"
                        >
                          <span className="text-sm font-bold text-purple-900">
                            {idx + 1}. {topico}
                          </span>
                          <span className="text-purple-700 text-lg shrink-0">{isAberto ? "▼" : "▶"}</span>
                        </button>

                        {isAberto && explicacao && (
                          <div className="bg-white px-3 pb-3 pt-2 border-t border-purple-200">
                            <p className="text-sm text-slate-800 leading-relaxed">{explicacao}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* === AÇÕES FINAIS === */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="flex-1">
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl transition-colors text-sm active:scale-[0.98]">
            Voltar aos Casos
          </button>
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold py-3.5 px-4 rounded-xl transition-colors text-sm active:scale-[0.98]"
        >
          Repetir Este Caso
        </button>
      </div>
    </div>
  );
}
