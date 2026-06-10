'use client'

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
    <div className="relative mx-auto aspect-[3/5] w-full max-w-sm rounded-xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 overflow-hidden">
      {/* SVG da ilustração das pernas */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="legGradientL" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f5deb3" />
            <stop offset="50%" stopColor="#edd5b1" />
            <stop offset="100%" stopColor="#f5deb3" />
          </linearGradient>
          <linearGradient id="legGradientR" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f5deb3" />
            <stop offset="50%" stopColor="#edd5b1" />
            <stop offset="100%" stopColor="#f5deb3" />
          </linearGradient>
          <filter id="shadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>
        </defs>

        {/* ===== COXA DIREITA (anatomicamente à esquerda) ===== */}
        <path
          d="M 27 12 L 39 12 L 40 38 L 28 38 Z"
          fill="url(#legGradientL)"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />

        {/* Linha musculatura coxa direita */}
        <line x1="33" y1="12" x2="34" y2="38" stroke="#94a3b8" strokeWidth="0.2" opacity="0.5" />

        {/* ===== COXA ESQUERDA (anatomicamente à direita) ===== */}
        <path
          d="M 61 12 L 73 12 L 72 38 L 60 38 Z"
          fill="url(#legGradientR)"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />

        {/* Linha musculatura coxa esquerda */}
        <line x1="67" y1="12" x2="66" y2="38" stroke="#94a3b8" strokeWidth="0.2" opacity="0.5" />

        {/* ===== JOELHO DIREITO (transição) ===== */}
        <ellipse cx="33" cy="38.5" rx="5.5" ry="3.5" fill="#e8d4c4" stroke="#cbd5e1" strokeWidth="0.3" />
        <line x1="30" y1="38.5" x2="36" y2="38.5" stroke="#94a3b8" strokeWidth="0.2" opacity="0.6" />

        {/* ===== JOELHO ESQUERDO (transição) ===== */}
        <ellipse cx="67" cy="38.5" rx="5.5" ry="3.5" fill="#e8d4c4" stroke="#cbd5e1" strokeWidth="0.3" />
        <line x1="64" y1="38.5" x2="70" y2="38.5" stroke="#94a3b8" strokeWidth="0.2" opacity="0.6" />

        {/* ===== PANTURRILHA DIREITA ===== */}
        <path
          d="M 28 42 Q 26 55 28 72 L 38 72 Q 40 55 40 42 Z"
          fill="url(#legGradientL)"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />

        {/* Linha musculatura panturrilha direita */}
        <line x1="33" y1="42" x2="32" y2="72" stroke="#94a3b8" strokeWidth="0.2" opacity="0.5" />

        {/* ===== PANTURRILHA ESQUERDA ===== */}
        <path
          d="M 60 42 Q 58 55 60 72 L 70 72 Q 72 55 72 42 Z"
          fill="url(#legGradientR)"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />

        {/* Linha musculatura panturrilha esquerda */}
        <line x1="67" y1="42" x2="68" y2="72" stroke="#94a3b8" strokeWidth="0.2" opacity="0.5" />

        {/* ===== TORNOZELO DIREITO ===== */}
        <ellipse cx="33" cy="72.5" rx="5.5" ry="3" fill="#e8d4c4" stroke="#cbd5e1" strokeWidth="0.3" />

        {/* Maléolo medial direito (pequeno ponto) */}
        <circle cx="30.5" cy="75" r="1.2" fill="#d4b5a0" stroke="#94a3b8" strokeWidth="0.2" />

        {/* Maléolo lateral direito (pequeno ponto) */}
        <circle cx="35.5" cy="75" r="1.2" fill="#d4b5a0" stroke="#94a3b8" strokeWidth="0.2" />

        {/* ===== TORNOZELO ESQUERDO ===== */}
        <ellipse cx="67" cy="72.5" rx="5.5" ry="3" fill="#e8d4c4" stroke="#cbd5e1" strokeWidth="0.3" />

        {/* Maléolo medial esquerdo */}
        <circle cx="64.5" cy="75" r="1.2" fill="#d4b5a0" stroke="#94a3b8" strokeWidth="0.2" />

        {/* Maléolo lateral esquerdo */}
        <circle cx="69.5" cy="75" r="1.2" fill="#d4b5a0" stroke="#94a3b8" strokeWidth="0.2" />

        {/* ===== PÉ DIREITO ===== */}
        {/* Dorso do pé */}
        <path
          d="M 23 76 Q 28 76 38 75.5 L 37 87 Q 28 87 23 87 Z"
          fill="url(#legGradientL)"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />

        {/* Hálux direito */}
        <ellipse cx="39" cy="83" rx="2.5" ry="3.5" fill="url(#legGradientL)" stroke="#cbd5e1" strokeWidth="0.2" />

        {/* Outros dedos esquemáticos */}
        <ellipse cx="37" cy="85" rx="1.5" ry="2.5" fill="url(#legGradientL)" stroke="#cbd5e1" strokeWidth="0.2" />
        <ellipse cx="34" cy="86" rx="1.5" ry="2.5" fill="url(#legGradientL)" stroke="#cbd5e1" strokeWidth="0.2" />
        <ellipse cx="31" cy="86.5" rx="1.5" ry="2.5" fill="url(#legGradientL)" stroke="#cbd5e1" strokeWidth="0.2" />
        <ellipse cx="27" cy="86" rx="1.5" ry="2.5" fill="url(#legGradientL)" stroke="#cbd5e1" strokeWidth="0.2" />

        {/* ===== PÉ ESQUERDO ===== */}
        {/* Dorso do pé */}
        <path
          d="M 62 76 Q 67 76 72 75.5 L 73 87 Q 68 87 62 87 Z"
          fill="url(#legGradientR)"
          stroke="#cbd5e1"
          strokeWidth="0.3"
        />

        {/* Hálux esquerdo */}
        <ellipse cx="61" cy="83" rx="2.5" ry="3.5" fill="url(#legGradientR)" stroke="#cbd5e1" strokeWidth="0.2" />

        {/* Outros dedos esquemáticos */}
        <ellipse cx="63" cy="85" rx="1.5" ry="2.5" fill="url(#legGradientR)" stroke="#cbd5e1" strokeWidth="0.2" />
        <ellipse cx="66" cy="86" rx="1.5" ry="2.5" fill="url(#legGradientR)" stroke="#cbd5e1" strokeWidth="0.2" />
        <ellipse cx="69" cy="86.5" rx="1.5" ry="2.5" fill="url(#legGradientR)" stroke="#cbd5e1" strokeWidth="0.2" />
        <ellipse cx="73" cy="86" rx="1.5" ry="2.5" fill="url(#legGradientR)" stroke="#cbd5e1" strokeWidth="0.2" />
      </svg>

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
