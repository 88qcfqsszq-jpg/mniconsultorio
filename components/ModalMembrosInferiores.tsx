'use client'

import { useState, useEffect } from 'react'
import {
  PadraoMembrosInferiores,
  AchadoMembrosInferiores,
  AcaoMembrosInferiores,
} from '@/lib/membros-inferiores/types'
import { obterAcoes } from '@/lib/membros-inferiores/padroes'

interface ModalMembrosInferioresProps {
  padrao?: PadraoMembrosInferiores
  onClose?: () => void
}

type AbaAtiva = 'inspecao' | 'pulsos' | 'manobras' | 'medidas' | 'exames'

export default function ModalMembrosInferiores({
  padrao = 'normal',
  onClose,
}: ModalMembrosInferioresProps) {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('inspecao')
  const [achados, setAchados] = useState<AchadoMembrosInferiores[]>([])
  const [acoes, setAcoes] = useState<AcaoMembrosInferiores[]>([])

  useEffect(() => {
    setAcoes(obterAcoes(padrao as PadraoMembrosInferiores))
    setAchados([])
  }, [padrao])

  // Fechar com tecla ESC
  useEffect(() => {
    if (!onClose) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleAcao = (acao: AcaoMembrosInferiores) => {
    const resultado = acao.funcao(padrao as PadraoMembrosInferiores)
    if (!resultado) return

    const novosAchados = Array.isArray(resultado) ? resultado : [resultado]
    const idsNovos = novosAchados.map((a) => a.id)
    const achadosAtuais = achados.filter((a) => !idsNovos.includes(a.id))
    setAchados([...achadosAtuais, ...novosAchados])
  }

  const handleResetar = () => {
    setAchados([])
  }

  const handleCopiar = () => {
    const texto = achados.map((a) => `${a.titulo}: ${a.descricao}`).join('\n')
    navigator.clipboard.writeText(texto)
    alert('Achados copiados para a área de transferência!')
  }

  const acoesAba = acoes.filter((a) => a.aba === abaAtiva)

  const abas: { id: AbaAtiva; label: string; icon: string }[] = [
    { id: 'inspecao', label: 'Inspeção', icon: '👁️' },
    { id: 'pulsos', label: 'Pulsos', icon: '💓' },
    { id: 'manobras', label: 'Manobras', icon: '🔍' },
    { id: 'medidas', label: 'Medidas', icon: '📏' },
    { id: 'exames', label: 'Exames', icon: '🏥' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold">Avaliação Completa dos Membros Inferiores</h2>
            <p className="text-sm text-blue-100 mt-1">Avaliação arterial, venosa e tromboembólica</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* Abas */}
          <div className="flex gap-2 border-b border-slate-200 overflow-x-auto">
            {abas.map((aba) => (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={`px-4 py-3 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${
                  abaAtiva === aba.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                {aba.icon} {aba.label}
              </button>
            ))}
          </div>

          {/* Conteúdo principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna esquerda: Ações */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
              <h3 className="font-bold text-slate-800 mb-4">Ações disponíveis</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {acoesAba.length > 0 ? (
                  acoesAba.map((acao) => (
                    <button
                      key={acao.id}
                      onClick={() => handleAcao(acao)}
                      className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-sm font-semibold text-blue-800 transition-colors"
                    >
                      <p className="font-bold">{acao.titulo}</p>
                      <p className="text-xs text-blue-600 mt-1">{acao.descricao}</p>
                    </button>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">Nenhuma ação nesta aba.</p>
                )}
              </div>
            </div>

            {/* Coluna central: Paciente visual */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 flex items-center justify-center">
              <div className="text-center space-y-4">
                <p className="text-4xl">🫀</p>
                <p className="font-bold text-slate-800">Membros Inferiores</p>
                <p className="text-sm text-slate-600">Visualização dos achados selecionados</p>
                {achados.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs font-semibold text-blue-900">
                      {achados.length} achado{achados.length !== 1 ? 's' : ''} encontrado{achados.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Coluna direita: Painel de achados */}
            <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
              <h3 className="font-bold text-slate-800">Achados encontrados</h3>
              {achados.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {achados.map((achado, idx) => (
                    <div
                      key={`${achado.id}-${idx}`}
                      className="p-3 bg-slate-50 rounded border border-slate-200 text-sm"
                    >
                      <p className="font-semibold text-slate-800">{achado.titulo}</p>
                      <p className="text-slate-700 mt-1">{achado.descricao}</p>
                      {achado.lado && achado.lado !== 'nao-aplicavel' && (
                        <p className="text-xs text-slate-500 mt-2">Lado: {achado.lado}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">Nenhum achado registrado ainda. Execute ações para registrar.</p>
              )}
            </div>
          </div>

          {/* Botões inferiores */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleResetar}
              className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
            >
              🔄 Resetar avaliação
            </button>
            <button
              onClick={handleCopiar}
              disabled={achados.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📋 Copiar achados
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
