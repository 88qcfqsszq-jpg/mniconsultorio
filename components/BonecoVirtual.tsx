"use client";

import { useState } from "react";
import { regioesBoneco, obterRegioesPorVista, type Regiao } from "@/data/regioesBoneco";

interface BonecoVirtualProps {
  onRegiaoSelecionada: (regiao: Regiao) => void;
  regiaoAtiva?: string;
  sexoPaciente?: "M" | "F" | "masculino" | "feminino" | string;
}

interface SvgRegiaoConfig {
  regiaoId: string;
  nome: string;
  tipo: "ellipse" | "rect" | "path";
  attrs?: Record<string, string | number>;
  pathD?: string;
}

const SVG_VIEWBOX = "0 0 1024 1536";

// Função para normalizar o sexo do paciente
function obterSexoNormalizado(sexo?: string): "masculino" | "feminino" {
  if (!sexo) return "masculino";

  const sexoNorm = String(sexo)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

  if (sexoNorm.includes("f") || sexoNorm.includes("feminino") || sexoNorm.includes("mulher")) {
    return "feminino";
  }

  return "masculino";
}

// ============ REGIÕES SVG MASCULINO ============

const regioesSvgMasculinoFrente: SvgRegiaoConfig[] = [
  {
    regiaoId: "cabeca_face",
    nome: "Cabeça e Face",
    tipo: "ellipse",
    attrs: { cx: 450, cy: 145, rx: 85, ry: 110 },
  },
  {
    regiaoId: "pescoco",
    nome: "Pescoço",
    tipo: "rect",
    attrs: { x: 395, y: 260, width: 110, height: 75, rx: 20 },
  },
  {
    regiaoId: "torax_anterior",
    nome: "Tórax",
    tipo: "path",
    pathD: "M 270 330 Q 250 380 250 480 L 280 560 L 620 560 L 650 480 Q 650 380 640 330 Q 455 310 270 330 Z",
  },
  {
    regiaoId: "precordio",
    nome: "Precórdio",
    tipo: "ellipse",
    attrs: { cx: 560, cy: 455, rx: 65, ry: 85 },
  },
  {
    regiaoId: "abdome",
    nome: "Abdome",
    tipo: "rect",
    attrs: { x: 280, y: 570, width: 340, height: 180, rx: 60 },
  },
  {
    regiaoId: "membros_inferiores",
    nome: "Membros inferiores",
    tipo: "path",
    pathD: "M 310 750 Q 300 850 310 1050 Q 310 1200 350 1400 L 650 1400 Q 690 1200 690 1050 Q 700 850 690 750 L 620 750 Q 610 880 600 1100 L 450 1100 Q 440 880 430 750 Z",
  },
];

const regioesSvgMasculinoCostas: SvgRegiaoConfig[] = [
  {
    regiaoId: "cabeca_face_posterior",
    nome: "Cabeça e Face",
    tipo: "ellipse",
    attrs: { cx: 450, cy: 145, rx: 85, ry: 110 },
  },
  {
    regiaoId: "pescoco_posterior",
    nome: "Pescoço",
    tipo: "rect",
    attrs: { x: 395, y: 260, width: 110, height: 75, rx: 20 },
  },
  {
    regiaoId: "torax_posterior",
    nome: "Tórax Posterior",
    tipo: "path",
    pathD: "M 270 330 Q 250 380 250 480 L 280 560 L 620 560 L 650 480 Q 650 380 640 330 Q 455 310 270 330 Z",
  },
  {
    regiaoId: "lombar",
    nome: "Região Lombar",
    tipo: "rect",
    attrs: { x: 280, y: 570, width: 340, height: 140, rx: 40 },
  },
  {
    regiaoId: "membros_inferiores_posteriores",
    nome: "Membros Inferiores Posteriores",
    tipo: "path",
    pathD: "M 310 750 Q 300 850 310 1050 Q 310 1200 350 1400 L 650 1400 Q 690 1200 690 1050 Q 700 850 690 750 L 620 750 Q 610 880 600 1100 L 450 1100 Q 440 880 430 750 Z",
  },
];

// ============ REGIÕES SVG FEMININO ============
// Ajustadas para proporções corporais femininas
// Deslocadas +40px para a direita para compensar alinhamento

const regioesSvgFemininoFrente: SvgRegiaoConfig[] = [
  {
    regiaoId: "cabeca_face",
    nome: "Cabeça e Face",
    tipo: "ellipse",
    attrs: { cx: 410, cy: 140, rx: 80, ry: 105 },
  },
  {
    regiaoId: "pescoco",
    nome: "Pescoço",
    tipo: "rect",
    attrs: { x: 370, y: 250, width: 80, height: 65, rx: 18 },
  },
  {
    regiaoId: "torax_anterior",
    nome: "Tórax",
    tipo: "path",
    pathD: "M 250 315 Q 240 365 240 445 L 270 525 L 550 525 L 580 445 Q 580 365 570 315 Q 410 300 250 315 Z",
  },
  {
    regiaoId: "precordio",
    nome: "Precórdio",
    tipo: "ellipse",
    attrs: { cx: 475, cy: 465, rx: 60, ry: 80 },
  },
  {
    regiaoId: "abdome",
    nome: "Abdome",
    tipo: "rect",
    attrs: { x: 250, y: 535, width: 320, height: 175, rx: 55 },
  },
  {
    regiaoId: "membros_inferiores",
    nome: "Membros inferiores",
    tipo: "path",
    pathD: "M 200 750 Q 190 880 200 1080 Q 210 1250 240 1400 L 520 1400 Q 550 1250 560 1080 Q 570 880 560 750 L 490 750 Q 480 880 475 1100 L 335 1100 Q 330 880 320 750 Z",
  },
];

const regioesSvgFemininoCostas: SvgRegiaoConfig[] = [
  {
    regiaoId: "cabeca_face_posterior",
    nome: "Cabeça e Face",
    tipo: "ellipse",
    attrs: { cx: 350, cy: 140, rx: 80, ry: 105 },
  },
  {
    regiaoId: "pescoco_posterior",
    nome: "Pescoço",
    tipo: "rect",
    attrs: { x: 310, y: 250, width: 80, height: 65, rx: 18 },
  },
  {
    regiaoId: "torax_posterior",
    nome: "Tórax Posterior",
    tipo: "path",
    pathD: "M 190 315 Q 180 365 180 445 L 210 525 L 490 525 L 520 445 Q 520 365 510 315 Q 350 300 190 315 Z",
  },
  {
    regiaoId: "lombar",
    nome: "Região Lombar",
    tipo: "rect",
    attrs: { x: 190, y: 535, width: 320, height: 140, rx: 45 },
  },
  {
    regiaoId: "membros_inferiores_posteriores",
    nome: "Membros Inferiores Posteriores",
    tipo: "path",
    pathD: "M 180 750 Q 170 880 180 1080 Q 190 1250 220 1400 L 500 1400 Q 530 1250 540 1080 Q 550 880 540 750 L 470 750 Q 460 880 455 1100 L 315 1100 Q 310 880 300 750 Z",
  },
];

// ============ MAPA DE REGIÕES POR SEXO E VISTA ============

const regioesSvgPorSexo = {
  masculino: {
    frente: regioesSvgMasculinoFrente,
    costas: regioesSvgMasculinoCostas,
  },
  feminino: {
    frente: regioesSvgFemininoFrente,
    costas: regioesSvgFemininoCostas,
  },
};

export default function BonecoVirtual({
  onRegiaoSelecionada,
  regiaoAtiva,
  sexoPaciente,
}: BonecoVirtualProps) {
  const [vista, setVista] = useState<"frente" | "costas">("frente");
  const sexoNorm = obterSexoNormalizado(sexoPaciente);
  const todasAsRegioes = obterRegioesPorVista(vista);

  // Determinar quais regiões mostrar conforme a vista
  const regioesPrincipaisFrente = [
    "cabeca_face",
    "pescoco",
    "torax_anterior",
    "precordio",
    "abdome",
    "membros_inferiores",
  ];
  const regioesPrincipaisCostas = [
    "cabeca_face_posterior",
    "pescoco_posterior",
    "torax_posterior",
    "lombar",
    "membros_inferiores_posteriores",
  ];

  const regioesPrincipais = vista === "frente" ? regioesPrincipaisFrente : regioesPrincipaisCostas;
  const regioes = todasAsRegioes.filter((r) => regioesPrincipais.includes(r.id));

  // Mapear regiões por ID para busca rápida
  const regiaoMap = new Map(regioes.map((r) => [r.id, r]));

  // Selecionar SVG config conforme sexo e vista
  const regioesSvgAtivas =
    regioesSvgPorSexo[sexoNorm][vista as "frente" | "costas"];

  // Escolher imagem conforme sexo e vista
  const imagemAtual =
    sexoNorm === "feminino"
      ? vista === "frente"
        ? "/images/boneco/boneco-feminino-frente.png"
        : "/images/boneco/boneco-feminino-costas.png"
      : vista === "frente"
        ? "/images/boneco/boneco-frente.png"
        : "/images/boneco/boneco-costas.png";

  const altText =
    sexoNorm === "feminino"
      ? vista === "frente"
        ? "Boneco virtual feminino - vista frontal"
        : "Boneco virtual feminino - vista posterior"
      : vista === "frente"
        ? "Boneco virtual masculino - vista frontal"
        : "Boneco virtual masculino - vista posterior";

  const handleSvgAreaClick = (regiaoId: string) => {
    const regiao = regiaoMap.get(regiaoId);
    if (regiao) {
      onRegiaoSelecionada(regiao);
    }
  };

  const handleSvgAreaKeyDown = (e: React.KeyboardEvent, regiaoId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSvgAreaClick(regiaoId);
    }
  };

  const renderSvgArea = (config: SvgRegiaoConfig) => {
    const isActive = regiaoAtiva === config.regiaoId;

    const baseClasses = "cursor-pointer transition-all";
    const fillClass = isActive ? "fill-blue-500/20" : "fill-transparent";
    const strokeClass = isActive ? "stroke-blue-600 stroke-2" : "stroke-transparent";
    const hoverClasses = !isActive
      ? "hover:fill-blue-500/10 hover:stroke-blue-400 hover:stroke-1"
      : "";

    const commonProps = {
      role: "button" as const,
      tabIndex: 0,
      "aria-label": config.nome,
      onClick: () => handleSvgAreaClick(config.regiaoId),
      onKeyDown: (e: React.KeyboardEvent) => handleSvgAreaKeyDown(e, config.regiaoId),
      className: `${baseClasses} ${fillClass} ${strokeClass} ${hoverClasses}`,
    };

    if (config.tipo === "ellipse" && config.attrs) {
      return (
        <ellipse
          key={config.regiaoId}
          {...(commonProps as any)}
          cx={config.attrs.cx as number}
          cy={config.attrs.cy as number}
          rx={config.attrs.rx as number}
          ry={config.attrs.ry as number}
        />
      );
    }

    if (config.tipo === "rect" && config.attrs) {
      return (
        <rect
          key={config.regiaoId}
          {...(commonProps as any)}
          x={config.attrs.x as number}
          y={config.attrs.y as number}
          width={config.attrs.width as number}
          height={config.attrs.height as number}
          rx={config.attrs.rx as number}
        />
      );
    }

    if (config.tipo === "path" && config.pathD) {
      return (
        <path
          key={config.regiaoId}
          {...(commonProps as any)}
          d={config.pathD}
        />
      );
    }

    return null;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 space-y-4">
      {/* Header com Botões Frente/Costas */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Paciente Virtual</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setVista("frente")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              vista === "frente"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Frente
          </button>
          <button
            onClick={() => setVista("costas")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              vista === "costas"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Costas
          </button>
        </div>
      </div>

      {/* Boneco Container com SVG Overlay */}
      <div className="relative w-full max-w-lg mx-auto">
        {/* Imagem do Boneco */}
        <img
          src={imagemAtual}
          alt={altText}
          className="block w-full h-auto object-contain"
        />

        {/* SVG Overlay com Áreas Clicáveis */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={SVG_VIEWBOX}
          preserveAspectRatio="xMidYMid meet"
        >
          {regioesSvgAtivas.map((config) => renderSvgArea(config))}
        </svg>
      </div>

      {/* Região selecionada - informativo */}
      {regiaoAtiva && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm font-semibold text-blue-900">Região selecionada:</p>
          <p className="text-lg font-bold text-blue-700">{regiaoMap.get(regiaoAtiva)?.nome}</p>
        </div>
      )}
    </div>
  );
}
