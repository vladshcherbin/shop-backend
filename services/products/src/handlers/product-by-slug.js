import { findBySlug } from '../data/products'

export async function handler(event) {
  const foundProduct = await findBySlug(event?.pathParameters?.slug)

  if (!foundProduct) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Product not found' })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ product: foundProduct })
  }
}
