import products from '../data/products'

export async function handler(event) {
  const { slug } = event.pathParameters
  const foundProduct = products.find((product) => product.slug === slug)

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
