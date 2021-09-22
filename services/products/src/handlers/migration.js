import knexConnection from 'knex'
import logger from '../modules/logger'

const knex = knexConnection({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false
    }
  }
})

export async function handler() {
  try {
    await knex.migrate.latest()
  } catch (error) {
    logger.error({ error }, 'Product migration failed')
  }
}
