# Feirapp Backend

Backend da plataforma Feirapp, desenvolvido com NestJS, Prisma e PostgreSQL. O sistema gerencia eventos, inscrições de usuários, notificações e autenticação.

## Tabela de Conteúdos

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Segurança](#segurança)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Rodando a Aplicação](#rodando-a-aplicação)
  - [Com Docker (Recomendado)](#com-docker-recomendado)
  - [Localmente](#localmente)
- [Banco de Dados](#banco-de-dados)
- [Testes](#testes)
- [Scripts Disponíveis](#scripts-disponíveis)

## Funcionalidades

- **Autenticação de Usuários**: Sistema completo de registro e login com JWT (JSON Web Tokens).
- **Gerenciamento de Usuários**: Criação e atualização de dados de usuários.
- **Gerenciamento de Eventos**: Criação, listagem e detalhes de eventos.
- **Inscrições**: Usuários podem se inscrever e cancelar a inscrição em eventos.
- **Notificações Push**: Estrutura para envio de notificações para diferentes plataformas (Web, Android, iOS).
- **Jobs Agendados**: Sistema de Jobs para tarefas em segundo plano (ex: lembretes de eventos).
- **Blacklist de Tokens**: Invalidação de tokens JWT para logout seguro.

## Tecnologias Utilizadas

- **Backend**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Containerização**: [Docker](https://www.docker.com/)
- **Autenticação**: [Passport.js](http://www.passportjs.org/) (Estratégias JWT)
- **Validação**: [class-validator](https://github.com/typestack/class-validator), [class-transformer](https://github.com/typestack/class-transformer)
- **Documentação da API**: [Swagger](https://swagger.io/)

## Estrutura do Projeto

A estrutura de diretórios segue as convenções do NestJS, promovendo modularidade e organização.

```
/
├── prisma/             # Schema e migrações do banco de dados (Prisma)
├── src/
│   ├── common/         # Módulos e utilitários compartilhados (decorators, filters)
│   ├── config/         # Configuração da aplicação (env, jwt)
│   ├── modules/        # Módulos de negócio da aplicação
│   │   ├── auth/
│   │   ├── users/
│   │   └── ...
│   ├── main.ts         # Arquivo de entrada da aplicação
│   └── app.module.ts   # Módulo raiz da aplicação
├── test/               # Testes de ponta-a-ponta (e2e)
├── .env.example        # Arquivo de exemplo para variáveis de ambiente
├── docker-compose.yml  # Orquestração dos containers (app e db)
└── package.json        # Dependências e scripts
```

## Segurança

A aplicação implementa várias medidas de segurança para proteger os dados e as APIs.

- **Hashing de Senhas**: As senhas dos usuários são armazenadas de forma segura usando o `bcrypt` para gerar um hash irreversível.
- **Autenticação com JWT**: O acesso a rotas protegidas é controlado por JSON Web Tokens (JWT), implementado com `@nestjs/jwt` e Passport.js.
- **Validação de Dados de Entrada**: Todos os dados recebidos nas requisições (DTOs) são validados usando `class-validator` para prevenir ataques de injeção e garantir a integridade dos dados.
- **Proteção de Headers HTTP**: O middleware `helmet` é utilizado para adicionar headers de segurança importantes, protegendo contra vulnerabilidades conhecidas da web como Cross-Site Scripting (XSS) e clickjacking.
- **Controle de Acesso (Rate Limiting)**: O módulo `@nestjs/throttler` é usado para limitar o número de requisições a um endpoint, ajudando a prevenir ataques de força bruta.
- **Blacklist de Tokens**: Para um processo de logout seguro, os tokens JWT podem ser invalidados ao serem adicionados a uma blacklist, impedindo seu uso futuro.
- **Variáveis de Ambiente**: Dados sensíveis como segredos de JWT e credenciais de banco de dados são gerenciados através de variáveis de ambiente e não são expostos no código-fonte.

## Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v20 ou superior)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) (para o método recomendado)

## Configuração do Ambiente

Antes de iniciar o projeto, você precisa configurar as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto, copiando o exemplo do `docker-compose.yml` ou usando o modelo abaixo:

```env
# Configurações da Aplicação
NODE_ENV=development
PORT=3000

# URL do Banco de Dados (Prisma)
# Formato: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="postgresql://postgres:password@localhost:5432/feirapp_db?schema=public"

# Configurações do JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRATION="24h"
```

**Nota**: Se estiver usando Docker, o `HOST` do banco de dados deve ser o nome do serviço (`postgres`), como já está configurado no `docker-compose.yml`. Se for rodar localmente, use `localhost`.

## Rodando a Aplicação

### Com Docker (Recomendado)

Este é o método mais simples e rápido para subir todo o ambiente, incluindo o banco de dados.

```bash
# 1. Construa e suba os containers em background
docker-compose up --build -d

# 2. Acompanhe os logs do backend (opcional)
docker-compose logs -f backend

# A aplicação estará disponível em http://localhost:3000
```

### Localmente

Se preferir não usar Docker, você precisará de uma instância do PostgreSQL rodando e acessível.

```bash
# 1. Instale as dependências
npm install

# 2. Aplique as migrações do banco de dados (veja a seção Banco de Dados)
npx prisma migrate dev

# 3. Inicie a aplicação em modo de desenvolvimento
npm run start:dev

# A aplicação estará disponível em http://localhost:3000
```

## Banco de Dados

O projeto utiliza o Prisma para gerenciar o schema e as migrações do banco de dados.

- O schema do banco de dados está definido em `prisma/schema.prisma`.
- As migrações são gerenciadas pela CLI do Prisma.

**Para criar e aplicar uma nova migração:**

```bash
# 1. Gere uma nova migração baseada nas alterações do schema.prisma
npx prisma migrate dev --name "nome-da-sua-migration"

# O Prisma aplicará a migração automaticamente no ambiente de desenvolvimento.
```

## Testes

Para rodar os testes da aplicação:

```bash
# Rodar todos os testes unitários
npm run test

# Rodar os testes de ponta-a-ponta (e2e)
npm run test:e2e

# Ver a cobertura de testes
npm run test:cov
```

## Scripts Disponíveis

- `npm run build`: Compila o projeto TypeScript para JavaScript.
- `npm run format`: Formata o código com o Prettier.
- `npm run lint`: Analisa o código em busca de erros de estilo com o ESLint.
- `npm start`: Inicia a aplicação em modo de produção (requer compilação prévia).
- `npm run start:dev`: Inicia a aplicação em modo de desenvolvimento com hot-reload.
- `npm run start:prod`: Inicia a aplicação em modo de produção a partir da compilação na pasta `dist`.
