# Guia Rápido de Início - CRUD Completo

Este é um guia rápido para começar a usar a aplicação AgroTech Connect com CRUD completo.

## 🚀 Iniciar Rapidamente

### Pré-requisitos
- Docker instalado e rodando
- Node.js instalado
- PostgreSQL rodando (em Docker)

### 1. Iniciar PostgreSQL

```bash
cd c:\Projeto_Reges\projeto_agro_v4
docker-compose up -d
```

Verificar se está rodando:
```bash
docker ps
```

### 2. Instalar Dependências

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 3. Executar Migrações

```bash
npx knex migrate:latest
```

### 4. Popular Banco (Opcional)

```bash
npx knex seed:run
```

### 5. Iniciar Aplicação

```bash
# Opção A: Backend e Frontend simultaneamente
npm run dev-all

# Opção B: Separadamente
# Terminal 1
npm run dev

# Terminal 2
cd frontend && npm run dev
```

### 6. Acessar Aplicação

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **API**: http://localhost:3000/startups

---

## 📁 Arquivos Criados/Modificados

### Serviços
- ✨ `frontend/src/services/api.js` - Camada de API

### Componentes
- ✨ `frontend/src/components/StartupForm.jsx` - Formulário
- ✨ `frontend/src/components/StartupGrid.jsx` - Listagem
- ✨ `frontend/src/components/EditModal.jsx` - Modal de edição

### Modificados
- 🔄 `frontend/src/App.jsx` - Refatorado com novo padrão
- 🔄 `frontend/src/App.css` - Estilos atualizados

---

## 🎯 Funcionalidades Implementadas

### Create (POST)
```
Formulário → Validação → API → Banco → Tela
```

### Read (GET)
```
Carregamento → API → Banco → Grid → Tela
```

### Update (PUT)
```
Click Editar → Modal → Formulário → API → Banco → Tela
```

### Delete (DELETE)
```
Click Deletar → Confirmação → API → Banco → Tela
```

---

## 🔧 Comandos Úteis

### Backend

```bash
# Iniciar desenvolvimento
npm run dev

# Executar migrações
npx knex migrate:latest

# Reverter migrações
npx knex migrate:rollback

# Popular banco
npx knex seed:run

# Testar API
Invoke-WebRequest -Uri http://localhost:3000/startups -Method GET -UseBasicParsing
```

### Frontend

```bash
# Iniciar desenvolvimento
cd frontend && npm run dev

# Compilar produção
npm run build

# Prévia produção
npm run preview
```

### Docker

```bash
# Subir container
docker-compose up -d

# Parar container
docker-compose down

# Ver logs
docker-compose logs postgres

# Entrar no psql
# psql -h localhost -U agro_user -d agro_dev (Linux/Mac)
```

---

## ✅ Checklist de Funcionalidades

- [x] API Express funcionando
- [x] PostgreSQL em Docker
- [x] Migrations rodando
- [x] Seeds populando dados
- [x] Frontend React carregando
- [x] Componentes modulares criados
- [x] Serviço de API centralizado
- [x] Formulário de criação
- [x] Listagem em grid
- [x] Modal de edição
- [x] Deletar com confirmação
- [x] Tratamento de erros
- [x] Mensagens de sucesso
- [x] Loading states
- [x] Design responsivo
- [x] Validações básicas

---

## 📊 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND REACT                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ App.jsx (Estado Principal)                       │   │
│  ├──────────────────────────────────────────────────┤   │
│  │ ├─ StartupForm (Criar/Editar)                    │   │
│  │ ├─ StartupGrid (Listar)                          │   │
│  │ └─ EditModal (Editar em Modal)                   │   │
│  └──────────────────────────────────────────────────┘   │
│            ↓                                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ services/api.js (Comunicação)                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                   BACKEND EXPRESS                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │ GET /startups    → db.select()                   │   │
│  │ POST /startups   → db.insert()                   │   │
│  │ PUT /startups/:id → db.update()                  │   │
│  │ DELETE /startups/:id → db.del()                  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│            BANCO DE DADOS POSTGRESQL                     │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Tabela: startups                                 │   │
│  │ ├─ id (PK)                                       │   │
│  │ ├─ nome                                          │   │
│  │ ├─ especialidade                                 │   │
│  │ ├─ anoAbertura                                   │   │
│  │ ├─ created_at                                    │   │
│  │ └─ updated_at                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 🐛 Possíveis Erros e Soluções

| Erro | Causa | Solução |
|------|-------|---------|
| "Erro ao carregar startups" | Backend não rodando | `npm run dev` |
| CORS Error | Frontend e backend desconectados | Verificar `localhost:3000` |
| Modal não abre | Componente não renderizado | Verificar estado |
| Dados não salvam | PostgreSQL offline | `docker-compose up -d` |
| Frontend branco | Vite não iniciou | `cd frontend && npm run dev` |
| Port 3000 em uso | Outro processo rodando | `taskkill /f /im node.exe` |
| Port 5173 em uso | Vite já rodando | Fechar terminal anterior |
| Migrations falharam | Banco não existe | Verificar docker-compose |

---

## 📚 Estrutura de Arquivos Final

```
projeto_agro_v4/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StartupForm.jsx          ✨
│   │   │   ├── StartupGrid.jsx          ✨
│   │   │   └── EditModal.jsx            ✨
│   │   ├── services/
│   │   │   └── api.js                   ✨
│   │   ├── App.jsx                      🔄
│   │   ├── App.css                      🔄
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── src/
│   └── server.js                        🔄
├── migrations/
│   └── 20260415142051_criar_tabelas_iniciais.js
├── seeds/
│   └── popular_startups.js
├── docker-compose.yml
├── knexfile.js
├── package.json
├── MIGRACAO_POSTGRESQL_GUIDE.md
├── FRONTEND_CRUD_TUTORIAL.md
└── QUICK_START.md                       ✨
```

**Legenda:**
- ✨ Novo arquivo
- 🔄 Arquivo modificado

---

## 🎓 O Que Você Aprendeu

1. **Arquitetura Modular**
   - Separação de responsabilidades
   - Componentes reutilizáveis
   - Serviço centralizado

2. **CRUD Completo**
   - REST API
   - React Hooks (useState, useEffect)
   - Requisições HTTP com Fetch

3. **Experiência do Usuário**
   - Validação de formulários
   - Mensagens de feedback
   - Loading states
   - Tratamento de erros

4. **Integração Backend-Frontend**
   - Comunicação entre camadas
   - Persistência em banco de dados
   - Transações HTTP

---

## 🚀 Próximos Passos

### Melhorias Recomendadas

1. **Adicionar Paginação**
   - Mostrar 10 items por página
   - Controles de navegação

2. **Implementar Busca**
   - Filtrar startups por nome
   - Filtrar por especialidade

3. **Adicionar Ordenação**
   - Ordenar por nome crescente/decrescente
   - Ordenar por ano
   - Ordenar por data de criação

4. **Melhorar Validações**
   - Validar email
   - Validar URLs
   - Validar tamanho de texto

5. **Adicionar Autenticação**
   - Login com usuário/senha
   - JWT tokens
   - Proteção de rotas

6. **Deploy em Produção**
   - Build do React
   - Hosting do frontend
   - Banco em nuvem
   - Servidor em nuvem (Heroku, AWS, etc)

---

## 📞 Suporte

Se encontrar problemas:

1. Verificar logs: `docker-compose logs postgres`
2. Verificar console do navegador (F12)
3. Verificar terminal do backend
4. Consultar guias:
   - `MIGRACAO_POSTGRESQL_GUIDE.md`
   - `FRONTEND_CRUD_TUTORIAL.md`

---

**Aplicação pronta para uso! Bom desenvolvimento! 🎉**