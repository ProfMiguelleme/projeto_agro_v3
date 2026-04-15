/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.QueryBuilder }
 */
export async function seed(knex) {
  // Deletar dados existentes
  await knex('startups').del();

  // Inserir dados iniciais
  await knex('startups').insert([
    {
      id: 1,
      nome: 'AgroFácil',
      especialidade: 'Drones',
      anoAbertura: 2020
    },
    {
      id: 2,
      nome: 'EcoSolo',
      especialidade: 'Sensores',
      anoAbertura: 2021
    },
    {
      id: 3,
      nome: 'AgriTech Pro',
      especialidade: 'IA e Análise de Dados',
      anoAbertura: 2022
    },
    {
      id: 4,
      nome: 'IrrigaControl',
      especialidade: 'Sistemas de Irrigação',
      anoAbertura: 2019
    },
    {
      id: 5,
      nome: 'CropGuard',
      especialidade: 'Proteção de Culturas',
      anoAbertura: 2023
    }
  ]);
}