"use client";

import { type Regiao, regioesBoneco } from "@/data/regioesBoneco";

interface MenuManobrasBonecoProps {
  regiaoSelecionada: Regiao | null;
  onManobraClicada: (manobra: string) => void;
  carregando?: boolean;
}

export default function MenuManobrasBoneco({
  regiaoSelecionada,
  onManobraClicada,
  carregando = false,
}: MenuManobrasBonecoProps) {
  if (!regiaoSelecionada) {
    return null;
  }

  return (
    <div className="w-full bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4">
      <div>
        <h4 className="font-bold text-slate-800 mb-1">Manobras disponíveis</h4>
        <p className="text-sm text-slate-600">
          {regiaoSelecionada.nome} ({regiaoSelecionada.vista})
        </p>
      </div>

      <div className="space-y-2">
        {regiaoSelecionada.manobras.map((manobra) => (
          <button
            key={manobra.id}
            onClick={() => onManobraClicada(manobra.textoAPI)}
            disabled={carregando}
            className="w-full text-left px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <p className="text-sm font-semibold text-slate-900">{manobra.nome}</p>
            <p className="text-xs text-slate-500 mt-0.5">→ {manobra.textoAPI}</p>
          </button>
        ))}
      </div>

      {/* Aviso especial para o Sinal de Homans */}
      {regiaoSelecionada.manobras.some(
        (m) => m.nome.includes("Sinal de Homans") || m.nome.includes("sinal de Homans")
      ) && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs font-semibold text-amber-900 mb-1">⚠️ Observação clínica:</p>
          <p className="text-xs text-amber-800 leading-relaxed">
            O Sinal de Homans possui baixa acurácia (sensibilidade ~50%, especificidade ~39%) e não confirma nem exclui TVP isoladamente. Deve ser correlacionado com escore de Wells e Doppler venoso.
          </p>
        </div>
      )}

      {carregando && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-xs text-blue-700">Processando manobra...</p>
        </div>
      )}
    </div>
  );
}
