"use client";

import { useState, useRef, useEffect } from "react";
import { MensagemChat } from "@/lib/types";

interface ChatPacienteProps {
  nomePaciente: string;
  casoId: string;
  onMensagensChange?: (mensagens: MensagemChat[]) => void;
}

type SpeechRecognitionType = any;

export default function ChatPaciente({
  nomePaciente,
  casoId,
  onMensagensChange,
}: ChatPacienteProps) {
  const [mensagens, setMensagens] = useState<MensagemChat[]>([
    {
      id: "1",
      tipo: "paciente",
      conteudo: `Oi doutor/doutora, tudo bem? Meu nome é ${nomePaciente}, tô aqui porque não tô me sentindo bem.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [ouvindo, setOuvindo] = useState(false);
  const [erroVoz, setErroVoz] = useState("");
  const [suportaVoz, setSuportaVoz] = useState(true);
  const [isSafari, setIsSafari] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  // Inicializar: detectar Safari e validar suporte a Web Speech API
  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(detectSafari);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSuportaVoz(false);
    }

    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  // Notificar mudanças de mensagens
  useEffect(() => {
    onMensagensChange?.(mensagens);
  }, [mensagens, onMensagensChange]);

  // Auto-scroll para a última mensagem (apenas dentro do container do chat)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [mensagens, carregando]);

  const iniciarTranscricao = () => {
    if (ouvindo) {
      recognitionRef.current?.stop();
      setOuvindo(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErroVoz(
        "Seu navegador não oferece suporte à transcrição por voz. Tente usar o Google Chrome ou digite sua pergunta."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("SpeechRecognition iniciou");
      setOuvindo(true);
      setErroVoz("");
    };

    recognition.onresult = (event: any) => {
      let transcriptFinal = "";
      let transcriptParcial = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          transcriptFinal += transcript;
        } else {
          transcriptParcial += transcript;
        }
      }

      const textoReconhecido = (transcriptFinal || transcriptParcial).trim();
      console.log("Resultado de voz:", textoReconhecido);

      if (textoReconhecido) {
        setInput(textoReconhecido);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Erro SpeechRecognition:", event.error);
      const mensagens: Record<string, string> = {
        "not-allowed":
          "Permissão do microfone negada. Libere o microfone nas configurações do navegador.",
        "no-speech":
          "Nenhuma fala foi detectada. Tente novamente falando mais próximo ao microfone.",
        "audio-capture": "Não foi possível acessar o microfone.",
        "network":
          "Erro de rede no reconhecimento de voz. Tente novamente ou use digitação.",
      };
      setErroVoz(
        mensagens[event.error] ??
          "Não foi possível transcrever a fala. Tente novamente ou use digitação."
      );
      setOuvindo(false);
    };

    recognition.onend = () => {
      console.log("SpeechRecognition terminou");
      setOuvindo(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error("Falha ao iniciar recognition:", error);
      setErroVoz("Erro ao iniciar microfone. Recarregue a página.");
    }
  };

  const enviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const mensagemEstudante = input.trim();

    // Adicionar mensagem do estudante
    const novaMensagemEstudante: MensagemChat = {
      id: Date.now().toString(),
      tipo: "estudante",
      conteudo: mensagemEstudante,
      timestamp: new Date(),
    };

    setMensagens((prev) => [...prev, novaMensagemEstudante]);
    setInput("");
    setCarregando(true);

    try {
      // Preparar histórico para o backend
      const historico = mensagens.map((msg) => ({
        tipo: msg.tipo as "estudante" | "paciente",
        conteudo: msg.conteudo,
      }));

      // Chamar API
      const response = await fetch("/api/chat-paciente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          casoId,
          mensagem: mensagemEstudante,
          historico,
        }),
      });

      const data = await response.json();
      const resposta = data.resposta || "Desculpe, não consegui processar sua pergunta.";

      const novaMensagemPaciente: MensagemChat = {
        id: (Date.now() + 1).toString(),
        tipo: "paciente",
        conteudo: resposta,
        timestamp: new Date(),
      };

      setMensagens((prev) => [...prev, novaMensagemPaciente]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const mensagemErro: MensagemChat = {
        id: (Date.now() + 1).toString(),
        tipo: "paciente",
        conteudo: "Desculpe, estou tendo dificuldades para responder no momento. Tente novamente.",
        timestamp: new Date(),
      };
      setMensagens((prev) => [...prev, mensagemErro]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 className="font-bold">Chat com o Paciente</h3>
        <p className="text-sm text-blue-100">{nomePaciente}</p>
      </div>

      {/* Mensagens */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.tipo === "estudante" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs sm:max-w-sm px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                msg.tipo === "estudante"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.conteudo}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {msg.timestamp.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        {carregando && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
              <p className="text-sm text-gray-500">
                Paciente está digitando...
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={enviarMensagem}
        className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta ao paciente..."
            disabled={carregando}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-900 placeholder-gray-500"
          />

          {suportaVoz && (
            <button
              type="button"
              onClick={iniciarTranscricao}
              disabled={carregando}
              title={ouvindo ? "Ouvindo... Clique para parar" : "Clique para falar"}
              className={`py-2 px-4 rounded-lg font-semibold transition-all ${
                ouvindo
                  ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                  : "bg-gray-400 hover:bg-gray-500 text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              🎙️
            </button>
          )}

          <button
            type="submit"
            disabled={carregando || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Enviar
          </button>
        </div>

        {erroVoz && (
          <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-sm text-red-700">
            ⚠️ {erroVoz}
          </div>
        )}

        {ouvindo && (
          <div className="mt-2 p-2 bg-blue-100 border border-blue-300 rounded text-sm text-blue-700 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Ouvindo... Fale sua pergunta agora.
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          {suportaVoz
            ? "💡 Dica: Você pode digitar ou usar o microfone 🎙️ para transcrever sua pergunta"
            : "💡 Dica: Pergunte sobre sintomas, histórico e solicite sinais vitais"}
        </p>

        {suportaVoz && isSafari && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 mt-2">
            ⚠️ O Safari pode não retornar transcrição neste ambiente. Para usar voz, teste no Google Chrome. A digitação continua disponível.
          </p>
        )}
      </form>
    </div>
  );
}
