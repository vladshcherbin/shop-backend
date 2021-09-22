import knexConnection from 'knex'
import logger from '../modules/logger'
import errorResponse from '../modules/response/error-response'
import successfulResponse from '../modules/response/successful-response'

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

export async function handler(event) {
  try {
    logger.info({ event }, 'get products')

    const products = await knex
      .select('products.id', 'products.title', 'products.description', 'products.price', 'products.image_url', 'stocks.count')
      .from('products')
      .innerJoin('stocks', 'products.id', 'stocks.product_id')
      .orderBy('products.created_at', 'desc')

    return successfulResponse({ products })
  } catch (error) {
    return errorResponse(error)
  }
}
