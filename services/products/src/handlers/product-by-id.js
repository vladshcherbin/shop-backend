import { findById } from '../data/products'

export async function handler(event) {
  const product = await findById(Number(event?.pathParameters?.id))

  if (!product) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ message: 'Product not found' })
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ product })
  }
}
