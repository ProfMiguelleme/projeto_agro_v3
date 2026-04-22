# AgroTech Connect: Painel do Produtor Rural

## Descrição do Projeto

Este projeto implementa uma aplicação full-stack chamada "AgroTech Connect: Painel do Produtor Rural", que permite gerenciar startups do setor agropecuário. A aplicação oferece funcionalidades de CRUD (Criar, Ler, Atualizar, Deletar) para startups, com um frontend moderno em React e um backend em Node.js com Express.

## Tecnologias Utilizadas

### Backend
- **Node.js** com **Express.js** para o servidor
- **CORS** para permitir requisições do frontend
- **Nodemon** para desenvolvimento (reinício automático)
- **Concurrently** para executar frontend e backend simultaneamente

### Frontend
- **React 19** com **Vite** para build rápido
- **ESLint** para linting
- **CSS moderno** com variáveis CSS para design responsivo

## Estrutura do Projeto

```
projeto_agro_v3/
├── package.json          # Configuração do backend
├── src/
│   ├── server.js         # Servidor Express
│   └── startups.js       # Dados iniciais das startups
├── frontend/
│   ├── package.json      # Configuração do frontend
│   ├── index.html        # HTML principal
│   ├── vite.config.js    # Configuração Vite
│   └── src/
│       ├── main.jsx      # Ponto de entrada React
│       ├── App.jsx       # Componente principal
│       ├── App.css       # Estilos
│       └── index.css     # Estilos globais
```

## Passo a Passo da Implementação

### 1. Configuração Inicial do Projeto

#### Backend (package.json principal)
```json
{
  "name": "projeto_agro",
  "version": "1.0.0",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "dev-all": "concurrently \"npm run dev\" \"cd frontend && npm run dev\""
  },
  "dependencies": {
    "cors": "^2.8.6",
    "express": "^5.2.1"
  },
  "devDependencies": {
    "concurrently": "^9.2.1",
    "nodemon": "^3.1.14"
  }
}
```

#### Frontend (frontend/package.json)
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "vite": "^8.0.1"
  }
}
```

### 2. Implementação do Backend

#### Dados Iniciais (src/startups.js)
```javascript
// src/startups.js
const startups = [
    { id: 1, nome: "AgroFácil", especialidade: "Drones", anoAbertura: 2020 },
    { id: 2, nome: "EcoSolo", especialidade: "Sensores", anoAbertura: 2021 }
];

export default startups; // Exporta os dados
```

#### Servidor Express (src/server.js)
```javascript
import express from 'express';
import cors from 'cors'; // Importa
import listaStartups from './startups.js';

const app = express();
const port = 3000;

app.use(cors()); // Libera a entrada!
app.use(express.json()); // Ensina o servidor a ler pacotes JSON

app.get('/', (req, res) => {
  res.send('AgroTech Connect: O servidor está rodando!');
});

app.get('/startups', (req, res) => {
  res.json(listaStartups); // Usa os dados importados
});

app.post('/startups', (req, res) => {
  const novaStartup = req.body;
  novaStartup.id = listaStartups.length > 0 ? Math.max(...listaStartups.map(s => s.id)) + 1 : 1; // ID automático seguro
  listaStartups.push(novaStartup); // Guarda na lista
  res.status(201).json(novaStartup);
});

// Rota DELETE: Recebe novos dados
app.delete('/startups/:id', (req, res) => {
  const idParaDeletar = parseInt(req.params.id);
  const index = listaStartups.findIndex(s => s.id === idParaDeletar);
 
  if (index !== -1) {
    listaStartups.splice(index, 1); // Remove da lista
    res.status(200).json({ mensagem: "Deletado com sucesso" });
  } else {
    res.status(404).json({ erro: "Não encontrada" });
  }
});

// Rota PUT: Recebe novos dados
app.put('/startups/:id', (req, res) => {
  const idParaEditar = parseInt(req.params.id);
  const index = listaStartups.findIndex(s => s.id === idParaEditar);
 
  if (index !== -1) {
    listaStartups[index].nome = req.body.nome;
    listaStartups[index].especialidade = req.body.especialidade;
    listaStartups[index].anoAbertura = req.body.anoAbertura;
    res.status(200).json(listaStartups[index]);
  } else {
    res.status(404).json({ erro: "Não encontrada" });
  }
});

// Ligando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

### 3. Implementação do Frontend

#### HTML Principal (frontend/index.html)
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Painel do Produtor Rural</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### Ponto de Entrada React (frontend/src/main.jsx)
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

#### Componente Principal (frontend/src/App.jsx)
```jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [startups, setStartups] = useState([]);
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [anoAbertura, setAnoAbertura] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/startups')
      .then(resposta => resposta.json())
      .then(dados => setStartups(dados))
      .catch(erro => console.error("Erro: ", erro));
  }, []);

  const cadastrarStartup = (evento) => {
    evento.preventDefault();
    const novaStartup = { 
      nome, 
      especialidade, 
      anoAbertura: parseInt(anoAbertura) || new Date().getFullYear() 
    };

    fetch('http://localhost:3000/startups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaStartup)
    })
      .then(res => res.json())
      .then(dadoSalvo => {
        setStartups([...startups, dadoSalvo]);
        setNome('');
        setEspecialidade('');
        setAnoAbertura('');
      })
      .catch(erro => console.error("Erro: ", erro));
  };

  const deletarStartup = (id) => {
    fetch(`http://localhost:3000/startups/${id}`, { method: 'DELETE' })
      .then(() => {
        setStartups(startups.filter(s => s.id !== id));
      })
      .catch(erro => console.error("Erro ao deletar: ", erro));
  };

  const editarStartup = (id, startupAtual) => {
    const novoNome = window.prompt("Novo nome:", startupAtual.nome);
    const novaEsp = window.prompt("Nova especialidade:", startupAtual.especialidade);
    const novoAno = window.prompt("Novo ano de abertura:", startupAtual.anoAbertura || '');

    if (!novoNome || !novaEsp || !novoAno) return;

    fetch(`http://localhost:3000/startups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nome: novoNome, 
        especialidade: novaEsp,
        anoAbertura: parseInt(novoAno) || new Date().getFullYear()
      })
    })
      .then(res => res.json())
      .then(dadoAtualizado => {
        setStartups(startups.map(s => s.id === id ? dadoAtualizado : s));
      })
      .catch(erro => console.error("Erro ao editar: ", erro));
  };

  return (
    <div className="app-container">
      <header className="hero-section">
        <h1 className="title">AgroTech Connect</h1>
        <p className="subtitle">Painel do Produtor Rural</p>
      </header>
      
      <main className="main-content">
        <section className="form-section">
          <h2>Cadastrar Nova Startup</h2>
          <form className="startup-form" onSubmit={cadastrarStartup}>
            <div className="input-group">
              <label htmlFor="nome">Nome</label>
              <input 
                id="nome"
                type="text" 
                placeholder="Ex: AgroTech Solutions" 
                value={nome} 
                onChange={e => setNome(e.target.value)} 
                required 
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
                required 
                min="1900"
                max="2099"
              />
            </div>
            <button className="btn-submit" type="submit">
              <span>Cadastrar Startup</span>
            </button>
          </form>
        </section>

        <section className="list-section">
          <h2>Startups Disponíveis</h2>
          {startups.length === 0 ? (
            <p className="empty-state">Nenhuma startup cadastrada ainda.</p>
          ) : (
            <div className="startup-grid">
              {startups.map(startup => (
                <article key={startup.id} className="startup-card">
                  <div className="card-header">
                    <h3>{startup.nome}</h3>
                    <span className="badge year-badge">{startup.anoAbertura || 'N/D'}</span>
                  </div>
                  <div className="card-body">
                    <span className="badge tech-badge">{startup.especialidade}</span>
                  </div>
                  <div className="card-footer">
                    <button className="btn-edit" onClick={() => editarStartup(startup.id, startup)}>Editar</button>
                    <button className="btn-delete" onClick={() => deletarStartup(startup.id)}>Excluir</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
```

#### Estilos CSS (frontend/src/App.css)
```css
/* Modern Reset and Design Tokens */
:root {
  --primary: #10b981;
  --primary-hover: #059669;
  --bg-color: #f3f4f6;
  --card-bg: #ffffff;
  --text-main: #1f2937;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --danger: #ef4444;
  --danger-hover: #dc2626;
  --warning: #f59e0b;
  --warning-hover: #d97706;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header / Hero */
.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, var(--primary) 0%, #047857 100%);
  border-radius: var(--radius-lg);
  color: white;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  font-weight: 300;
  position: relative;
  z-index: 1;
}

/* Main Layout */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Form Section */
.form-section {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.form-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--text-main);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.startup-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: end;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
}

.input-group input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition);
  background: var(--bg-color);
  color: var(--text-main);
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  background: #fff;
}

.btn-submit {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-submit:active {
  transform: translateY(0);
}

/* List Section */
.list-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-main);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
  background: white;
  border-radius: var(--radius-lg);
  border: 2px dashed var(--border-color);
}

.startup-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

/* Cards */
.startup-card {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-color);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.startup-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--primary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
  flex: 1;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  white-space: nowrap;
}

.year-badge {
  background: var(--primary);
  color: white;
}

.tech-badge {
  background: var(--bg-color);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.card-body {
  flex: 1;
}

.card-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-edit, .btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.btn-edit {
  background: var(--warning);
  color: white;
}

.btn-edit:hover {
  background: var(--warning-hover);
}

.btn-delete {
  background: var(--danger);
  color: white;
}

.btn-delete:hover {
  background: var(--danger-hover);
}

/* Responsive Design */
@media (max-width: 768px) {
  .app-container {
    padding: 1rem;
  }
  
  .hero-section {
    margin-bottom: 2rem;
    padding: 1.5rem 0;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .startup-form {
    grid-template-columns: 1fr;
  }
  
  .startup-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .card-footer {
    flex-direction: column;
  }
  
  .btn-edit, .btn-delete {
    width: 100%;
  }
}
```

## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone ou baixe o projeto** para sua máquina local

2. **Instale as dependências do backend:**
   ```bash
   npm install
   ```

3. **Instale as dependências do frontend:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Execute o projeto completo (backend + frontend):**
   ```bash
   npm run dev-all
   ```

   Ou execute separadamente:
   - **Backend:** `npm run dev`
   - **Frontend:** `cd frontend && npm run dev`

5. **Acesse a aplicação:**
   - Frontend: http://localhost:5173 (porta padrão do Vite)
   - Backend: http://localhost:3000

## Funcionalidades Implementadas

### Backend
- ✅ API REST com Express.js
- ✅ Rotas CRUD para startups (GET, POST, PUT, DELETE)
- ✅ Middleware CORS para comunicação com frontend
- ✅ Tratamento de JSON
- ✅ Geração automática de IDs
- ✅ Tratamento de erros básico

### Frontend
- ✅ Interface React moderna e responsiva
- ✅ Formulário para cadastro de startups
- ✅ Listagem de startups em cards
- ✅ Funcionalidades de editar e excluir
- ✅ Design com tema agro (verde)
- ✅ Animações e transições suaves
- ✅ Layout responsivo para mobile

## Próximos Passos Sugeridos

- Implementar validação mais robusta nos formulários
- Adicionar persistência de dados (banco de dados)
- Implementar autenticação/autorização
- Adicionar filtros e busca para startups
- Melhorar UX com confirmações de ações
- Adicionar testes unitários e de integração
- Implementar paginação para listas grandes

## Conclusão

Esta implementação demonstra uma aplicação full-stack completa para gerenciamento de startups agropecuárias, utilizando tecnologias modernas como React 19, Vite, Node.js e Express. O projeto segue boas práticas de desenvolvimento, com código organizado, design responsivo e funcionalidades CRUD completas.</content>
<parameter name="filePath">c:\Projeto_Reges\projeto_agro_v3\IMPLEMENTACAO.md