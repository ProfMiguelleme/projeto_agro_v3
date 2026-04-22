import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'agro_user',
      password: 'agro_pass',
      database: 'agro_dev'
    },
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: join(__dirname, 'migrations')
    },
    seeds: {
      directory: join(__dirname, 'seeds')
    }
  }

};