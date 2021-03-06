const products = [
  {
    title: 'High waist super skinny jeans',
    description: 'high waist',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/1/1153F-50J-002-1_1.jpg',
    price: 49.99,
    count: 4
  },
  {
    title: 'Basic top',
    description: 'round neck, wide straps',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/2/6/2628F-18X-001-1_3.jpg',
    price: 9.99,
    count: 6
  },
  {
    title: 'Ripped mom jeans',
    description: 'mid rise, zip and button fastening',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/1/1161F-59J-001-1_2.jpg',
    price: 69.99,
    count: 7
  },
  {
    title: 'Skinny jeans',
    description: 'high waist, zip and button fastening',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/1/1152F-39J-001-1_3.jpg',
    price: 49.99,
    count: 12
  },
  {
    title: 'ECO AWARE denim jacket',
    description: 'classic collar, button-through front, two chest pockets with flaps, tie waist belt',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/3/5/3510F-55J-010-1_1.jpg',
    price: 79.99,
    count: 7
  },
  {
    title: 'ECO AWARE quilted jacket with hood',
    description: 'large hood, two pockets, smooth lining',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/4/1431F-18X-001-1_2.jpg',
    price: 79.99,
    count: 8
  }
]
exports.up = async (knex) => {
  const currentDate = new Date().toISOString()

  const insertedProducts = await knex.table('products')
    .insert(products.map((product) => ({
      title: product.title,
      description: product.description,
      price: product.price,
      image_url: product.image,
      created_at: currentDate,
      updated_at: currentDate
    })))
    .returning('*')

  await knex.table('stocks').insert(products.map((product) => ({
    product_id: insertedProducts.find(({ title }) => title === product.title).id,
    count: product.count,
    created_at: currentDate,
    updated_at: currentDate
  })))
}

exports.down = (knex) => (
  knex.table('products').whereIn('title', products.map((product) => product.title)).delete()
)
