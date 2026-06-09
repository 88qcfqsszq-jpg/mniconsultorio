'use client'

import { useState, useRef } from 'react'
import { ECGLeadPosition, ECGLead } from '@/lib/ecg/types'
import { validarEletrodos } from '@/lib/ecg/validarEletrodos'
import { obterPadrao, PADROES_ECG } from '@/lib/ecg/padroesECG'
import ECGTrace from './ECGTrace'
import ECGReport from './ECGReport'

const LEADS: ECGLead[] = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'RA', 'LA', 'RL', 'LL']

interface SimuladorECGProps {
  padrao?: string
}

export default function SimuladorECG({ padrao = 'normal' }: SimuladorECGProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [eletrodos, setEletrodos] = useState<ECGLeadPosition[]>(() =>
    LEADS.map((lead) => ({
      lead,
      x: 0,
      y: 0,
      isPlaced: false,
    }))
  )
  const [eletrodoDragging, setEletrodoDragging] = useState<ECGLead | null>(null)
  const [validacao, setValidacao] = useState<any>(null)
  const [ecgGerado, setEcgGerado] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const pattern = obterPadrao(padrao)

  if (!pattern) {
    return null
  }

  function handleDragStart(lead: ECGLead, e: React.DragEvent) {
    e.dataTransfer.effectAllowed = 'move'
    setEletrodoDragging(lead)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()

    if (!containerRef.current || !eletrodoDragging) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Garantir que está dentro dos limites
    const xFinal = Math.max(0, Math.min(100, x))
    const yFinal = Math.max(0, Math.min(100, y))

    setEletrodos((prev) =>
      prev.map((el) =>
        el.lead === eletrodoDragging
          ? { ...el, x: xFinal, y: yFinal, isPlaced: true }
          : el
      )
    )

    setEletrodoDragging(null)
  }

  function gerarECG() {
    const result = validarEletrodos(eletrodos)
    setValidacao(result)

    if (result.exameTecnicamenteAdequado) {
      setEcgGerado(true)
    }
  }

  function resetarSimulador() {
    setEletrodos((prev) => prev.map((el) => ({ ...el, x: 0, y: 0, isPlaced: false })))
    setValidacao(null)
    setEcgGerado(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-sm"
      >
        📊 Realizar ECG 12 Derivações
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold">Simulador de ECG</h2>
            <p className="text-sm text-purple-100 mt-1">Arraste os eletrodos para o paciente</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
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
        </div>

        <div className="p-6 space-y-6">
          {/* Área principal de simulação */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Área de arrastar eletrodos */}
            <div className="lg:col-span-2">
              <div
                ref={containerRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 min-h-[400px] relative cursor-grab flex items-center justify-center"
              >
                {/* Desenho esquemático do paciente */}
                <svg
                  viewBox="0 0 200 400"
                  className="w-full h-full max-w-xs mx-auto"
                  style={{ aspectRatio: '1/2' }}
                >
                  {/* Cabeça */}
                  <circle cx="100" cy="50" r="30" fill="#f5d5b8" stroke="#000" strokeWidth="2" />

                  {/* Corpo */}
                  <rect x="85" y="85" width="30" height="80" fill="#f5d5b8" stroke="#000" strokeWidth="2" />

                  {/* Braço direito */}
                  <rect x="115" y="100" width="50" height="15" fill="#f5d5b8" stroke="#000" strokeWidth="2" />
                  <circle cx="165" cy="107" r="10" fill="#f5d5b8" stroke="#000" strokeWidth="2" />

                  {/* Braço esquerdo */}
                  <rect x="35" y="100" width="50" height="15" fill="#f5d5b8" stroke="#000" strokeWidth="2" />
                  <circle cx="35" cy="107" r="10" fill="#f5d5b8" stroke="#000" strokeWidth="2" />

                  {/* Perna direita */}
                  <rect x="95" y="170" width="12" height="100" fill="#f5d5b8" stroke="#000" strokeWidth="2" />
                  <circle cx="101" cy="280" r="10" fill="#f5d5b8" stroke="#000" strokeWidth="2" />

                  {/* Perna esquerda */}
                  <rect x="93" y="170" width="12" height="100" fill="#f5d5b8" stroke="#000" strokeWidth="2" />
                  <circle cx="99" cy="280" r="10" fill="#f5d5b8" stroke="#000" strokeWidth="2" />
                </svg>

                {/* Eletrodos posicionados */}
                {eletrodos
                  .filter((el) => el.isPlaced)
                  .map((el) => (
                    <div
                      key={el.lead}
                      style={{
                        position: 'absolute',
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="w-8 h-8 bg-red-500 rounded-full border-2 border-red-700 flex items-center justify-center text-white text-xs font-bold cursor-move hover:bg-red-600 transition-colors shadow-lg"
                      draggable
                      onDragStart={(e) => handleDragStart(el.lead, e)}
                    >
                      {el.lead}
                    </div>
                  ))}
              </div>

              {/* Instrução */}
              <p className="text-sm text-slate-600 mt-3">
                ✋ Arraste os eletrodos da lista abaixo para o paciente. Coloque-os nas posições corretas do tórax
                e membros.
              </p>
            </div>

            {/* Lista de eletrodos */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Eletrodos</h3>
              <div className="space-y-2">
                {LEADS.map((lead) => {
                  const el = eletrodos.find((e) => e.lead === lead)
                  const isPlaced = el?.isPlaced

                  return (
                    <div
                      key={lead}
                      draggable
                      onDragStart={(e) => handleDragStart(lead, e)}
                      className={`p-3 rounded-lg font-semibold cursor-move transition-all ${
                        isPlaced
                          ? 'bg-green-100 border border-green-400 text-green-800'
                          : 'bg-slate-200 border border-slate-400 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      {isPlaced ? '✅' : '⭕'} {lead}
                    </div>
                  )
                })}
              </div>

              {/* Progresso */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <p className="text-xs font-semibold text-slate-600 mb-2">Progresso</p>
                <div className="bg-slate-300 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(eletrodos.filter((e) => e.isPlaced).length / LEADS.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  {eletrodos.filter((e) => e.isPlaced).length}/{LEADS.length}
                </p>
              </div>

              {/* Botões */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={gerarECG}
                  disabled={eletrodos.filter((e) => e.isPlaced).length < 8}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  📊 Gerar ECG
                </button>
                <button
                  onClick={resetarSimulador}
                  className="w-full py-2 px-4 bg-slate-300 text-slate-800 rounded-lg font-semibold hover:bg-slate-400 transition-colors"
                >
                  🔄 Resetar
                </button>
              </div>
            </div>
          </div>

          {/* Mensagens técnicas */}
          {validacao && (
            <div
              className={`p-4 rounded-lg border ${
                validacao.exameTecnicamenteAdequado
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <div className="space-y-2">
                {validacao.mensagensTecnicas.map((msg: string, i: number) => (
                  <p
                    key={i}
                    className={validacao.exameTecnicamenteAdequado ? 'text-green-800' : 'text-red-800'}
                  >
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ECG Report e Trace */}
          {ecgGerado && validacao?.exameTecnicamenteAdequado && (
            <div className="space-y-6">
              <ECGReport pattern={pattern} validacao={validacao} />
              <ECGTrace pattern={pattern} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
