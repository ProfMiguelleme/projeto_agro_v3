const API_URL = 'http://localhost:3000';

/**
 * Buscar todas as startups
 */
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

/**
 * Criar nova startup
 */
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

/**
 * Atualizar startup
 */
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

/**
 * Deletar startup
 */
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