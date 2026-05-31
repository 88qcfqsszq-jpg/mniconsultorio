"use client";

import { useState, useEffect } from "react";
import type { DiagnosticoFormulario } from "@/lib/types";

interface PainelDiagnosticoProps {
  onSubmit: (diagnostico: DiagnosticoFormulario) => void;
  onChange?: (diagnostico: DiagnosticoFormulario) => void;
  desabilitado?: boolean;
}

export default function PainelDiagnostico({
  onSubmit,
  onChange,
  desabilitado = false,
}: PainelDiagnosticoProps) {
  const [diagnostico, setDiagnostico] = useState<DiagnosticoFormulario>({
    hipotesePrincipal: "",
    diagnosticosDisferenciais: [],
    examesIndicados: [],
    conduta: "",
  });

  const [novoDiferencial, setNovoDiferencial] = useState("");
  const [novoExame, setNovoExame] = useState("");

  useEffect(() => {
    if (onChange) {
      onChange(diagnostico);
    }
  }, [diagnostico, onChange]);

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
      !diagnostico.hipotesePrincipal.trim() ||
      !diagnostico.conduta.trim()
    ) {
      alert("Por favor, preencha Hipótese Principal e Conduta");
      return;
    }
    onSubmit(diagnostico);
  };

  const inputClass = "w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 text-slate-900 placeholder-slate-400 text-sm";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-4">
      <div className="flex items-center gap-2 pb-1">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm border border-slate-200">⚕️</div>
        <h3 className="font-bold text-slate-800 text-sm">Diagnóstico e Conduta</h3>
      </div>

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
        <label className={labelClass}>Diagnósticos Diferenciais</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={novoDiferencial}
            onChange={(e) => setNovoDiferencial(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdicionarDiferencial(); } }}
            placeholder="Adicionar diferencial..."
            disabled={desabilitado}
            className={inputClass}
          />
          <button type="button" onClick={handleAdicionarDiferencial} disabled={desabilitado || !novoDiferencial.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 px-3.5 rounded-xl text-sm shrink-0 transition-colors">
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {diagnostico.diagnosticosDisferenciais.map((diff, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-semibold">
              {diff}
              <button type="button" onClick={() => handleRemoverDiferencial(idx)} disabled={desabilitado} className="text-blue-400 hover:text-blue-700 font-bold ml-0.5">×</button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Exames Indicados</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={novoExame}
            onChange={(e) => setNovoExame(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdicionarExame(); } }}
            placeholder="ECG, Troponina, Raio X..."
            disabled={desabilitado}
            className={inputClass}
          />
          <button type="button" onClick={handleAdicionarExame} disabled={desabilitado || !novoExame.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2.5 px-3.5 rounded-xl text-sm shrink-0 transition-colors">
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {diagnostico.examesIndicados.map((exame, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">
              {exame}
              <button type="button" onClick={() => handleRemoverExame(idx)} disabled={desabilitado} className="text-emerald-400 hover:text-emerald-700 font-bold ml-0.5">×</button>
            </span>
          ))}
        </div>
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

      <button
        type="submit"
        disabled={desabilitado}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-2.5 px-4 rounded-xl transition-all text-sm shadow-sm active:scale-[0.98]"
      >
        Finalizar Atendimento e Ver Feedback
      </button>
    </form>
  );
}
