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