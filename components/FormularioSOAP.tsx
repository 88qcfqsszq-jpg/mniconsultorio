"use client";

import { useState, useEffect } from "react";
import type { FormularioSOAP } from "@/lib/types";

interface FormularioSOAPProps {
  onSubmit?: (soap: FormularioSOAP) => void;
  onChange?: (soap: FormularioSOAP) => void;
  desabilitado?: boolean;
}

export default function FormularioSOAP({
  onSubmit,
  onChange,
  desabilitado = false,
}: FormularioSOAPProps) {
  const [soap, setSOAP] = useState<FormularioSOAP>({
    subjetivo: "",
    objetivo: "",
    avaliacao: "",
    plano: "",
  });

  useEffect(() => {
    if (onChange) {
      onChange(soap);
    }
  }, [soap, onChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !soap.subjetivo.trim() ||
      !soap.objetivo.trim() ||
      !soap.avaliacao.trim() ||
      !soap.plano.trim()
    ) {
      alert("Por favor, preencha todos os campos do SOAP");
      return;
    }
    if (onSubmit) {
      onSubmit(soap);
    }
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

    </form>
  );
}
