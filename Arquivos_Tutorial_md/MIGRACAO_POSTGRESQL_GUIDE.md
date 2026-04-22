# Guia de Migração: SQLite3 para PostgreSQL com Docker

Este guia detalha o processo completo de migração do banco de dados SQLite3 para PostgreSQL rodando em um container Docker no projeto Agro.

## Pré-requisitos

- Docker instalado e rodando
- Node.js e npm instalados
- Conhecimento básico de Docker e PostgreSQL

## Passo 1: Configurar PostgreSQL no Docker

Criaremos um arquivo `docker-compose.yml` na raiz do projeto para gerenciar o container PostgreSQL.

### Conteúdo do docker-compose.yml

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: agro_postgres
    environment:
      POSTGRES_DB: agro_dev
      POSTGRES_USER: agro_user
      POSTGRES_PASSWORD: agro_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### Comandos para subir o PostgreSQL

```bash
# Na raiz do projeto
docker-compose up -d
```

Verifique se o container está rodando:

```bash
docker ps
```

## Passo 2: Atualizar Dependências do Projeto

Remover sqlite3 e adicionar pg (driver PostgreSQL para Node.js).

### Atualizar package.json

Remova `"sqlite3": "^6.0.1"` das dependências e adicione `"pg": "^8.11.0"`.

### Instalar dependências

```bash
npm install pg@^8.11.0
npm uninstall sqlite3
```

## Passo 3: Atualizar Configuração do Knex

Modificar o `knexfile.js` para usar PostgreSQL em vez de SQLite3.

### Novo knexfile.js

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
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'agro_user',
      password: 'agro_pass',
      database: 'agro_dev'
    },
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  }

};
```

## Passo 4: Executar Migrações e Seeds

Com o PostgreSQL rodando, execute as migrações para criar as tabelas.

### Rodar migrações

```bash
npx knex migrate:latest
```

### Popular dados iniciais (opcional)

```bash
npx knex seed:run
```

## Passo 5: Atualizar Código do Servidor

Modificar a mensagem de log no `src/server.js` para refletir o uso do PostgreSQL.

### Alteração no server.js

```javascript
// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Banco de dados: PostgreSQL (localhost:5432/agro_dev)`);
});
```

## Passo 6: Testar a Aplicação

Inicie o servidor para verificar se tudo funciona com PostgreSQL.

### Iniciar servidor

```bash
npm run dev
```

### Testar API

```bash
# Usando curl (Linux/Mac)
curl http://localhost:3000/startups

# Ou usando PowerShell (Windows)
Invoke-WebRequest -Uri http://localhost:3000/startups -Method GET -UseBasicParsing | Select-Object -ExpandProperty Content
```

Acesse o frontend em `http://localhost:5173` (porta padrão do Vite) e teste as funcionalidades.

## Passo 7: Limpeza (Opcional)

Após confirmar que tudo funciona, você pode remover o arquivo `dev.sqlite3` antigo.

```bash
rm dev.sqlite3
```

## Comandos Úteis

### Parar o container PostgreSQL

```bash
docker-compose down
```

### Ver logs do PostgreSQL

```bash
docker-compose logs postgres
```

### Acessar o banco via psql (se instalado)

```bash
psql -h localhost -p 5432 -U agro_user -d agro_dev
```

### Resetar migrações (se necessário)

```bash
npx knex migrate:rollback
```

### Parar processos Node.js (Windows)

```bash
taskkill /f /im node.exe
```

## Notas Importantes

- As migrações existentes são compatíveis com PostgreSQL, pois usam a API genérica do Knex.
- O seed também funciona sem modificações.
- O código do servidor já usa `.returning()` que é específico do PostgreSQL.
- Em produção, use variáveis de ambiente para as credenciais do banco.
- Certifique-se de que a porta 5432 não esteja em uso por outro serviço.

## Troubleshooting

- **Erro de conexão**: Verifique se o container está rodando e as credenciais estão corretas.
- **Erro de migração**: Certifique-se de que o schema não existe ou execute rollback primeiro.
- **Porta ocupada**: Mude a porta no docker-compose.yml se 5432 estiver em uso.
- **Servidor não responde**: Verifique se o processo Node.js está rodando e se não há erros no console.

## Resultado Final

Após seguir todos os passos, você terá:
- ✅ PostgreSQL rodando em Docker
- ✅ Aplicação conectada ao PostgreSQL
- ✅ Migrações e seeds executados
- ✅ API funcionando corretamente
- ✅ Dados persistentes no volume Docker

Este guia permite replicar a migração em qualquer ambiente seguindo os passos sequencialmente.