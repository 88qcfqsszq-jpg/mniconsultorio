'use client'

import { ECGPattern } from '@/lib/ecg/types'

interface ECGTraceProps {
  pattern: ECGPattern
}

export default function ECGTrace({ pattern }: ECGTraceProps) {
  const derivacoes = [
    { id: 'DI', label: 'DI' },
    { id: 'DII', label: 'DII' },
    { id: 'DIII', label: 'DIII' },
    { id: 'aVR', label: 'aVR' },
    { id: 'aVL', label: 'aVL' },
    { id: 'aVF', label: 'aVF' },
    { id: 'V1', label: 'V1' },
    { id: 'V2', label: 'V2' },
    { id: 'V3', label: 'V3' },
    { id: 'V4', label: 'V4' },
    { id: 'V5', label: 'V5' },
    { id: 'V6', label: 'V6' },
  ]

  function desenharTraco(
    derivacao: string,
    temSupra: boolean,
    temInfra: boolean,
    temInversao: boolean
  ) {
    // Desenho esquemático simples de um traçado de ECG
    // Cada derivação tem 150px de altura e 200px de largura
    const largura = 200
    const altura = 40
    const centroY = altura / 2

    let d = `M 0 ${centroY}` // Começar no centro

    if (temSupra) {
      // ST elevado - desenha linha acima
      d += ` L 30 ${centroY} L 60 ${centroY - 12} L 90 ${centroY - 12} L 120 ${centroY}`
    } else if (temInfra) {
      // ST deprimido - desenha linha abaixo
      d += ` L 30 ${centroY} L 60 ${centroY + 8} L 90 ${centroY + 8} L 120 ${centroY}`
    } else {
      // Normal
      d += ` L 50 ${centroY}`
    }

    // Onda T
    if (temInversao) {
      // T invertida
      d += ` L 140 ${centroY + 8} L 170 ${centroY}`
    } else {
      // T normal
      d += ` L 140 ${centroY - 3} L 170 ${centroY}`
    }

    d += ` L ${largura} ${centroY}`

    return d
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Traçado ECG 12 Derivações</h3>

      {/* Grid 3x4 de derivações */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {derivacoes.map((der) => {
          const temSupra = pattern.derivacoesComSupra.includes(der.id)
          const temInfra = pattern.derivacoesComInfra.includes(der.id)
          const temInversao = pattern.derivacoesComInversaoT.includes(der.id)

          return (
            <div
              key={der.id}
              className={`border rounded p-2 ${
                temSupra
                  ? 'bg-red-50 border-red-300'
                  : temInfra
                    ? 'bg-yellow-50 border-yellow-300'
                    : temInversao
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-slate-50 border-slate-300'
              }`}
            >
              <p className="text-xs font-bold text-slate-700 mb-1">{der.label}</p>
              <svg width="100%" height="50" viewBox="0 0 200 40">
                {/* Desenhar grid de fundo (papel de ECG) */}
                <defs>
                  <pattern
                    id={`grid-${der.id}`}
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="4" height="4" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="200" height="40" fill={`url(#grid-${der.id})`} />

                {/* Desenhar traço */}
                <path
                  d={desenharTraco(der.id, temSupra, temInfra, temInversao)}
                  stroke="#000"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              {/* Legenda */}
              <div className="text-xs mt-1 space-y-0.5">
                {temSupra && <p className="text-red-600">↑ SUPRA</p>}
                {temInfra && <p className="text-yellow-600">↓ INFRA</p>}
                {temInversao && <p className="text-blue-600">⌢ T inv</p>}
                {!temSupra && !temInfra && !temInversao && (
                  <p className="text-slate-500">Normal</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Legenda geral */}
      <div className="mt-6 p-4 bg-slate-50 rounded border border-slate-200">
        <p className="text-sm font-semibold text-slate-700 mb-2">Legenda:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-300 rounded-sm border border-red-500"></div>
            <span>SUPRA de ST</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-300 rounded-sm border border-yellow-500"></div>
            <span>INFRA de ST</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-300 rounded-sm border border-blue-500"></div>
            <span>T Invertida</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-300 rounded-sm border border-slate-500"></div>
            <span>Normal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
