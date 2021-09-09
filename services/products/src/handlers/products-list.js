import { findAll } from '../data/products'

export async function handler() {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ products: await findAll() })
  }
}
