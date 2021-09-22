import knexConnection from 'knex'
import { number, object, string } from 'yup'
import logger from '../modules/logger'
import { errorResponse, successfulResponse } from '../modules/response'
import { validate } from '../modules/validation'

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
    logger.info({ event }, 'create product')

    const data = JSON.parse(event.body)
    const schema = object({
      title: string().required().min(3),
      description: string(),
      price: number().positive(),
      image_url: string().required().url(),
      count: number().integer().positive()
    })

    const { count, ...restValidInput } = await validate(schema, data)
    const product = await knex.transaction(async (transaction) => {
      const currentDate = new Date().toISOString()
      const [insertedProduct] = await transaction('products')
        .insert({
          ...restValidInput,
          created_at: currentDate,
          updated_at: currentDate
        })
        .returning('*')

      await transaction('stocks').insert({
        product_id: insertedProduct.id,
        count,
        created_at: currentDate,
        updated_at: currentDate
      })

      return insertedProduct
    })

    logger.info({ product }, 'product created')

    return successfulResponse({ product })
  } catch (error) {
    return errorResponse(error)
  }
}
