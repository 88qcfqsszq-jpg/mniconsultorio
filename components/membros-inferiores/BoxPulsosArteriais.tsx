'use client'

import { PULSOS_ARTERIAIS_MI } from '@/lib/membros-inferiores/coordenadas'
import { PulsoArterialMI } from '@/lib/membros-inferiores/types'

interface BoxPulsosArteraisProps {
  pulsosPositionados: PulsoArterialMI[]
  onDragStart: (pulsoId: PulsoArterialMI) => void
}

export default function BoxPulsosArteriais({
  pulsosPositionados,
  onDragStart,
}: BoxPulsosArteraisProps) {
  const pulsosDisponiveis = PULSOS_ARTERIAIS_MI.filter(
    p => !pulsosPositionados.includes(p.id)
  )

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
      <div className="space-y-1">
        <h4 className="font-bold text-slate-800 text-sm">Palpação dos pulsos arteriais</h4>
        <p className="text-xs text-slate-600">
          👆 Arraste a artéria até o ponto correto de palpação
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {pulsosDisponiveis.length > 0 ? (
          pulsosDisponiveis.map(pulso => (
            <div
              key={pulso.id}
              draggable
              onDragStart={() => onDragStart(pulso.id)}
              className="p-2 bg-blue-50 border border-blue-200 rounded cursor-grab active:cursor-grabbing hover:bg-blue-100 transition-colors text-xs font-semibold text-blue-800 text-center"
            >
              {pulso.labelCurto}
            </div>
          ))
        ) : (
          <p className="text-xs text-slate-500 col-span-2 text-center py-4">
            Todos os pulsos foram posicionados!
          </p>
        )}
      </div>
    </div>
  )
}
