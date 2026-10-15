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
| **Pratos** | Cardápio do backend, busca, filtro por categoria e modal com detalhes do prato | 🚧 Em desenvolvimento |
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
| Spring Boot e SQLite | API do cardápio e armazenamento de pratos e pedidos |
| [Vercel](https://vercel.com) | Publicação do site |

## Requisitos do trabalho

| Requisito | Como o projeto atende |
| --- | --- |
| 3 telas responsivas | Home, Pratos e Pedidos, com layout para celular e computador |
| 2 componentes reutilizáveis | `CardPrato` (Home e Pratos) e componentes de interface compartilhados |
| 3 interações | Menu mobile, pausa do carrossel, busca e filtro de pratos, modal de detalhes |
| Formulário com 5+ campos validados | Formulário da página Pedidos |
| 3 operações HTTP | `GET` real no backend e na TheMealDB; `POST` (enviar pedido) e `DELETE` (remover item) simulados |
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

# 3. Rodar o backend em outro terminal (cria backend/appetit.db)
cd backend
mvn spring-boot:run

# 4. Rodar o frontend em outro terminal, a partir da raiz do projeto
cd ..
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

O cardápio e os preços vêm do SQLite pelo backend. O Vite encaminha `/api` para `http://localhost:8080` durante o desenvolvimento:

| Endpoint | Uso |
| --- | --- |
| `GET /api/pratos` | Lista os pratos disponíveis, incluindo `precoCentavos` |
| `GET /api/pratos/{id}` | Consulta um prato disponível |
| `POST /api/pedidos` | Valida e salva o pedido com os preços atuais do SQLite; retorna `{ "id": "..." }` |
| `GET /api/pedidos/{id}` | Consulta status, dados, itens e valores do pedido salvo |
| `PATCH /api/pedidos/{id}/status` | Atualiza o status de um pedido; recebe `{ "status": "EM_PREPARO" }` e devolve o ID e o status |

Os 28 pratos iniciais estão em `backend/src/main/resources/data.sql`. Para alterar um preço depois da primeira inicialização, edite o registro no banco; a carga inicial não sobrescreve registros existentes.

A [TheMealDB](https://www.themealdb.com/api.php) continua sendo usada para textos das receitas no cardápio:

| Endpoint | Uso |
| --- | --- |
| `lookup.php?i={id}` | Detalhes e ingredientes de um prato |

A TheMealDB não fornece preços. O checkout envia IDs e quantidades; o backend consulta os pratos, salva o nome e o preço unitário de cada item e devolve o ID do pedido. O frontend continua simulando o envio enquanto `VITE_API_URL` estiver vazio. Para usar o backend local, configure `VITE_API_URL=/api` em `.env.local`.

Os status aceitos no PATCH são `CONFIRMADO`, `EM_PREPARO`, `PRONTO_PARA_RETIRADA`, `SAIU_PARA_ENTREGA`, `CONCLUIDO` e `CANCELADO`. `PRONTO_PARA_RETIRADA` vale apenas para retirada; `SAIU_PARA_ENTREGA`, apenas para entrega. A tela de detalhes consulta o GET ao abrir e a cada 10 segundos enquanto estiver visível, mostrando o status e os valores salvos no servidor.

Para a demonstração, o backend avança automaticamente uma etapa a cada 20 segundos (`CONFIRMADO` → `EM_PREPARO` → saída para entrega ou retirada → `CONCLUIDO`). O agendador verifica os pedidos a cada 5 segundos. O PATCH continua disponível para alterar o status manualmente e reinicia o tempo da etapa. Essas opções estão em `backend/src/main/resources/application.properties` e podem ser desativadas com `appetit.status-automatico.habilitado=false`.

## Como contribuir (fluxo do grupo)

1. Atualizar a `main`: `git switch main` e `git pull`
2. Criar uma branch para a sua parte: `git switch -c feature/nome-da-parte`
3. Commitar em pedaços pequenos, com [commits semânticos](https://www.conventionalcommits.org) em inglês: `feat:`, `fix:`, `style:`, `chore:`, `refactor:`, `docs:`
4. Enviar a branch: `git push -u origin feature/nome-da-parte`
5. Abrir um Pull Request para a `main` e pedir a revisão de alguém do grupo

## Equipe

| Nome            | GitHub                                      |
|-----------------|---------------------------------------------|
| Ryan Alves      | [@s3vla](https://github.com/s3vla)          |
| Alexandre Wayss | [@alexandre-wayss](https://github.com/alexandre-wayss) |
| Valter Glitz    | [@Darkalli](https://github.com/Darkalli)        |

## Créditos

- Dados dos pratos: [TheMealDB](https://www.themealdb.com)
- Fotos: [Unsplash](https://unsplash.com) e [Pexels](https://www.pexels.com)
- Ícones: [Lucide](https://lucide.dev)

Projeto acadêmico, sem fins comerciais. O restaurante, o endereço e as avaliações são fictícios.
