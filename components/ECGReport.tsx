'use client'

import { ECGPattern, ECGPlacementResult } from '@/lib/ecg/types'

interface ECGReportProps {
  pattern: ECGPattern
  validacao: ECGPlacementResult
}

export default function ECGReport({ pattern, validacao }: ECGReportProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200 space-y-6">
      {/* Aviso técnico se houver problemas */}
      {!validacao.exameTecnicamenteAdequado && (
        <div className="bg-red-50 border border-red-300 rounded p-4">
          <p className="text-red-800 font-semibold mb-2">⚠️ Aviso Técnico</p>
          <div className="text-sm text-red-700 space-y-1">
            {validacao.mensagensTecnicas.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        </div>
      )}

      {validacao.exameTecnicamenteAdequado && (
        <div className="bg-green-50 border border-green-300 rounded p-4">
          <p className="text-green-800 font-semibold">✅ Exame Adequado</p>
          <p className="text-sm text-green-700 mt-1">
            {validacao.percentualAcerto.toFixed(0)}% dos eletrodos posicionados corretamente
          </p>
        </div>
      )}

      {/* Título e padrão */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{pattern.titulo}</h2>
        <p className="text-slate-500 text-sm">Padrão: {pattern.id}</p>
      </div>

      {/* Medidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded p-3">
          <p className="text-xs text-slate-500 font-semibold">FC</p>
          <p className="text-lg font-bold text-slate-800">{pattern.frequenciaCardiaca} bpm</p>
        </div>
        <div className="bg-slate-50 rounded p-3">
          <p className="text-xs text-slate-500 font-semibold">Ritmo</p>
          <p className="text-lg font-bold text-slate-800">{pattern.ritmo}</p>
        </div>
        <div className="bg-slate-50 rounded p-3">
          <p className="text-xs text-slate-500 font-semibold">Eixo</p>
          <p className="text-lg font-bold text-slate-800">{pattern.eixo}</p>
        </div>
        <div className="bg-slate-50 rounded p-3">
          <p className="text-xs text-slate-500 font-semibold">PR</p>
          <p className="text-lg font-bold text-slate-800">{pattern.pr}</p>
        </div>
        <div className="bg-slate-50 rounded p-3">
          <p className="text-xs text-slate-500 font-semibold">QRS</p>
          <p className="text-lg font-bold text-slate-800">{pattern.qrs}</p>
        </div>
        <div className="bg-slate-50 rounded p-3">
          <p className="text-xs text-slate-500 font-semibold">QTc</p>
          <p className="text-lg font-bold text-slate-800">{pattern.qtc}</p>
        </div>
      </div>

      {/* Achados */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">Achados Principais</h3>
        <div className="space-y-2">
          {pattern.achados.map((achado, i) => (
            <div key={i} className="flex gap-3">
              <span className="font-semibold text-slate-600 min-w-max">{achado.derivacao}:</span>
              <span className="text-slate-700">{achado.achado}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Laudo */}
      <div className="bg-blue-50 rounded p-4 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Laudo</h3>
        <p className="text-blue-800 leading-relaxed">{pattern.laudo}</p>
      </div>

      {/* Observações clínicas */}
      {pattern.observacoesClinicas.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Observações Clínicas</h3>
          <ul className="space-y-2">
            {pattern.observacoesClinicas.map((obs, i) => (
              <li key={i} className="flex gap-2 text-slate-700">
                <span className="text-blue-600 font-bold">•</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Status de eletrodos */}
      {!validacao.exameTecnicamenteAdequado && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <h3 className="font-semibold text-yellow-900 mb-2">Posicionamento de Eletrodos</h3>
          <div className="text-sm text-yellow-800 space-y-2">
            {validacao.eletrodosCorretos.length > 0 && (
              <p>
                <span className="font-semibold">✅ Corretos:</span> {validacao.eletrodosCorretos.join(', ')}
              </p>
            )}
            {validacao.eletrodosMalPosicionados.length > 0 && (
              <p>
                <span className="font-semibold">❌ Mal posicionados:</span>{' '}
                {validacao.eletrodosMalPosicionados.join(', ')}
              </p>
            )}
            {validacao.eletrodosAusentes.length > 0 && (
              <p>
                <span className="font-semibold">⚠️ Ausentes:</span> {validacao.eletrodosAusentes.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
