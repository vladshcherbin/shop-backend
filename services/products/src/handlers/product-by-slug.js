import products from '../data/products'

export async function handler(event) {
  const { slug } = event.pathParameters

  return {
    statusCode: 200,
    body: JSON.stringify({
      product: products.find((product) => product.slug === slug)
    })
  }
}
