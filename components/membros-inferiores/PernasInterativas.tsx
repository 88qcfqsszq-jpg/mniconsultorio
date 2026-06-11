'use client'

import {
  REGIOES_FRONTAIS_MEMBROS_INFERIORES,
  REGIOES_POSTERIORES_MEMBROS_INFERIORES,
  REGIOES_BASE_PLANTAR_MEMBROS_INFERIORES,
} from '@/lib/membros-inferiores/coordenadas'
import { PulsoArterialMI, PulsoPositionado } from '@/lib/membros-inferiores/types'
import MapaImagemMI from '@/components/membros-inferiores/MapaImagemMI'

interface PernasInterativasProps {
  regiaoSelecionada: string | null
  onSelecionarRegiao: (regiaoVisualId: string, regiaoClinicaId: string) => void
  draggedPulso: PulsoArterialMI | null
  onDropPulso: (xDrop: number, yDrop: number, vista: 'frontal' | 'posterior' | 'plantar') => void
  resetCounter: number
  pulsosDrop: PulsoPositionado[]
}

export default function PernasInterativas({
  regiaoSelecionada,
  onSelecionarRegiao,
  draggedPulso,
  onDropPulso,
  resetCounter,
  pulsosDrop,
}: PernasInterativasProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Vista Frontal */}
      <MapaImagemMI
        titulo="Frontal"
        src="/images/boneco/pernas_frontal_base_hotspots.png"
        regioes={REGIOES_FRONTAIS_MEMBROS_INFERIORES}
        regiaoSelecionada={regiaoSelecionada}
        onSelecionarRegiao={onSelecionarRegiao}
        vista="frontal"
        draggedPulso={draggedPulso}
        onDropPulso={onDropPulso}
        resetCounter={resetCounter}
        pulsosDrop={pulsosDrop}
      />

      {/* Vista Posterior */}
      <MapaImagemMI
        titulo="Posterior"
        src="/images/boneco/pernas_posterior_hotspot.png"
        regioes={REGIOES_POSTERIORES_MEMBROS_INFERIORES}
        regiaoSelecionada={regiaoSelecionada}
        onSelecionarRegiao={onSelecionarRegiao}
        vista="posterior"
        draggedPulso={draggedPulso}
        onDropPulso={onDropPulso}
        resetCounter={resetCounter}
        pulsosDrop={pulsosDrop}
      />

      {/* Vista Base Plantar */}
      <MapaImagemMI
        titulo="Base plantar"
        src="/images/boneco/base-plantar.png"
        regioes={REGIOES_BASE_PLANTAR_MEMBROS_INFERIORES}
        regiaoSelecionada={regiaoSelecionada}
        onSelecionarRegiao={onSelecionarRegiao}
        vista="plantar"
        draggedPulso={draggedPulso}
        onDropPulso={onDropPulso}
        resetCounter={resetCounter}
        pulsosDrop={pulsosDrop}
      />
    </div>
  )
}
