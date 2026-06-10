'use client'

import { useState } from 'react'
import { RegiaoMembroInferior, AchadoMembrosInferiores, PadraoMembrosInferiores } from '@/lib/membros-inferiores/types'
import { obterRegiaoMembro } from '@/lib/membros-inferiores/regioes-buscaativa'
import { obterResultadoBuscaAtiva } from '@/lib/membros-inferiores/resultados-buscaativa'

interface PacienteInterativoProps {
  padrao: PadraoMembrosInferiores
  onAcaoRealizada: (achado: AchadoMembrosInferiores) => void
  achadosJaRegistrados: AchadoMembrosInferiores[]
}

export default function PacienteInterativoMembrosInferiores({
  padrao,
  onAcaoRealizada,
  achadosJaRegistrados,
}: PacienteInterativoProps) {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<RegiaoMembroInferior | null>(null)

  // Definição das regiões com coordenadas percentuais (SVG)
  const regioesDefinidas: Record<
    RegiaoMembroInferior,
    { x: number; y: number; r: number; label: string }
  > = {
    coxa_direita: { x: 30, y: 15, r: 6, label: 'Coxa D' },
    coxa_esquerda: { x: 70, y: 15, r: 6, label: 'Coxa E' },
    regiao_poplitea_direita: { x: 30, y: 32, r: 5, label: 'Poplítea D' },
    regiao_poplitea_esquerda: { x: 70, y: 32, r: 5, label: 'Poplítea E' },
    panturrilha_direita: { x: 30, y: 50, r: 6, label: 'Panturrilha D' },
    panturrilha_esquerda: { x: 70, y: 50, r: 6, label: 'Panturrilha E' },
    tornozelo_direito: { x: 30, y: 70, r: 4, label: 'Tornozelo D' },
    tornozelo_esquerdo: { x: 70, y: 70, r: 4, label: 'Tornozelo E' },
    maleolo_medial_direito: { x: 25, y: 75, r: 3, label: 'Maléolo D' },
    maleolo_medial_esquerdo: { x: 75, y: 75, r: 3, label: 'Maléolo E' },
    dorso_pe_direito: { x: 30, y: 85, r: 5, label: 'Dorso D' },
    dorso_pe_esquerdo: { x: 70, y: 85, r: 5, label: 'Dorso E' },
    planta_pe_direito: { x: 30, y: 92, r: 4, label: 'Planta D' },
    planta_pe_esquerdo: { x: 70, y: 92, r: 4, label: 'Planta E' },
    halux_direito: { x: 28, y: 96, r: 2, label: 'Hálux D' },
    halux_esquerdo: { x: 72, y: 96, r: 2, label: 'Hálux E' },
    trajeto_venoso_superficial_direito: { x: 30, y: 45, r: 7, label: 'Trajeto venoso D' },
    trajeto_venoso_superficial_esquerdo: { x: 70, y: 45, r: 7, label: 'Trajeto venoso E' },
  }

  const regiao = regiaoSelecionada ? obterRegiaoMembro(regiaoSelecionada) : null
  const acoes = regiao ? regiao.acoesDisponiveis : []

  const handleAcao = (acaoId: string, acaoLabel: string) => {
    if (!regiaoSelecionada) return

    const resultado = obterResultadoBuscaAtiva(padrao, regiaoSelecionada, acaoId)

    const achado: AchadoMembrosInferiores = {
      id: `${regiaoSelecionada}-${acaoId}-${Date.now()}`,
      titulo: `${regiao?.nome} — ${acaoLabel}`,
      descricao: resultado.resultado,
      categoria: 'inspecao',
      regiao: regiaoSelecionada,
      acaoRealizada: acaoLabel,
    }

    onAcaoRealizada(achado)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mapa corporal interativo */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 flex justify-center items-start min-h-80">
        <svg
          viewBox="0 0 100 100"
          width="200"
          height="400"
          className="border border-slate-300 rounded bg-slate-50"
        >
          {/* Desenho esquemático das pernas */}
          <defs>
            <linearGradient id="legGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#dbeafe" />
            </linearGradient>
          </defs>

          {/* Coxa direita */}
          <rect x="20" y="5" width="20" height="30" fill="url(#legGradient)" stroke="#64748b" strokeWidth="0.5" rx="2" />

          {/* Coxa esquerda */}
          <rect x="60" y="5" width="20" height="30" fill="url(#legGradient)" stroke="#64748b" strokeWidth="0.5" rx="2" />

          {/* Panturrilha direita */}
          <rect x="22" y="35" width="16" height="30" fill="url(#legGradient)" stroke="#64748b" strokeWidth="0.5" rx="2" />

          {/* Panturrilha esquerda */}
          <rect x="62" y="35" width="16" height="30" fill="url(#legGradient)" stroke="#64748b" strokeWidth="0.5" rx="2" />

          {/* Pé direito */}
          <rect x="20" y="65" width="20" height="12" fill="url(#legGradient)" stroke="#64748b" strokeWidth="0.5" rx="1" />

          {/* Pé esquerdo */}
          <rect x="60" y="65" width="20" height="12" fill="url(#legGradient)" stroke="#64748b" strokeWidth="0.5" rx="1" />

          {/* Regiões clicáveis */}
          {Object.entries(regioesDefinidas).map(([id, { x, y, r, label }]) => (
            <g key={id}>
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={regiaoSelecionada === id ? '#3b82f6' : '#cbd5e1'}
                opacity={regiaoSelecionada === id ? 0.8 : 0.3}
                stroke={regiaoSelecionada === id ? '#1e40af' : '#94a3b8'}
                strokeWidth={regiaoSelecionada === id ? '1.5' : '0.5'}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setRegiaoSelecionada(id as RegiaoMembroInferior)}
              />
              {regiaoSelecionada === id && (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="7"
                  fontWeight="bold"
                  fill="#ffffff"
                  pointerEvents="none"
                >
                  ●
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Painel de ações */}
      {regiaoSelecionada && regiao ? (
        <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-sm">
              📍 {regiao.nome}
            </h4>
            <button
              onClick={() => setRegiaoSelecionada(null)}
              className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              ✕ Desselecionar
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-2">Ações disponíveis:</p>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {acoes.length > 0 ? (
              acoes.map((acao) => (
                <button
                  key={acao.id}
                  onClick={() => handleAcao(acao.id, acao.label)}
                  className="w-full text-left p-2 bg-white hover:bg-blue-100 border border-blue-200 rounded text-xs font-medium text-blue-700 transition-colors active:scale-95"
                >
                  {acao.label}
                </button>
              ))
            ) : (
              <p className="text-xs text-slate-500">Nenhuma ação disponível para essa região.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-sm text-slate-500">
            👆 Clique em uma região das pernas para executar ações de exame.
          </p>
        </div>
      )}

      {/* Informações do paciente */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-50 border border-slate-200 rounded p-2 text-center">
          <p className="text-slate-500">Ações realizadas</p>
          <p className="font-bold text-lg text-slate-800">{achadosJaRegistrados.length}</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded p-2 text-center">
          <p className="text-slate-500">Achados encontrados</p>
          <p className="font-bold text-lg text-slate-800">{achadosJaRegistrados.filter(a => a.acaoRealizada).length}</p>
        </div>
      </div>
    </div>
  )
}
