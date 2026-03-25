import express from 'express';
import cors from 'cors'; // Importa
import listaStartups from './startups.js';

const app = express();
const port = 3000;

app.use(cors()); // Libera a entrada!
app.use(express.json()); // Ensina o servidor a ler pacotes JSON


// ... rota app.get('/startups')
app.get('/', (req, res) => {
  res.send('AgroTech Connect: O servidor está rodando!');
});

app.get('/startups', (req, res) => {
  res.json(listaStartups); // Usa os dados importados
});


app.post('/startups', (req, res) => {
  const novaStartup = req.body;
  novaStartup.id = listaStartups.length + 1; // ID automático
  listaStartups.push(novaStartup); // Guarda na lista
  res.status(201).json(novaStartup);
});

// Rota DELETE: Recebe novos dados
app.delete('/startups/:id', (req, res) => {
  const idParaDeletar = parseInt(req.params.id);
  const index = startups.findIndex(s => s.id === idParaDeletar);
 
  if (index !== -1) {
    startups.splice(index, 1); // Remove da lista
    res.status(200).json({ mensagem: "Deletado com sucesso" });
  } else {
    res.status(404).json({ erro: "Não encontrada" });
  }
});

// Rota PUT: Recebe novos dados
app.put('/startups/:id', (req, res) => {
  const idParaEditar = parseInt(req.params.id);
  const index = startups.findIndex(s => s.id === idParaEditar);
 
  if (index !== -1) {
    startups[index].nome = req.body.nome;
    startups[index].especialidade = req.body.especialidade;
    res.status(200).json(startups[index]);
  } else {
    res.status(404).json({ erro: "Não encontrada" });
  }
});



// Ligando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
