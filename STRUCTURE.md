# FeirApp Backend - NestJS + Prisma + TypeScript

Estrutura modular pronta para implementação do FeirApp backend API.

## Estrutura de Pastas

```
src/
├── config/               # Configurações globais
├── modules/              # Módulos de negócio
│   ├── auth/            # Autenticação e autorização
│   ├── users/           # Gestão de usuários
│   ├── events/          # Catálogo de eventos
│   ├── subscriptions/   # Inscrições em eventos
│   ├── push/            # Push notifications
│   └── jobs/            # Cron jobs e agendamentos
├── database/            # Prisma schema, migrations e seeds
├── common/              # Decoradores, filters, interceptors
└── docker/              # Dockerfile para containerização
```

## Primeiros Passos

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar banco de dados
```bash
# Criar arquivo .env a partir do exemplo
cp .env.example .env

# Executar Prisma setup
npx prisma migrate dev --name init
```

### 3. Popular banco com dados de teste
```bash
npx prisma db seed
```

### 4. Rodar em desenvolvimento
```bash
npm run start:dev
```

O servidor estará disponível em `http://localhost:3000`

## Desenvolvimento com Docker Compose

```bash
docker-compose up --build
```

Isso vai subir PostgreSQL + NestJS automaticamente.

## Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Integrar Prisma ORM
- [ ] Criar rota de health check
- [ ] Implementar validações com class-validator
- [ ] Configurar Swagger/OpenAPI
- [ ] Implementar cron jobs com @nestjs/schedule
- [ ] Integrar Firebase Cloud Messaging (FCM)
- [ ] Adicionar testes unitários e de integração
