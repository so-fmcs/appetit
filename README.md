# Appetit · Bistrô francês

Site de um bistrô francês fictício, com cardápio online e pedidos. Projeto acadêmico da disciplina de Desenvolvimento Web, desenvolvido em grupo pela organização **fmcs**.

**Site no ar:** - Em andamento

---

## Sobre o projeto

O Appetit é um restaurante francês de clima rústico e aconchegante, no estilo dos bistrôs da Provence. O cliente acessa o site pelo celular ou pelo computador, conhece a casa, navega pelo cardápio e monta o pedido.

A identidade visual usa detalhes de bistrô em vez de símbolos óbvios: o toldo listrado da fachada, uma janela francesa com jardineira e expressões em francês nos títulos ("Bon appétit", "La carte").

## Páginas

| Página | O que tem | Status |
| --- | --- | --- |
| **Home** | Hero com janela francesa, carrossel "Pratos da casa" com pratos da API, seção "Nossa história" e rodapé | ✅ Pronta |
| **Pratos** | Cardápio completo, busca, filtro por categoria e modal com detalhes do prato | 🚧 Em desenvolvimento |
| **Pedidos** | Itens escolhidos e formulário de pedido com validação | 🚧 Em desenvolvimento |

## Tecnologias

| Ferramenta | Uso |
| --- | --- |
| [React](https://react.dev) | Interface em componentes |
| [Vite](https://vite.dev) | Criação do projeto e servidor de desenvolvimento |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilização com classes utilitárias |
| [React Router](https://reactrouter.com) | Navegação entre páginas sem recarregar |
| [Lucide](https://lucide.dev) | Ícones |
| [TheMealDB](https://www.themealdb.com/api.php) | API pública com os pratos franceses |
| [Vercel](https://vercel.com) | Publicação do site |

## Requisitos do trabalho

| Requisito | Como o projeto atende |
| --- | --- |
| 3 telas responsivas | Home, Pratos e Pedidos, com layout para celular e computador |
| 2 componentes reutilizáveis | `CardPrato` (Home e Pratos) e componentes de interface compartilhados |
| 3 interações | Menu mobile, pausa do carrossel, busca e filtro de pratos, modal de detalhes |
| Formulário com 5+ campos validados | Formulário da página Pedidos |
| 3 operações HTTP | `GET` real na TheMealDB; `POST` (enviar pedido) e `DELETE` (remover item) simulados |
| WCAG AA e Lighthouse acima de 90 | Home com **100** de acessibilidade no Lighthouse, no desktop e no mobile |
| Versionamento em grupo | Branches, commits semânticos e Pull Requests no GitHub |
| Publicação | Vercel |

## Identidade visual

![Paleta de cores do Appetit](docs/paleta-cores.png)

| Cor | Hex | Uso |
| --- | --- | --- |
| Terracota | `#C25A3F` | Destaques: ponto do logo, link ativo, toldo |
| Bege Areia | `#D9C5B2` | Texto sobre o marrom (header e rodapé) |
| Bege Fendi | `#A39686` | Apoio |
| Verde Oliva | `#606C38` | Rótulos das seções |
| Madeira | `#8B5A2B` | Moldura da janela, hover dos botões |
| Marrom Escuro | `#4A3728` | Header, rodapé e texto principal |
| Creme | `#F4EDE4` | Fundo da página |

**Fontes:** [Oswald](https://fonts.google.com/specimen/Oswald) nos títulos e [DM Sans](https://fonts.google.com/specimen/DM+Sans) nos textos.

## Acessibilidade

- Contraste de cores conferido segundo a WCAG AA (4,5:1 para texto normal, 3:1 para texto grande)
- HTML semântico (`header`, `nav`, `main`, `section`, `footer`) e um único `h1` por página
- Navegação completa pelo teclado, com foco visível
- Textos alternativos nas imagens e `aria-hidden` nos elementos decorativos
- Animações desligadas no celular e para quem ativou "reduzir movimento" no sistema
- Botão para pausar o carrossel animado

## Como rodar o projeto

Pré-requisitos: [Node.js](https://nodejs.org) e Git instalados.

```bash
# 1. Clonar o repositório
git clone https://github.com/so-fmcs/appetit.git
cd appetit

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

O site abre em `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura de pastas

```
appetit/
├── public/              # imagens e favicon
├── index.html           # título da página, fontes e idioma
├── vite.config.js       # plugins do React e do Tailwind
└── src/
    ├── main.jsx         # ponto de entrada
    ├── App.jsx          # header e rotas das páginas
    ├── index.css        # Tailwind, cores, fontes e classes próprias
    ├── pages/           # telas inteiras (Home, Pratos, Pedidos)
    └── components/      # peças reutilizáveis (Header, Hero, CardPrato...)
```

## API

Os pratos vêm da [TheMealDB](https://www.themealdb.com/api.php), uma API pública e gratuita:

| Endpoint | Uso |
| --- | --- |
| `filter.php?a=France` | Lista dos pratos franceses (28 pratos) |
| `lookup.php?i={id}` | Detalhes e ingredientes de um prato |
| `filter.php?c={categoria}` | Pratos de uma categoria |

A API não tem avaliações nem preços. Esses dados, e o envio e a remoção de itens do pedido, são simulados no próprio código.

## Como contribuir (fluxo do grupo)

1. Atualizar a `main`: `git switch main` e `git pull`
2. Criar uma branch para a sua parte: `git switch -c feature/nome-da-parte`
3. Commitar em pedaços pequenos, com [commits semânticos](https://www.conventionalcommits.org) em inglês: `feat:`, `fix:`, `style:`, `chore:`, `refactor:`, `docs:`
4. Enviar a branch: `git push -u origin feature/nome-da-parte`
5. Abrir um Pull Request para a `main` e pedir a revisão de alguém do grupo

## Equipe

| Nome | GitHub |
| --- | --- |
| Ryan Alves | [@s3vla](https://github.com/s3vla) |
| Alexandre Wayss | [@alexandre-wayss](https://github.com/alexandre-wayss) |

## Créditos

- Dados dos pratos: [TheMealDB](https://www.themealdb.com)
- Fotos: [Unsplash](https://unsplash.com) e [Pexels](https://www.pexels.com)
- Ícones: [Lucide](https://lucide.dev)

Projeto acadêmico, sem fins comerciais. O restaurante, o endereço e as avaliações são fictícios.
