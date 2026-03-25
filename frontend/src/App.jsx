// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/startups')
      .then(resposta => resposta.json())
      .then(dados => setStartups(dados))
      .catch(erro => console.log("Erro: ", erro));
  }, []);


  // POST Função
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const cadastrarStartup = (evento) => {
    evento.preventDefault();
    const novaStartup = { nome, especialidade };

    fetch('http://localhost:3000/startups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaStartup)
    })
      .then(res => res.json())
      .then(dadoSalvo => {
        setStartups([...startups, dadoSalvo]); // Adiciona na tela
        setNome(''); setEspecialidade(''); // Limpa campos
      });
  };

  // Delete Função
  const deletarStartup = (id) => {
    fetch(`http://localhost:3000/startups/${id}`, { method: 'DELETE' })
      .then(() => {
        setStartups(startups.filter(s => s.id !== id)); // Remove da tela
      });
  };

  // PUT Função 
  const editarStartup = (id, startupAtual) => {
    const novoNome = window.prompt("Novo nome:", startupAtual.nome);
    const novaEsp = window.prompt("Nova especialidade:", startupAtual.especialidade);

    if (!novoNome || !novaEsp) return;

    fetch(`http://localhost:3000/startups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoNome, especialidade: novaEsp })
    })
      .then(res => res.json())
      .then(dadoAtualizado => {
        // Troca a startup antiga pela nova na lousa
        setStartups(startups.map(s => s.id === id ? dadoAtualizado : s));
      });
  };


  return (
    <div>
      <h1>Painel do Produtor Rural</h1>
      <h2>Startups Disponíveis:</h2>
      <form onSubmit={cadastrarStartup} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        <input type="text" placeholder="Especialidade" value={especialidade} onChange={e => setEspecialidade(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      <ul>
        {startups.map(startup => (
          <li key={startup.id}>
            <strong>{startup.nome}</strong> - {startup.especialidade}
            <button onClick={() => deletarStartup(startup.id)}>Excluir</button>
            <button onClick={() => editarStartup(startup.id, startup)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default App;
