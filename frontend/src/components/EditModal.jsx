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