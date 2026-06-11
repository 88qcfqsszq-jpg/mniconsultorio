'use client'

import { useState } from 'react'
import { PULSOS_ARTERIAIS_MI, validarPosicaoPulso, obterPulso } from '@/lib/membros-inferiores/coordenadas'
import { PulsoPositionado, AchadoMembrosInferiores, PadraoMembrosInferiores } from '@/lib/membros-inferiores/types'
import { obterRegiaoMembro } from '@/lib/membros-inferiores/regioes-buscaativa'
import { obterResultadoBuscaAtiva } from '@/lib/membros-inferiores/resultados-buscaativa'
import PernasInterativas from '@/components/membros-inferiores/PernasInterativas'

interface AbaPulsosDragDropProps {
  padrao: PadraoMembrosInferiores
  onAchadoRealizado: (achado: AchadoMembrosInferiores) => void
  achadosJaRegistrados: AchadoMembrosInferiores[]
}

export default function AbaPulsosDragDrop({
  padrao,
  onAchadoRealizado,
  achadosJaRegistrados,
}: AbaPulsosDragDropProps) {
  const [pulsosDrop, setPulsosDrop] = useState<PulsoPositionado[]>([])
  const [draggedPulso, setDraggedPulso] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string | null>(null)

  const pulsosPosicionados = pulsosDrop.map(p => p.id)
  const pulsosRestantes = PULSOS_ARTERIAIS_MI.filter(p => !pulsosPosicionados.includes(p.id))

  const handleDragStart = (pulsoId: string) => {
    setDraggedPulso(pulsoId)
    setErro(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDropSobreImagem = (e: React.DragEvent, vistaAtual: string) => {
    e.preventDefault()

    if (!draggedPulso) return

    const container = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const xPct = ((e.clientX - container.left) / container.width) * 100
    const yPct = ((e.clientY - container.top) / container.height) * 100

    const pulso = obterPulso(draggedPulso)
    if (!pulso) return

    // Validar posição
    if (!validarPosicaoPulso(pulso, xPct, yPct, vistaAtual)) {
      if (pulso.vista !== vistaAtual) {
        setErro(`Use a vista ${pulso.vista === 'posterior' ? 'posterior' : 'frontal'} para palpar a ${pulso.label.toLowerCase()}.`)
      } else {
        setErro('Local de palpação inadequado. Reposicione o ponto anatômico.')
      }
      setDraggedPulso(null)
      return
    }

    // Validação passou - registrar achado
    const mapeoPulsoParaAcao: Record<string, string> = {
      femoral_direita: 'pulso_femoral_d',
      femoral_esquerda: 'pulso_femoral_e',
      poplitea_direita: 'pulso_popliteo_d',
      poplitea_esquerda: 'pulso_popliteo_e',
      tibial_posterior_direita: 'pulso_tibial_post_d',
      tibial_posterior_esquerda: 'pulso_tibial_post_e',
      dorsal_pe_direita: 'pulso_ped_d',
      dorsal_pe_esquerda: 'pulso_ped_e',
    }

    const regiaoClinica = pulso.regiaoClinica

    // Obter resultado do pulso
    const resultado = obterResultadoBuscaAtiva(padrao, regiaoClinica as any, 'palpar_pulso_femoral')

    // Registrar achado
    const achado: AchadoMembrosInferiores = {
      id: `pulso-${draggedPulso}-${Date.now()}`,
      titulo: `${pulso.label}`,
      descricao: `Pulso: 2+/4.`, // Fallback neutro
      categoria: 'pulsos',
      regiao: regiaoClinica as any,
      acaoRealizada: 'Palpação',
    }

    // Se houver resultado específico do padrão, usar
    if (resultado && resultado.resultado) {
      achado.descricao = resultado.resultado
    }

    // Adicionar pulso posicionado
    setPulsosDrop([...pulsosDrop, { id: draggedPulso as any, xDrop: xPct, yDrop: yPct, vista: vistaAtual as any }])

    // Registrar achado
    onAchadoRealizado(achado)

    setDraggedPulso(null)
    setErro(null)
  }

  const handleResetarPulsos = () => {
    setPulsosDrop([])
    setErro(null)
  }

  return (
    <div className="space-y-4">
      {/* Instruções */}
      <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
        👆 Arraste a artéria até o ponto correto de palpação nas imagens
      </p>

      {/* Layout: Menu de cartões + Imagens + Achados */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Menu lateral: Cartões de artérias */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h4 className="font-bold text-sm text-slate-800 mb-3">Artérias para palpar</h4>
          <div className="space-y-2">
            {pulsosRestantes.map(pulso => (
              <div
                key={pulso.id}
                draggable
                onDragStart={() => handleDragStart(pulso.id)}
                className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-grab active:cursor-grabbing hover:bg-blue-100 transition-colors text-xs font-semibold text-blue-800"
              >
                {pulso.labelCurto}
              </div>
            ))}
            {pulsosRestantes.length === 0 && (
              <p className="text-xs text-slate-500">Todos os pulsos foram posicionados!</p>
            )}
          </div>
        </div>

        {/* Imagens - Coluna central */}
        <div className="lg:col-span-2 space-y-4">
          {/* Wrapper com imagens apenas para a aba Pulsos */}
          <div className="space-y-4">
            {/* Imagens sem hotspots de regiões, apenas para drag-and-drop */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropSobreImagem(e, 'frontal')}
              className="relative aspect-[3/5] w-full rounded-xl bg-white border-2 border-dashed border-slate-300 overflow-hidden"
            >
              <img
                src="/images/boneco/pernas_frontal_base_hotspots.png"
                alt="Vista frontal"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 text-xs font-semibold text-slate-600 bg-white/80 px-2 py-1 rounded">
                Frontal
              </div>

              {/* Marcadores de pulsos posicionados */}
              {pulsosDrop
                .filter(p => p.vista === 'frontal')
                .map(pulsoDrop => {
                  const pulso = obterPulso(pulsoDrop.id)
                  return (
                    <div
                      key={pulsoDrop.id}
                      className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-blue-600"
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

            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropSobreImagem(e, 'posterior')}
              className="relative aspect-[3/5] w-full rounded-xl bg-white border-2 border-dashed border-slate-300 overflow-hidden"
            >
              <img
                src="/images/boneco/pernas_posterior_hotspot.png"
                alt="Vista posterior"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 text-xs font-semibold text-slate-600 bg-white/80 px-2 py-1 rounded">
                Posterior
              </div>

              {/* Marcadores de pulsos posicionados */}
              {pulsosDrop
                .filter(p => p.vista === 'posterior')
                .map(pulsoDrop => {
                  const pulso = obterPulso(pulsoDrop.id)
                  return (
                    <div
                      key={pulsoDrop.id}
                      className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-blue-600"
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

          {/* Aviso de erro */}
          {erro && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              ⚠️ {erro}
            </div>
          )}

          {/* Botão resetar pulsos */}
          {pulsosDrop.length > 0 && (
            <button
              onClick={handleResetarPulsos}
              className="w-full px-3 py-2 text-sm bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
            >
              🔄 Resetar pulsos
            </button>
          )}
        </div>

        {/* Coluna direita vazia - espaço reservado para achados do modal principal */}
        <div className="lg:col-span-1 text-xs text-slate-500">
          <p className="text-center py-8">Achados serão exibidos no painel principal</p>
        </div>
      </div>
    </div>
  )
}
