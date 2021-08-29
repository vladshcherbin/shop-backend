import { findAll } from '../data/products'

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({ products: await findAll() })
  }
}
