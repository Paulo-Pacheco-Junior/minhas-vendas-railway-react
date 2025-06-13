# Minhas Vendas 🚀

## Descrição 📋

**Minhas Vendas** é um sistema web para gerenciar vendas, focado no controle de status das vendas, filtragem por vários critérios e gerenciamento de usuários com diferentes perfis (como agentes e supervisores). O projeto é feito com React, utilizando styled-components para estilos, react-hook-form e yup para validação, axios para comunicação com a API, e react-router-dom para roteamento.

---

## Funcionalidades ✨

- Cadastro e login de usuários com validação dos dados.
- Controle de permissões baseado no papel do usuário (ex: supervisor).
- Cadastro, edição e visualização de vendas.
- Diferenciação automática entre cliente pessoa física (CPF) e jurídica (CNPJ) na venda.
- Filtros dinâmicos para visualizar vendas por mês, dia, status, cliente, e agente responsável.
- Resumo estatístico das vendas (quantidade por status e total).
- Armazenamento do token JWT no localStorage e configuração automática do axios para autenticação.
- Gerenciamento dinâmico dos IDs dos funcionários (BC).
- Responsividade e temas aplicados via styled-components.

---

## Tecnologias utilizadas 🔧

- React
- TypeScript
- react-router-dom
- react-hook-form
- yup (validação)
- axios (chamadas HTTP)
- styled-components
- Context API (para gerenciamento do usuário)
- API REST (endpoint hospedado em Railway)

---

## Estrutura de pastas 📁

```
src/
├── components/ # Componentes reutilizáveis (Button, Input, LinkBtn, etc)
├── contexts/ # Contexto do usuário
├── pages/ # Páginas (SignIn, SignUp, Home, NewSale, EditSale)
├── routes/ # Configuração das rotas da aplicação
├── services/ # Configuração do axios
├── styles/ # Estilos globais e estilizações específicas
├── themes/ # Configuração do tema para styled-components
└── App.tsx # Componente raiz com Providers e roteamento
```

---

## Como rodar o projeto 🏃‍♂️

1. Clone o repositório:

```bash
git clone https://github.com/Paulo-Pacheco-Junior/minhas-vendas-railway-react.git
cd minhas-vendas-railway-react

```
2. Instale as dependências:
   
```bash
npm install
# ou
yarn
```
3. Inicie a aplicação:

```bash
npm run dev
# ou
yarn dev
```

---

## Detalhes importantes ⚠️

- Armazenamento do token JWT e dados do usuário no localStorage para manter a sessão.
- Configuração automática do axios para enviar o token JWT em todas as requisições, evitando acessos não autorizados e garantindo autenticação segura.
- Os formulários utilizam validação robusta com yup integrada via react-hook-form.
- Usuários com papel "supervisor" têm acesso a filtros exclusivos para visualizar vendas por agentes.
- Estilos são aplicados usando styled-components com tema customizável.







