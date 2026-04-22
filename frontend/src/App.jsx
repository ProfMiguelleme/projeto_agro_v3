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
