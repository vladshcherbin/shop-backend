const products = [
  {
    id: 1,
    title: 'High waist super skinny jeans',
    description: 'high waist',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/1/1153F-50J-002-1_1.jpg',
    slug: 'high-waist-super-skinny-jeans',
    price: 49.99,
    count: 4
  },
  {
    id: 2,
    title: 'Basic top',
    description: 'round neck, wide straps',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/2/6/2628F-18X-001-1_3.jpg',
    slug: 'basic-top',
    price: 9.99,
    count: 6
  },
  {
    id: 3,
    title: 'Ripped mom jeans',
    description: 'mid rise, zip and button fastening',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/1/1161F-59J-001-1_2.jpg',
    slug: 'ripped-mom-jeans',
    price: 69.99,
    count: 7
  },
  {
    id: 4,
    title: 'Skinny jeans',
    description: 'high waist, zip and button fastening',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/1/1152F-39J-001-1_3.jpg',
    slug: 'skinny-jeans',
    price: 49.99,
    count: 12
  },
  {
    id: 5,
    title: 'ECO AWARE denim jacket',
    description: 'classic collar, button-through front, two chest pockets with flaps, tie waist belt',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/3/5/3510F-55J-010-1_1.jpg',
    slug: 'eco-aware-denim-jacket',
    price: 79.99,
    count: 7
  },
  {
    id: 6,
    title: 'ECO AWARE quilted jacket with hood',
    description: 'large hood, two pockets, smooth lining',
    image: 'https://www.sinsay.com/media/catalog/product/cache/850/a4e40ebdc3e371adff845072e1c73f37/1/4/1431F-18X-001-1_2.jpg',
    slug: 'eco-aware-quilted-jacket-with-hood',
    price: 79.99,
    count: 8
  }
]

export async function findAll() {
  return products
}

export async function findBySlug(slug) {
  return products.find((product) => product.slug === slug)
}
