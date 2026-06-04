# Boneco Virtual — Imagens

## Estrutura

Este diretório contém as imagens do boneco virtual para o módulo de Exame Físico Interativo.

### boneco-frente.png
- **Resolução recomendada**: 1200x1600px ou similar
- **Formato**: PNG com fundo transparente (recomendado)
- **Tamanho máximo**: 500KB
- **Conteúdo**: Boneco/ilustração médica com vista frontal
- **Uso**: Exibido no componente BonecoVirtual.tsx como imagem responsiva

## Como Adicionar a Imagem

1. **Obter a imagem aprovada** de alta qualidade
2. **Otimizar para web** (reduzir tamanho sem perder qualidade)
3. **Copiar para este diretório**:
   ```bash
   cp [caminho/da/imagem] public/images/boneco/boneco-frente.png
   ```
4. **Testar no navegador**: Abrir http://localhost:3000/caso/[id] e ir para "Exame Físico"
5. **Verificar responsividade**: Testar em mobile e desktop

## Hotspots (Regiões Clicáveis)

Os hotspots estão configurados em `components/BonecoVirtual.tsx` com as seguintes regiões:

- Cabeça e Face
- Olhos/Conjuntivas
- Boca/Orofaringe
- Pescoço
- Tórax Anterior
- Precórdio
- Abdome
- Mãos e Dedos
- Membros Inferiores

Caso a imagem real tenha proporções diferentes, ajustar os percentuais em `hotspots` no componente.

## Imagens Futuras

- **boneco-costas.png**: Vista posterior (ainda em desenvolvimento)

## Notas

- A imagem é exibida com `object-fit: contain` para manter proporcionalidade
- Hotspots são botões transparentes sobrepostos sobre a imagem
- Não adicionar textos ou contornos sobre a imagem — ela já tem marcações visuais
- A imagem é responsiva e se adapta ao tamanho da tela
