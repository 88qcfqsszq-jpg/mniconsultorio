'use client'

import { useState } from 'react'
import { RegiaoMembroInferior, AchadoMembrosInferiores, PadraoMembrosInferiores } from '@/lib/membros-inferiores/types'
import { obterRegiaoMembro } from '@/lib/membros-inferiores/regioes-buscaativa'
import { obterResultadoBuscaAtiva } from '@/lib/membros-inferiores/resultados-buscaativa'
import PernasInterativas from '@/components/membros-inferiores/PernasInterativas'

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
      {/* Ilustração interativa das pernas */}
      <div className="w-full">
        <PernasInterativas
          regiaoSelecionada={regiaoSelecionada}
          onRegiaoClicada={setRegiaoSelecionada}
        />
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
