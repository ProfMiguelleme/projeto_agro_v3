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