/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('startups', function(table) {
    table.increments('id').primary(); // ID auto-incremento
    table.string('nome').notNullable(); // Nome da startup
    table.string('especialidade').notNullable(); // Especialidade
    table.integer('anoAbertura').notNullable(); // Ano de abertura
    table.timestamps(true, true); // created_at, updated_at
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('startups');
};
