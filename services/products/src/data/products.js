const products = [
  {
    id: 1,
    title: 'High waist super skinny jeans',
    slug: 'high-waist-super-skinny-jeans'
  },
  {
    id: 2,
    title: 'Basic top',
    slug: 'basic-top'
  },
  {
    id: 3,
    title: 'Ripped mom jeans',
    slug: 'ripped-mom-jeans'
  },
  {
    id: 4,
    title: 'Skinny jeans',
    slug: 'skinny-jeans'
  },
  {
    id: 5,
    title: 'ECO AWARE denim jacket',
    slug: 'eco-aware-denim-jacket'
  },
  {
    id: 6,
    title: 'ECO AWARE quilted jacket with hood',
    slug: 'eco-aware-quilted-jacket-with-hood'
  }
]

export async function findAll() {
  return products
}

export async function findBySlug(slug) {
  return products.find((product) => product.slug === slug)
}
