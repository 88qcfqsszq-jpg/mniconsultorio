'use client'

import Image from 'next/image'
import { RegiaoMembroInferior } from '@/lib/membros-inferiores/types'
import { REGIOES_MEMBROS_INFERIORES } from '@/lib/membros-inferiores/coordenadas'

interface PernasInterativasProps {
  regiaoSelecionada: RegiaoMembroInferior | null
  onRegiaoClicada: (regiao: RegiaoMembroInferior) => void
}

export default function PernasInterativas({
  regiaoSelecionada,
  onRegiaoClicada,
}: PernasInterativasProps) {
  return (
    <div className="relative mx-auto aspect-[3/5] w-full max-w-sm rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
      {/* Imagem base das pernas */}
      <img
        src="/images/boneco/pernas_frontal_base_hotspots.png"
        alt="Ilustração frontal dos membros inferiores"
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* Hotspots clicáveis (invisíveis, mostram hover e seleção) */}
      {REGIOES_MEMBROS_INFERIORES.map(regiao => (
        <div
          key={regiao.id}
          onClick={() => onRegiaoClicada(regiao.id as RegiaoMembroInferior)}
          className={`absolute rounded-lg border transition-all cursor-pointer ${
            regiaoSelecionada === regiao.id
              ? 'bg-blue-500/25 border-blue-500 shadow-md'
              : 'border-transparent hover:bg-blue-400/15 hover:border-blue-400/50'
          }`}
          style={{
            left: `${regiao.x}%`,
            top: `${regiao.y}%`,
            width: `${regiao.width}%`,
            height: `${regiao.height}%`,
          }}
          title={regiao.label}
        />
      ))}
    </div>
  )
}
