# YDUQS PORTAIS

🚀 Desafio Fullstack – Teste Técnico: Portal de Matrículas

Esta é a solução completa para o Desafio Fullstack, implementando uma aplicação onde usuários possam visualizar ofertas de cursos e realizar matrículas.

## Status do Projeto

- **Back-end: Implementação Prática**

  - [x] Estrutura do Banco de Dados em Container
  - [x] Estrutura em camadas (controllers, services, repositories)
  - [x] Rota de Ofertas de Curso
  - [x] Rota com Planos de Pagamento
  - [x] Rota de Inscrições
  - [x] Validações de entrada (email válido, campos obrigatórios, etc)
  - [x] Documentação da API
  - [x] Testes (Unitários e Integração)

---

## 🛠️ Stack Técnica

A stack deste projeto foi escolhida para atender aos requisitos obrigatórios e promover uma experiência de desenvolvimento moderna e unificada.

- **Back-end: NestJS e Prisma**

  - **Linguagem:** [Typescript](https://www.typescriptlang.org/)
  - **API RESTful:** [NestJS](https://nestjs.com/)
  - **ORM:** [Prisma](https://www.prisma.io/)
  - **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
  - **DevOps Container:** [Docker](https://www.docker.com/)
  - **Zod:** [Zod](https://zod.dev/) (Validação de schemas)
  - **Documentação:** [Swagger ](https://swagger.io/)
  - **Testes unitários e E2E:** [Jest](https://jestjs.io/)

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

### 5. Executando os Testes 🧪

Os testes são cruciais para este projeto e podem ser executados separadamente.

## Back-end

```bash
cd back-end
```

# Rodar testes unitários

```bash
npm run test
```

# Rodar testes E2E

```bash
npm run test:e2e
```

### 6. Estrutura do Projeto 📁

/  
├── back-end/ (API NestJS)  
│ ├── prisma/ (Schema, migrações e seed do banco)  
│ └── src/ (Código-fonte da API)  
│ ├── course-offers/ (Módulo de Ofertas de Cursos)  
│ └── enrollments/ (Módulo de Matrículas)  
├── .gitignore  
├── docker-compose.yml (Config. do container PostgreSQL)  
└── README.md (Este arquivo)

👨‍💻 Autor

Desenvolvido por: Gabriel Paiva Justo  
📧 gpj_gabriel@hotmail.com  
💼 LinkedIn: linkedin.com/in/gabriel-paiva-justo
