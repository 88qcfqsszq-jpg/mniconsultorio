"use client";

import { useState, useEffect } from "react";
import type { DiagnosticoFormulario, FormularioSOAP } from "@/lib/types";

interface FormularioSOAPProps {
  onSubmit: (dados: {
    soap: FormularioSOAP;
    diagnostico: DiagnosticoFormulario;
  }) => void;
  onDadosChange?: (dados: {
    soap: FormularioSOAP;
    diagnostico: DiagnosticoFormulario;
  }) => void;
  desabilitado?: boolean;
}

export default function FormularioSOAP({
  onSubmit,
  onDadosChange,
  desabilitado = false,
}: FormularioSOAPProps) {
  const [soap, setSOAP] = useState<FormularioSOAP>({
    subjetivo: "",
    objetivo: "",
    avaliacao: "",
    plano: "",
  });

  const [diagnostico, setDiagnostico] = useState<DiagnosticoFormulario>({
    hipotesePrincipal: "",
    diagnosticosDisferenciais: [],
    examesIndicados: [],
    conduta: "",
  });

  useEffect(() => {
    if (onDadosChange) {
      onDadosChange({ soap, diagnostico });
    }
  }, [soap, diagnostico, onDadosChange]);

  const [novoDiferencial, setNovoDiferencial] = useState("");
  const [novoExame, setNovoExame] = useState("");

  const handleAdicionarDiferencial = () => {
    if (novoDiferencial.trim()) {
      setDiagnostico((prev) => ({
        ...prev,
        diagnosticosDisferenciais: [
          ...prev.diagnosticosDisferenciais,
          novoDiferencial,
        ],
      }));
      setNovoDiferencial("");
    }
  };

  const handleRemoverDiferencial = (index: number) => {
    setDiagnostico((prev) => ({
      ...prev,
      diagnosticosDisferenciais: prev.diagnosticosDisferenciais.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleAdicionarExame = () => {
    if (novoExame.trim()) {
      setDiagnostico((prev) => ({
        ...prev,
        examesIndicados: [...prev.examesIndicados, novoExame],
      }));
      setNovoExame("");
    }
  };

  const handleRemoverExame = (index: number) => {
    setDiagnostico((prev) => ({
      ...prev,
      examesIndicados: prev.examesIndicados.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !soap.subjetivo.trim() ||
      !soap.objetivo.trim() ||
      !soap.avaliacao.trim() ||
      !soap.plano.trim() ||
      !diagnostico.hipotesePrincipal.trim()
    ) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    onSubmit({ soap, diagnostico });
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 text-slate-900 placeholder-slate-400 text-sm";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide";

  const soapFields = [
    { key: "subjetivo" as const, letter: "S", label: "Subjetivo", hint: "O que o paciente relata", placeholder: "Sintomas, queixas, história relatada pelo paciente..." },
    { key: "objetivo" as const, letter: "O", label: "Objetivo", hint: "O que você observou/mediu", placeholder: "Sinais vitais, achados do exame físico, dados objetivos..." },
    { key: "avaliacao" as const, letter: "A", label: "Avaliação", hint: "Sua interpretação clínica", placeholder: "Hipótese, raciocínio diagnóstico..." },
    { key: "plano" as const, letter: "P", label: "Plano", hint: "Como você vai proceder", placeholder: "Exames, tratamento, encaminhamentos, seguimento..." },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
      <div className="flex items-center gap-2 pb-1">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">📝</div>
        <h2 className="font-bold text-slate-800">Avaliação Clínica</h2>
      </div>

      {/* SOAP */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">SOAP — Registro Clínico</p>
        {soapFields.map((field) => (
          <div key={field.key}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 bg-blue-600 text-white rounded text-xs font-bold flex items-center justify-center shrink-0">{field.letter}</span>
              <label className="text-xs font-semibold text-slate-700">{field.label} <span className="font-normal text-slate-400">— {field.hint}</span></label>
            </div>
            <textarea
              value={soap[field.key]}
              onChange={(e) => setSOAP((prev) => ({ ...prev, [field.key]: e.target.value }))}
              placeholder={field.placeholder}
              disabled={desabilitado}
              className={inputClass}
              rows={3}
            />
          </div>
        ))}
      </div>

      {/* Diagnóstico */}
      <div className="space-y-4 border-t border-slate-100 pt-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Diagnóstico e Conduta</p>

        <div>
          <label className={labelClass}>Hipótese Principal <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={diagnostico.hipotesePrincipal}
            onChange={(e) => setDiagnostico((prev) => ({ ...prev, hipotesePrincipal: e.target.value }))}
            placeholder="Ex: Síndrome Coronariana Aguda"
            disabled={desabilitado}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Conduta <span className="text-red-500">*</span></label>
          <textarea
            value={diagnostico.conduta}
            onChange={(e) => setDiagnostico((prev) => ({ ...prev, conduta: e.target.value }))}
            placeholder="Plano de tratamento, encaminhamentos, acompanhamento..."
            disabled={desabilitado}
            className={inputClass}
            rows={3}
          />
        </div>
      </div>

<button
        type="submit"
        disabled={desabilitado}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-xl transition-all text-sm shadow-sm active:scale-[0.98]"
      >
        Finalizar Atendimento e Ver Feedback
      </button>
    </form>
  );
}
