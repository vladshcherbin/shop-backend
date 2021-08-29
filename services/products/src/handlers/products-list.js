import products from '../data/products'

export default async function productsList() {
  return {
    statusCode: 200,
    body: JSON.stringify(products)
  }
}
