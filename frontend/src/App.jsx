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
