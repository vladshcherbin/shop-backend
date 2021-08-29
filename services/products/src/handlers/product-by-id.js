import products from '../data/products'

export default async function productById(event) {
  const { id } = event.pathParameters

  return {
    statusCode: 200,
    body: JSON.stringify({
      product: products.find((product) => product.id === Number(id))
    })
  }
}
