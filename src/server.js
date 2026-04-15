import express from 'express';
import cors from 'cors';
import knex from 'knex';
import knexConfig from '../knexfile.js';

const app = express();
const port = 3000;

// Configurar Knex com o ambiente de desenvolvimento
const db = knex(knexConfig.development);

app.use(cors());
app.use(express.json());

// Rota GET - Status do servidor
app.get('/', (req, res) => {
  res.send('🌾 AgroTech Connect: O servidor está rodando com banco de dados!');
});

// Rota GET - Buscar todas as startups
app.get('/startups', async (req, res) => {
  try {
    const startups = await db('startups').select('*');
    res.json(startups);
  } catch (error) {
    console.error('Erro ao buscar startups:', error);
    res.status(500).json({ erro: 'Erro ao buscar startups' });
  }
});

// Rota POST - Criar nova startup
app.post('/startups', async (req, res) => {
  try {
    const { nome, especialidade, anoAbertura } = req.body;

    // Validação
    if (!nome || !especialidade) {
      return res.status(400).json({ erro: 'Nome e especialidade são obrigatórios' });
    }

    const [id] = await db('startups').insert({
      nome,
      especialidade,
      anoAbertura: anoAbertura || new Date().getFullYear()
    }).returning('id');

    const novaStartup = await db('startups').where({ id }).first();
    res.status(201).json(novaStartup);
  } catch (error) {
    console.error('Erro ao criar startup:', error);
    res.status(500).json({ erro: 'Erro ao criar startup' });
  }
});

// Rota PUT - Atualizar startup
app.put('/startups/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome, especialidade, anoAbertura } = req.body;

    // Validação
    if (!nome || !especialidade) {
      return res.status(400).json({ erro: 'Nome e especialidade são obrigatórios' });
    }

    const atualizado = await db('startups')
      .where({ id })
      .update({
        nome,
        especialidade,
        anoAbertura: anoAbertura || new Date().getFullYear()
      })
      .returning('*');

    if (atualizado.length > 0) {
      res.json(atualizado[0]);
    } else {
      res.status(404).json({ erro: 'Startup não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao atualizar startup:', error);
    res.status(500).json({ erro: 'Erro ao atualizar startup' });
  }
});

// Rota DELETE - Remover startup
app.delete('/startups/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletadas = await db('startups').where({ id }).del();

    if (deletadas > 0) {
      res.json({ mensagem: 'Startup deletada com sucesso' });
    } else {
      res.status(404).json({ erro: 'Startup não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao deletar startup:', error);
    res.status(500).json({ erro: 'Erro ao deletar startup' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Banco de dados: SQLite (dev.sqlite3)`);
});