import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'
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

export async function handler(event) {
  try {
    logger.info({ event }, 'catalog batch process start')

    if (event.Records.length) {
      const products = event.Records.map((record) => JSON.parse(record.body))

      logger.info({ products }, 'saving products to database')

      await knex.transaction(async (transaction) => {
        const currentDate = new Date().toISOString()
        const insertedProducts = await transaction('products')
          .insert(products.map((product) => ({
            title: product.title,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            created_at: currentDate,
            updated_at: currentDate
          })))
          .returning('*')

        logger.info({ insertedProducts }, 'inserted products')

        const productsWithCount = products.filter((product) => product.count)

        if (productsWithCount.length) {
          const insertedStocks = await transaction('stocks')
            .insert(productsWithCount.map((product) => ({
              product_id: insertedProducts.find((insertedProduct) => (
                insertedProduct.title === product.title
              )).id,
              count: product.count,
              created_at: currentDate,
              updated_at: currentDate
            })))

          logger.info({ insertedStocks }, 'inserted stocks')
        }

        return insertedProducts
      })

      logger.info('sending notification email')

      const snsClient = new SNSClient({ region: 'eu-west-1' })

      await snsClient.send(new PublishCommand({
        TopicArn: process.env.SNS_ARN,
        Subject: 'New products added',
        Message: JSON.stringify(products),
        MessageAttributes: {
          count: {
            DataType: 'String',
            StringValue: products.length > 1 ? 'many' : 'single'
          }
        }
      }))
    }

    logger.info('catalog batch process end')
  } catch (error) {
    logger.error({ error }, 'processing error')
  }
}
