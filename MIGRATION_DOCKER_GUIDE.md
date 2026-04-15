# 📚 Guia Completo: Migrations Knex até Docker

# 🛠️ O que é uma Migration?
```
Imagine que estamos construindo uma fazenda inteligente.
- Antes de comprar as sementes ou os bois, você precisa de um projeto de engenharia 📝 que diga: "aqui será o curral", "ali será a plantação de milho".
- A Migration é esse projeto escrito em código. Ela descreve para o computador como o banco de dados deve ser estruturado.
- A vantagem? Se você mudar de computador ou trabalhar com outra pessoa, basta rodar a migration e o banco de dados "nasce" exatamente igual no outro lugar.
```

# 💻 Passo 1: Instalando o "Tradutor" (Knex)

Para conversar com o banco de dados sem precisar aprender uma linguagem complexa agora, usamos o Knex. Ele traduz nosso código JavaScript para a linguagem do banco.

```bash
npm install knex sqlite3
```

## Após instalar o Knex sempre execute:

```bash
npm audit
```

E Use:
```bash
npm audit fix
```

-para correções automáticas de segurança.
-Monitore essas vulnerabilidades constantemente.


## Antes de continuar criar o arquivo knexfile.js na raiz do projeto

```javascript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'staging.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'production.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  }

};

```

# 💻 Passo 2: Criando a nossa primeira "Planta"
Agora, vamos pedir para o Knex criar o arquivo onde desenharemos nossas tabelas. Digite no terminal:

```bash
npx knex migrate:make criar_tabelas_iniciais
```

Isso vai criar um arquivo dentro de uma pasta chamada migrations. Abra esse arquivo. Você verá que ele tem duas partes: exports.up (o que construir) e exports.down (como desfazer a construção).


## Visão Geral

Este documento detalha todos os passos necessários após executar `npx knex migrate:make criar_tabelas_iniciais` até ter o banco de dados funcionando com Docker.

---

## 📋 Índice

1. [Passo 1: Implementar a Migration](#passo-1-implementar-a-migration)
2. [Passo 2: Executar a Migration](#passo-2-executar-a-migration)
3. [Passo 3: Integrar Knex no Servidor](#passo-3-integrar-knex-no-servidor)
4. [Passo 4: Atualizar Rotas com Banco](#passo-4-atualizar-rotas-com-banco)
5. [Passo 5: Criar Seeds (Dados Iniciais)](#passo-5-criar-seeds-dados-iniciais)
6. [Passo 6: Configurar Docker](#passo-6-configurar-docker)
7. [Passo 7: Executar com Docker Compose](#passo-7-executar-com-docker-compose)
8. [Passo 8: Verificação Final](#passo-8-verificação-final)

---

## 🔄 Passo 1: Implementar a Migration

### O que é uma Migration?

Uma migration é um arquivo JavaScript que define como criar (up) ou desfazer (down) mudanças no banco de dados.

### Localizar o Arquivo

```bash
# Listar migrations
dir migrations/
```

Você deve ver um arquivo com nome similar a:
```
20260415142051_criar_tabelas_iniciais.js
```

### Editar o Arquivo de Migration

**Caminho:** `migrations/20260415142051_criar_tabelas_iniciais.js`

**Código completo:**

```javascript
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('startups', function(table) {
    table.increments('id').primary(); // ID auto-incremento
    table.string('nome').notNullable(); // Nome da startup
    table.string('especialidade').notNullable(); // Especialidade
    table.integer('anoAbertura').notNullable(); // Ano de abertura
    table.timestamps(true, true); // created_at, updated_at
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('startups');
}
```

### 📌 Explicação dos Campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | increments | Identificador único, auto-incrementado |
| `nome` | string | Nome da startup (obrigatório) |
| `especialidade` | string | Especialidade da startup (obrigatório) |
| `anoAbertura` | integer | Ano de criação (obrigatório) |
| `created_at` | timestamp | Data/hora de criação (automática) |
| `updated_at` | timestamp | Data/hora de atualização (automática) |

---

## ▶️ Passo 2: Executar a Migration

### Comando: Aplicar Migration

```bash
npx knex migrate:latest
```

**Saída esperada:**
```
Using environment: development
Batch 1 run: 1 migrations
```

### Verificar Status

```bash
npx knex migrate:status
```

**Saída esperada:**
```
Using environment: development
Found 1 Completed Migration file/files.
20260415142051_criar_tabelas_iniciais.js
No Pending Migration files Found.
```

### Verificar Arquivo do Banco

A migration cria um arquivo:
```
dev.sqlite3
```

Este é o banco de dados SQLite. Ele agora contém a tabela `startups`.

---

## 🔌 Passo 3: Integrar Knex no Servidor

### Instalar dependência (se não tiver)

```bash
npm install knex sqlite3
```

### Atualizar `src/server.js`

**Caminho:** `src/server.js`

**Código completo:**

```javascript
import express from 'express';
import cors from 'cors';
import knex from 'knex';
import knexConfig from '../knexfile.js';

const app = express();
const port = 3000;

// Configurar Knex com o ambiente de desenvolvimento
const db = knex(knexConfig.development);

app.use(cors());
app.use(express.json());

// Rota GET - Status do servidor
app.get('/', (req, res) => {
  res.send('🌾 AgroTech Connect: O servidor está rodando com banco de dados!');
});

// Rota GET - Buscar todas as startups
app.get('/startups', async (req, res) => {
  try {
    const startups = await db('startups').select('*');
    res.json(startups);
  } catch (error) {
    console.error('Erro ao buscar startups:', error);
    res.status(500).json({ erro: 'Erro ao buscar startups' });
  }
});

// Rota POST - Criar nova startup
app.post('/startups', async (req, res) => {
  try {
    const { nome, especialidade, anoAbertura } = req.body;

    // Validação
    if (!nome || !especialidade) {
      return res.status(400).json({ erro: 'Nome e especialidade são obrigatórios' });
    }

    const [id] = await db('startups').insert({
      nome,
      especialidade,
      anoAbertura: anoAbertura || new Date().getFullYear()
    }).returning('id');

    const novaStartup = await db('startups').where({ id }).first();
    res.status(201).json(novaStartup);
  } catch (error) {
    console.error('Erro ao criar startup:', error);
    res.status(500).json({ erro: 'Erro ao criar startup' });
  }
});

// Rota PUT - Atualizar startup
app.put('/startups/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, especialidade, anoAbertura } = req.body;

    // Validação
    if (!nome || !especialidade) {
      return res.status(400).json({ erro: 'Nome e especialidade são obrigatórios' });
    }

    const atualizado = await db('startups')
      .where({ id })
      .update({
        nome,
        especialidade,
        anoAbertura: anoAbertura || new Date().getFullYear()
      })
      .returning('*');

    if (atualizado.length > 0) {
      res.json(atualizado[0]);
    } else {
      res.status(404).json({ erro: 'Startup não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar startup:', error);
    res.status(500).json({ erro: 'Erro ao atualizar startup' });
  }
});

// Rota DELETE - Remover startup
app.delete('/startups/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletadas = await db('startups').where({ id }).del();

    if (deletadas > 0) {
      res.json({ mensagem: 'Startup deletada com sucesso' });
    } else {
      res.status(404).json({ erro: 'Startup não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar startup:', error);
    res.status(500).json({ erro: 'Erro ao deletar startup' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Banco de dados: SQLite (dev.sqlite3)`);
});
```

### Testar o Servidor

```bash
npm run dev
```

**Saída esperada:**
```
🚀 Servidor rodando em http://localhost:3000
📚 Banco de dados: SQLite (dev.sqlite3)
```

Acesse: http://localhost:3000/startups

---

## 🔄 Passo 4: Atualizar Rotas com Banco

### Testar Rotas com cURL

#### GET - Buscar todas (vazio inicialmente)
```bash
curl http://localhost:3000/startups
```

Resposta esperada:
```json
[]
```

#### POST - Criar startup
```bash
curl -X POST http://localhost:3000/startups \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "AgroFácil",
    "especialidade": "Drones",
    "anoAbertura": 2020
  }'
```
Resposta esperada:
```json
{
  "id": 1,
  "nome": "AgroFácil",
  "especialidade": "Drones",
  "anoAbertura": 2020,
  "created_at": "2026-04-15T14:30:00.000Z",
  "updated_at": "2026-04-15T14:30:00.000Z"
}
```
### Para Saber se O Curl Funicionou execute: Invoke-WebRequest -Uri "http://localhost:3000/startups" -Method GET -UseBasicParsing | Select-Object -ExpandProperty Content

#### PUT - Atualizar startup
```bash
curl -X PUT http://localhost:3000/startups/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "AgroFácil Pro",
    "especialidade": "Drones e IA",
    "anoAbertura": 2020
  }'
```

#### DELETE - Remover startup
```bash
curl -X DELETE http://localhost:3000/startups/1
```


---

## 🌱 Passo 5: Criar Seeds (Dados Iniciais)

### O que é uma Seed?

Uma seed é um arquivo que popula o banco com dados iniciais para desenvolvimento e testes.

### Criar o Arquivo de Seed

```bash
npx knex seed:make popular_startups
```

Será criado:
```
seeds/01_popular_startups.js
```

### Editar o Arquivo de Seed

**Caminho:** `seeds/01_popular_startups.js`

**Código completo:**

```javascript
/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.QueryBuilder }
 */
export async function seed(knex) {
  // Deletar dados existentes
  await knex('startups').del();

  // Inserir dados iniciais
  await knex('startups').insert([
    {
      id: 1,
      nome: 'AgroFácil',
      especialidade: 'Drones',
      anoAbertura: 2020
    },
    {
      id: 2,
      nome: 'EcoSolo',
      especialidade: 'Sensores',
      anoAbertura: 2021
    },
    {
      id: 3,
      nome: 'AgriTech Pro',
      especialidade: 'IA e Análise de Dados',
      anoAbertura: 2022
    },
    {
      id: 4,
      nome: 'IrrigaControl',
      especialidade: 'Sistemas de Irrigação',
      anoAbertura: 2019
    },
    {
      id: 5,
      nome: 'CropGuard',
      especialidade: 'Proteção de Culturas',
      anoAbertura: 2023
    }
  ]);
}
```

### Executar Seeds

```bash
npx knex seed:run
```

**Saída esperada:**
```
Ran 1 seed files
```

### Verificar Dados

```bash
curl http://localhost:3000/startups
```

Resposta esperada (com 5 startups):
```json
[
  {
    "id": 1,
    "nome": "AgroFácil",
    "especialidade": "Drones",
    "anoAbertura": 2020,
    "created_at": "2026-04-15T...",
    "updated_at": "2026-04-15T..."
  },
  ...
]
```

---

## 🐳 Passo 6: Configurar Docker

### 6.1 Atualizar knexfile.js para PostgreSQL (Produção)

**Caminho:** `knexfile.js`

**Código completo:**

```javascript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'agrotech',
      password: process.env.DB_PASSWORD || 'agrotech123',
      database: process.env.DB_NAME || 'agrotech_staging'
    },
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'agrotech',
      password: process.env.DB_PASSWORD || 'agrotech123',
      database: process.env.DB_NAME || 'agrotech_prod'
    },
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  }

};
```

### 6.2 Instalar PostgreSQL Driver

```bash
npm install pg
```

### 6.3 Criar Dockerfile

**Caminho:** `Dockerfile`

**Código completo:**

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY knexfile.js ./

# Instalar dependências
RUN npm install

# Copiar código-fonte
COPY src/ ./src/
COPY migrations/ ./migrations/
COPY seeds/ ./seeds/
COPY frontend/ ./frontend/

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Instalar curl para health checks
RUN apk add --no-cache curl

# Copiar dependências do stage anterior
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/knexfile.js ./

# Copiar código
COPY src/ ./src/
COPY migrations/ ./migrations/
COPY seeds/ ./seeds/
COPY frontend/ ./frontend/

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Comando para iniciar
CMD ["npm", "run", "dev"]
```

### 6.4 Criar docker-compose.yml

**Caminho:** `docker-compose.yml`

**Código completo:**

```yaml
version: '3.8'

services:
  # Banco de Dados PostgreSQL
  db:
    image: postgres:15-alpine
    container_name: agrotech_db
    environment:
      POSTGRES_USER: agrotech
      POSTGRES_PASSWORD: agrotech123
      POSTGRES_DB: agrotech_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - agrotech_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U agrotech"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Servidor Backend
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: agrotech_backend
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: staging
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: agrotech
      DB_PASSWORD: agrotech123
      DB_NAME: agrotech_dev
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - agrotech_network
    command: sh -c "npm run migrate && npm run seed && npm run dev"

  # Frontend (Opcional)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: agrotech_frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    networks:
      - agrotech_network
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  postgres_data:

networks:
  agrotech_network:
    driver: bridge
```

### 6.5 Criar Dockerfile para Frontend

**Caminho:** `frontend/Dockerfile`

**Código completo:**

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g vite

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

### 6.6 Adicionar scripts ao package.json

**Caminho:** `package.json`

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "dev-all": "concurrently \"npm run dev\" \"cd frontend && npm run dev\"",
    "migrate": "knex migrate:latest --env staging",
    "seed": "knex seed:run --env staging",
    "build": "vite build",
    "docker:build": "docker-compose build",
    "docker:up": "docker-compose up",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f"
  }
}
```

### 6.7 Criar .dockerignore

**Caminho:** `.dockerignore`

```
node_modules
npm-debug.log
dist
.git
.gitignore
README.md
.env.local
dev.sqlite3
```

### 6.8 Criar .env para desenvolvimento

**Caminho:** `.env`

```
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=agrotech
DB_PASSWORD=agrotech123
DB_NAME=agrotech_dev
```

---

## 🚀 Passo 7: Executar com Docker Compose

### 7.1 Build das imagens

```bash
npm run docker:build
```

Ou manualmente:
```bash
docker-compose build
```

### 7.2 Iniciar os serviços

```bash
npm run docker:up
```

Ou manualmente:
```bash
docker-compose up
```

**Saída esperada:**
```
agrotech_db       | LOG:  database system is ready to accept connections
agrotech_backend  | 🚀 Servidor rodando em http://localhost:3000
agrotech_db       | postgres ready
```

### 7.3 Ver logs

```bash
npm run docker:logs
```

### 7.4 Parar os serviços

```bash
npm run docker:down
```

Ou:
```bash
docker-compose down
```

---

## ✅ Passo 8: Verificação Final

### 8.1 Verificar se o banco está funcionando

```bash
curl http://localhost:3000/startups
```

Deve retornar as 5 startups da seed.

### 8.2 Verificar container do banco

```bash
docker ps
```

Deve mostrar:
```
CONTAINER ID   IMAGE              STATUS
xxx            postgres:15        Up ...
xxx            agrotech_backend   Up ...
```

### 8.3 Acessar container do banco

```bash
docker exec -it agrotech_db psql -U agrotech -d agrotech_dev
```

Dentro do psql:
```sql
-- Ver tabelas
\dt

-- Ver startups
SELECT * FROM startups;

-- Sair
\q
```

### 8.4 Limpar volumes (se necessário)

```bash
docker-compose down -v
```

---

## 📊 Resumo de Comandos

| Comando | Função |
|---------|--------|
| `npx knex migrate:make` | Criar nova migration |
| `npx knex migrate:latest` | Executar todas as migrations |
| `npx knex migrate:rollback` | Desfazer última migration |
| `npx knex migrate:status` | Ver status das migrations |
| `npx knex seed:make` | Criar novo seed |
| `npx knex seed:run` | Executar seeds |
| `docker-compose build` | Build das imagens |
| `docker-compose up` | Iniciar serviços |
| `docker-compose down` | Parar serviços |
| `docker-compose logs -f` | Ver logs |

---

## 🎯 Fluxo Completo

```
1. Criar migration
   npx knex migrate:make criar_tabelas_iniciais
   ↓
2. Implementar código da migration
   ↓
3. Executar migration
   npx knex migrate:latest
   ↓
4. Criar seed
   npx knex seed:make popular_startups
   ↓
5. Implementar seed
   ↓
6. Integrar Knex no servidor
   ↓
7. Testar localmente
   npm run dev
   ↓
8. Criar Dockerfile e docker-compose.yml
   ↓
9. Build e teste com Docker
   docker-compose build
   docker-compose up
   ↓
10. Verificação final
    curl http://localhost:3000/startups
```

---

## 🐛 Troubleshooting

### Erro: "Failed to resolve config file"
- Certifique-se de que `knexfile.js` existe na raiz do projeto

### Erro: "Connection refused" no Docker
- Aguarde o PostgreSQL iniciar completamente
- Verificar logs: `docker-compose logs db`

### Erro: "exports is not defined"
- Use `export function` em vez de `exports.up` nas migrations
- Arquivo `package.json` deve ter `"type": "module"`

### Dados não aparecem após seed
- Verificar se a seed foi executada: `docker-compose logs backend`
- Reexecutar seed: `docker exec agrotech_backend npx knex seed:run`

---

## 📚 Próximos Passos

- [ ] Implementar autenticação
- [ ] Adicionar validações robustas
- [ ] Criar testes automatizados
- [ ] Configurar CI/CD com GitHub Actions
- [ ] Deploy em produção (AWS, Heroku, etc.)
- [ ] Monitoramento e logs
- [ ] Cache com Redis

---

## 📄 Conclusão

Você agora tem:
- ✅ Migrations Knex funcionando
- ✅ Seeds com dados iniciais
- ✅ Backend integrado com PostgreSQL
- ✅ Tudo containerizado com Docker
- ✅ Pronto para desenvolvimento em equipe e produção