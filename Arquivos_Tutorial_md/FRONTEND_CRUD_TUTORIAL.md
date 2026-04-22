# Tutorial Completo: CRUD Frontend com React + API PostgreSQL

Este guia detalha como implementar um sistema CRUD (Create, Read, Update, Delete) completo no frontend React, integrado com a API Express e banco PostgreSQL.

## 📋 Índice
1. [Arquitetura](#arquitetura)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Implementação Passo a Passo](#implementação-passo-a-passo)
4. [Componentes Criados](#componentes-criados)
5. [Serviços de API](#serviços-de-api)
6. [Guia de Uso](#guia-de-uso)
7. [Troubleshooting](#troubleshooting)

---

## Arquitetura

A aplicação segue a arquitetura moderna de componentes React com separação de responsabilidades:

```
Frontend (React + Vite)
├── Componentes Reutilizáveis
├── Serviço de API
├── Estado Global (React State)
└── Estilos CSS

Backend (Express + Knex)
├── Rotas REST
├── Banco de Dados (PostgreSQL)
└── Validações

Docker
└── PostgreSQL (Containerizado)
```

---

## Estrutura de Pastas

A estrutura final do frontend fica assim:

```
frontend/src/
├── components/
│   ├── StartupForm.jsx      # Formulário de cadastro/edição
│   ├── StartupGrid.jsx      # Listagem de startups
│   └── EditModal.jsx        # Modal para edição
├── services/
│   └── api.js               # Chamadas à API
├── App.jsx                  # Componente principal
├── App.css                  # Estilos globais
├── main.jsx                 # Entry point
└── index.css                # Estilos base
```

---

## Implementação Passo a Passo

### Passo 1: Criar Serviço de API

Arquivo: `frontend/src/services/api.js`

Este arquivo centraliza todas as chamadas à API, facilitando a manutenção e tratamento de erros.

```javascript
const API_URL = 'http://localhost:3000';

// Buscar todas as startups
export async function obterStartups() {
  try {
    const response = await fetch(`${API_URL}/startups`);
    if (!response.ok) throw new Error('Erro ao buscar startups');
    return await response.json();
  } catch (erro) {
    console.error('Erro ao buscar startups:', erro);
    throw erro;
  }
}

// Criar nova startup
export async function criarStartup(dados) {
  try {
    const response = await fetch(`${API_URL}/startups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!response.ok) throw new Error('Erro ao criar startup');
    return await response.json();
  } catch (erro) {
    console.error('Erro ao criar startup:', erro);
    throw erro;
  }
}

// Atualizar startup
export async function atualizarStartup(id, dados) {
  try {
    const response = await fetch(`${API_URL}/startups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    if (!response.ok) throw new Error('Erro ao atualizar startup');
    return await response.json();
  } catch (erro) {
    console.error('Erro ao atualizar startup:', erro);
    throw erro;
  }
}

// Deletar startup
export async function deletarStartup(id) {
  try {
    const response = await fetch(`${API_URL}/startups/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar startup');
    return await response.json();
  } catch (erro) {
    console.error('Erro ao deletar startup:', erro);
    throw erro;
  }
}
```

**Por que assim?**
- Centraliza todas as requisições HTTP
- Facilita testes e manutenção
- Permite tratamento consistente de erros
- Reutilizável em toda a aplicação

---

### Passo 2: Criar Componente de Formulário

Arquivo: `frontend/src/components/StartupForm.jsx`

Componente reutilizável para criar e editar startups:

```javascript
import { useState } from 'react';

export default function StartupForm({ onSubmit, isLoading, startup = null }) {
  const [nome, setNome] = useState(startup?.nome || '');
  const [especialidade, setEspecialidade] = useState(startup?.especialidade || '');
  const [anoAbertura, setAnoAbertura] = useState(startup?.anoAbertura || '');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nome.trim() || !especialidade.trim()) {
      setErro('Nome e especialidade são obrigatórios');
      return;
    }

    const dados = {
      nome: nome.trim(),
      especialidade: especialidade.trim(),
      anoAbertura: anoAbertura ? parseInt(anoAbertura) : new Date().getFullYear()
    };

    setErro('');
    onSubmit(dados, () => {
      setNome('');
      setEspecialidade('');
      setAnoAbertura('');
    });
  };

  return (
    <form className="startup-form" onSubmit={handleSubmit}>
      {erro && <div className="form-error">{erro}</div>}
      
      <div className="input-group">
        <label htmlFor="nome">Nome</label>
        <input 
          id="nome"
          type="text" 
          placeholder="Ex: AgroTech Solutions" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required 
          disabled={isLoading}
        />
      </div>

      <div className="input-group">
        <label htmlFor="especialidade">Especialidade</label>
        <input 
          id="especialidade"
          type="text" 
          placeholder="Ex: Drones Agrícolas" 
          value={especialidade} 
          onChange={e => setEspecialidade(e.target.value)} 
          required 
          disabled={isLoading}
        />
      </div>

      <div className="input-group">
        <label htmlFor="anoAbertura">Ano de Abertura</label>
        <input 
          id="anoAbertura"
          type="number" 
          placeholder="Ex: 2021" 
          value={anoAbertura} 
          onChange={e => setAnoAbertura(e.target.value)} 
          min="1900"
          max="2099"
          disabled={isLoading}
        />
      </div>

      <button 
        className="btn-submit" 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Processando...' : startup ? 'Atualizar Startup' : 'Cadastrar Startup'}
      </button>
    </form>
  );
}
```

**Características:**
- Reutilizável para criar e editar
- Validação de campos obrigatórios
- Exibição de erros
- Estado desabilitado durante loading

---

### Passo 3: Criar Componente de Grid

Arquivo: `frontend/src/components/StartupGrid.jsx`

Componente para listar todas as startups:

```javascript
export default function StartupGrid({ startups, onEdit, onDelete, isLoading }) {
  if (startups.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhuma startup cadastrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="startup-grid">
      {startups.map(startup => (
        <article key={startup.id} className="startup-card">
          <div className="card-header">
            <h3>{startup.nome}</h3>
            <span className="badge year-badge">{startup.anoAbertura || 'N/D'}</span>
          </div>
          
          <div className="card-body">
            <p className="especialidade">{startup.especialidade}</p>
            <div className="card-meta">
              <small className="date">
                Criado: {new Date(startup.created_at).toLocaleDateString('pt-BR')}
              </small>
            </div>
          </div>

          <div className="card-footer">
            <button 
              className="btn-edit" 
              onClick={() => onEdit(startup)}
              disabled={isLoading}
            >
              ✏️ Editar
            </button>
            <button 
              className="btn-delete" 
              onClick={() => {
                if (confirm(`Tem certeza que deseja deletar "${startup.nome}"?`)) {
                  onDelete(startup.id);
                }
              }}
              disabled={isLoading}
            >
              🗑️ Excluir
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
```

**Características:**
- Renderiza lista de startups
- Botões para editar e deletar
- Confirmação antes de deletar
- Formatação de datas

---

### Passo 4: Criar Modal de Edição

Arquivo: `frontend/src/components/EditModal.jsx`

Modal elegante para editar startups:

```javascript
import StartupForm from './StartupForm';

export default function EditModal({ startup, onSubmit, onClose, isLoading }) {
  if (!startup) return null;

  const handleSubmit = (dados, resetForm) => {
    onSubmit(startup.id, dados);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Startup</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <StartupForm 
            startup={startup}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
```

**Características:**
- Overlay com fundo semi-transparente
- Fechamento ao clicar fora (ou no X)
- Reutiliza StartupForm
- Animations suaves

---

### Passo 5: Refatorar App.jsx

Arquivo: `frontend/src/App.jsx`

Componente principal que orquestra tudo:

```javascript
import { useState, useEffect } from 'react';
import './App.css';
import StartupForm from './components/StartupForm';
import StartupGrid from './components/StartupGrid';
import EditModal from './components/EditModal';
import * as api from './services/api';

function App() {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [startupEmEdicao, setStartupEmEdicao] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Buscar startups ao carregar
  useEffect(() => {
    carregarStartups();
  }, []);

  const carregarStartups = async () => {
    try {
      setIsLoading(true);
      const dados = await api.obterStartups();
      setStartups(dados);
      setErro('');
    } catch (err) {
      setErro('Erro ao carregar startups. Verifique se o servidor está rodando.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCriar = async (dados, resetForm) => {
    try {
      setIsLoading(true);
      const novaStartup = await api.criarStartup(dados);
      setStartups([...startups, novaStartup]);
      setMensagemSucesso('✅ Startup criada com sucesso!');
      resetForm();
      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (err) {
      setErro('Erro ao criar startup');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAtualizar = async (id, dados) => {
    try {
      setIsLoading(true);
      const startupAtualizada = await api.atualizarStartup(id, dados);
      setStartups(startups.map(s => s.id === id ? startupAtualizada : s));
      setStartupEmEdicao(null);
      setMensagemSucesso('✅ Startup atualizada com sucesso!');
      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (err) {
      setErro('Erro ao atualizar startup');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletar = async (id) => {
    try {
      setIsLoading(true);
      await api.deletarStartup(id);
      setStartups(startups.filter(s => s.id !== id));
      setMensagemSucesso('✅ Startup deletada com sucesso!');
      setTimeout(() => setMensagemSucesso(''), 3000);
    } catch (err) {
      setErro('Erro ao deletar startup');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="hero-section">
        <h1 className="title">🌾 AgroTech Connect</h1>
        <p className="subtitle">Painel de Gerenciamento de Startups Agrícolas</p>
      </header>

      {erro && (
        <div className="alert alert-error">
          ⚠️ {erro}
          <button onClick={() => setErro('')} className="alert-close">×</button>
        </div>
      )}

      {mensagemSucesso && (
        <div className="alert alert-success">
          {mensagemSucesso}
        </div>
      )}

      <main className="main-content">
        <section className="form-section">
          <h2>📝 Cadastrar Nova Startup</h2>
          <StartupForm 
            onSubmit={handleCriar}
            isLoading={isLoading}
          />
        </section>

        <section className="list-section">
          <div className="list-header">
            <h2>📊 Startups Disponíveis ({startups.length})</h2>
            <button 
              className="btn-refresh"
              onClick={carregarStartups}
              disabled={isLoading}
            >
              🔄 Recarregar
            </button>
          </div>
          <StartupGrid 
            startups={startups}
            onEdit={setStartupEmEdicao}
            onDelete={handleDeletar}
            isLoading={isLoading}
          />
        </section>
      </main>

      <EditModal 
        startup={startupEmEdicao}
        onSubmit={handleAtualizar}
        onClose={() => setStartupEmEdicao(null)}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
```

**Características:**
- Gerencia estado global
- Orquestra componentes
- Trata erros e mensagens de sucesso
- Carrega dados ao iniciar

---

## Componentes Criados

### 1. **StartupForm.jsx**
- **Responsabilidade**: Renderizar formulário de cadastro/edição
- **Props**: `onSubmit`, `isLoading`, `startup` (opcional)
- **Estado**: Nome, Especialidade, Ano, Erro

### 2. **StartupGrid.jsx**
- **Responsabilidade**: Listar startups em cards
- **Props**: `startups`, `onEdit`, `onDelete`, `isLoading`
- **Função**: Renderizar grid responsivo

### 3. **EditModal.jsx**
- **Responsabilidade**: Modal de edição
- **Props**: `startup`, `onSubmit`, `onClose`, `isLoading`
- **Função**: Overlay elegante para editar

---

## Serviços de API

O arquivo `api.js` contém 4 funções principais:

| Função | Método | Rota | Descrição |
|--------|--------|------|-----------|
| `obterStartups()` | GET | `/startups` | Busca todas as startups |
| `criarStartup(dados)` | POST | `/startups` | Cria nova startup |
| `atualizarStartup(id, dados)` | PUT | `/startups/:id` | Atualiza startup |
| `deletarStartup(id)` | DELETE | `/startups/:id` | Delete startup |

---

## Guia de Uso

### Iniciar Aplicação

```bash
# Subir backend e frontend simultaneamente
npm run dev-all

# Ou separadamente:
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Fluxo CRUD

#### 1. **CREATE (Criar)**
1. Preencher formulário com Nome, Especialidade e Ano
2. Clicar em "Cadastrar Startup"
3. Mensagem de sucesso aparece
4. Startup aparece na grid abaixo

#### 2. **READ (Ler)**
- Ao carregar a página, todas as startups são carregadas automaticamente
- Botão "Recarregar" atualiza a lista manualmente

#### 3. **UPDATE (Atualizar)**
1. Clicar em "✏️ Editar" em qualquer card
2. Modal abre com dados atuais
3. Modificar dados desejados
4. Clicar em "Atualizar Startup"
5. Modal fecha, card atualizado

#### 4. **DELETE (Deletar)**
1. Clicar em "🗑️ Excluir" em qualquer card
2. Confirmação aparece
3. Confirmar deleção
4. Startup é removida da lista

---

## Tratamento de Erros

### Estados de Erro

1. **Servidor não rodando**
   - Alerta: "Erro ao carregar startups. Verifique se o servidor está rodando."

2. **Criação falhou**
   - Alerta: "Erro ao criar startup"
   - Formulário permanece preenchido

3. **Atualização falhou**
   - Modal permanece aberto
   - Alerta de erro exibido

4. **Deleção falhou**
   - Startup permanece na lista
   - Alerta de erro exibido

---

## Estilos CSS

### Classes Principais

```css
/* Contenedores */
.app-container        /* Container principal */
.hero-section         /* Header com gradiente */
.main-content         /* Layout principal */

/* Seções */
.form-section         /* Seção de formulário */
.list-section         /* Seção de listagem */

/* Componentes */
.startup-form         /* Formulário */
.startup-grid         /* Grid de cards */
.startup-card         /* Card individual */

/* Modais */
.modal-overlay        /* Fundo do modal */
.modal-content        /* Conteúdo do modal */

/* Alertas */
.alert                /* Alerta genérico */
.alert-error          /* Alerta de erro */
.alert-success        /* Alerta de sucesso */
```

---

## Troubleshooting

### Problema: "Erro ao carregar startups"

**Causa**: Backend não está rodando

**Solução**:
```bash
# Terminal 1
npm run dev

# Verifique se está rodando em http://localhost:3000
```

### Problema: Frontend não carrega

**Causa**: Vite não iniciou

**Solução**:
```bash
# Terminal 2
cd frontend && npm run dev

# Deve estar em http://localhost:5173
```

### Problema: CORS Error

**Causa**: Frontend e backend em domínios diferentes

**Solução**: Backend já tem `cors` configurado na linha:
```javascript
app.use(cors());
```

### Problema: Modal não fecha

**Solução**: Clicar no X ou fora do modal

### Problema: Dados não persistem

**Causa**: PostgreSQL não está rodando

**Solução**:
```bash
docker-compose up -d
```

---

## Conceitos-Chave Aprendidos

### 1. **Separação de Responsabilidades**
- Serviços: comunicação com API
- Componentes: UI
- App: orquestração

### 2. **Reutilização de Componentes**
- `StartupForm` usado em criar e editar
- Reduz duplicação de código

### 3. **Gerenciamento de Estado**
- Estado local em componentes
- Props drilling para passar dados
- Estado global em App

### 4. **Tratamento de Erros**
- Try-catch em async/await
- Mensagens amigáveis ao usuário

### 5. **UX Melhorado**
- Loading states
- Confirmações antes de deletar
- Mensagens de sucesso
- Validação de campos

---

## Próximos Passos Opcionais

1. **Paginação**: Mostrar 10 startups por página
2. **Busca**: Filtrar startups por nome
3. **Ordenação**: Ordenar por nome, ano, especialidade
4. **Validações Avançadas**: Email, telefone, etc.
5. **Autenticação**: Login com JWT
6. **Deployment**: Deploy em produção

---

## Resumo do Que Foi Implementado

✅ **CRUD Completo**
- Create: Novo formulário elegante
- Read: Grid com cards responsivos
- Update: Modal de edição
- Delete: Com confirmação

✅ **Arquitetura Modular**
- Separação de componentes
- Serviço centralizado de API
- Código reusável

✅ **Experiência do Usuário**
- Alertas de erro e sucesso
- Loading states
- Confirmações
- Design responsivo

✅ **Integração Backend**
- PostgreSQL em Docker
- Express API
- Migrações e Seeds

Este é um projeto completo e profissional, pronto para expansão!