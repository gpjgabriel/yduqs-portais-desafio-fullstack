# YDUQS PORTAIS

🚀 Desafio Fullstack – Teste Técnico: Portal de Matrículas

Esta é a solução completa para o Desafio Fullstack, implementando uma aplicação onde usuários possam visualizar ofertas de cursos e realizar matrículas.

## Status do Projeto

- **Front-end: Implementação Prática**
  - [x] Tela de Ofertas de curso (Presencial e Digital)
  - [x] Modal Sidebar contendo os planos de pagamento (Presencial) ou não (Digital)
  - [x] Tela com formulário de inscrição com validação dos campos (email, cpf, etc)
  - [x] Tela de feedback positivo para incrição bem sucedida
  - [x] Design Responsivo
  - [x] Feedback ao usuário (loading, erros, sucesso)
  - [x] Testes (Unitários e Integração)

---

## 🛠️ Stack Técnica

A stack deste projeto foi escolhida para atender aos requisitos obrigatórios e promover uma experiência de desenvolvimento moderna e unificada. O projeto está estruturado em um monorepo contendo dois projetos principais:

- **Front-end: Next.Js + Material/UI + TailWind CSS**

  - **Linguagem:** [Typescript](https://www.typescriptlang.org/)
  - **Freamwork Web:** [Next.js](https://nextjs.org/)
  - **UI/UX CSS:** [Tailwind](https://tailwindcss.com/)
  - **UI/UX Componentes:** [Material UI](https://mui.com/)
  - **Testes:** [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/)

---

## 🛠️ Instruções de Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente.

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) - Docker Compose e DB PostgreSQL
- [Npm](https://www.npmjs.com/) Gerenciador de pacotes (npm ou yarn)

### 2. Clonar o Repositório

```bash
git clone [https://github.com/gpjgabriel/yduqs-portais-desafio-fullstack](https://github.com/gpjgabriel/yduqs-portais-desafio-fullstack)
cd yduqs-portais-desafio-fullstack
```

### 3. Iniciar o Banco de Dados (Docker)

O docker-compose.yml na raiz do projeto subirá uma instância do PostgreSQL.

```bash
cd back-end
docker-compose up -d
```

Isso iniciará um container PostgreSQL na porta 5432.

### 4. Instalar Dependências e Executar o Back-end

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

Crie um arquivo .env na raiz de /back-end com base no .env.example

```bash
touch .env
cp .env.example .env
```

Aplique as migrações do Prisma e popule o banco (seed):

```bash
npx prisma migrate dev
npx prisma db seed
```

Inicie o servidor do back-end:

```bash
npm run start:dev
```

- A API estará disponível em [http://localhost:3000](http://localhost:3000)

### 5. Instalar Dependências e Executar o Front-end

Em um novo terminal, navegue até a pasta do front-end.

```bash
cd front-end

npm install
# ou
yarn install
# ou
pnpm install
```

Crie um arquivo .env na raiz de /front-end com base no .env.example

```bash
touch .env
cp .env.example .env
```

Inicie o servidor do front-end:

```bash
npm run dev
# ou o comando abaixo para evitar conflito com a API na porta 3000
npm run dev -- -p 3001
```

- A aplicação estará disponível em [http://localhost:3001](http://localhost:3001)

Rotas principais:

- Página de Ofertas: [http://localhost:3000/](http://localhost:3000/)

- Página com formulário de inscrição: [http://localhost:3000/inscricao](http://localhost:3000/inscricao) (Necessita escolher uma oferta)

### 6. Executando os Testes 🧪

Os testes são cruciais para este projeto e podem ser executados separadamente.

## Front-end

```bash
cd front-end
npm run test
```

### 7. Estrutura do Projeto 📁

/  
├── front-end/ (Aplicação Next.js)  
│ └── src/  
│ └── app/ (Next.js App Router)  
│ │ ├── (offers)/ (Rota e página de ofertas)  
│ │ ├── (enrollment)/ (Rota e página de matrícula)  
│ └── components/ (Componentes React reutilizáveis)  
├── .gitignore  
├── docker-compose.yml (Config. do container PostgreSQL)  
└── README.md (Este arquivo)

👨‍💻 Autor

Desenvolvido por: Gabriel Paiva Justo  
📧 gpj_gabriel@hotmail.com  
💼 LinkedIn: linkedin.com/in/gabriel-paiva-justo
