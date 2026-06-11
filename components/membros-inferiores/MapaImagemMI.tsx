'use client'

import { useState, useEffect } from 'react'
import { RegiaoVisualMI, MAPA_REGIAO_VISUAL_PARA_CLINICA, obterPulso } from '@/lib/membros-inferiores/coordenadas'
import { PulsoArterialMI, PulsoPositionado } from '@/lib/membros-inferiores/types'

interface MapaImagemMIProps {
  titulo: string
  src: string
  regioes: RegiaoVisualMI[]
  regiaoSelecionada: string | null
  onSelecionarRegiao: (regiaoVisualId: string, regiaoClinicaId: string) => void
  vista: 'frontal' | 'posterior' | 'plantar'
  draggedPulso: PulsoArterialMI | null
  onDropPulso: (xDrop: number, yDrop: number, vista: 'frontal' | 'posterior' | 'plantar') => void
  resetCounter: number
  pulsosDrop: PulsoPositionado[]
}

export default function MapaImagemMI({
  titulo,
  src,
  regioes,
  regiaoSelecionada,
  onSelecionarRegiao,
  vista,
  draggedPulso,
  onDropPulso,
  resetCounter,
  pulsosDrop,
}: MapaImagemMIProps) {
  const handleRegiao = (regiao: RegiaoVisualMI) => {
    const regiaoClinica = MAPA_REGIAO_VISUAL_PARA_CLINICA[regiao.id]
    if (regiaoClinica) {
      onSelecionarRegiao(regiao.id, regiaoClinica)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    if (draggedPulso) {
      e.preventDefault()
    }
  }

  const handleDropPulso = (e: React.DragEvent) => {
    e.preventDefault()

    if (!draggedPulso) return

    const container = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const xPct = ((e.clientX - container.left) / container.width) * 100
    const yPct = ((e.clientY - container.top) / container.height) * 100

    // Registrar drop
    onDropPulso(xPct, yPct, vista)
  }

  // Filtrar pulsos posicionados desta vista
  const pulsosDestaVista = pulsosDrop.filter(p => p.vista === vista)

  return (
    <div className="flex flex-col gap-2">
      {/* Título */}
      <h4 className="text-sm font-semibold text-slate-700">{titulo}</h4>

      {/* Container da imagem */}
      <div
        className="relative aspect-[3/5] w-full max-w-xs rounded-xl bg-white border border-slate-200 overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={handleDropPulso}
      >
        {/* Imagem base */}
        <img
          src={src}
          alt={`Membros inferiores - ${titulo}`}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />

        {/* Hotspots clicáveis */}
        {regioes.map(regiao => (
          <button
            key={regiao.id}
            type="button"
            title={regiao.label}
            aria-label={regiao.label}
            onClick={() => handleRegiao(regiao)}
            className={`absolute z-10 rounded-xl border transition-all cursor-pointer ${
              regiaoSelecionada === regiao.id
                ? 'border-blue-500 bg-blue-500/25 shadow-md'
                : 'border-transparent hover:border-blue-400/50 hover:bg-blue-400/15'
            }`}
            style={{
              left: `${regiao.x}%`,
              top: `${regiao.y}%`,
              width: `${regiao.width}%`,
              height: `${regiao.height}%`,
            }}
          />
        ))}

        {/* Marcadores de pulsos posicionados */}
        {pulsosDestaVista.map(pulsoDrop => {
          const pulso = obterPulso(pulsoDrop.id)
          return (
            <div
              key={pulsoDrop.id}
              className="absolute w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border border-blue-600 pointer-events-none"
              style={{
                left: `${pulsoDrop.xDrop}%`,
                top: `${pulsoDrop.yDrop}%`,
                transform: 'translate(-50%, -50%)',
              }}
              title={pulso?.label}
            >
              ✓
            </div>
          )
        })}
      </div>
    </div>
  )
}
