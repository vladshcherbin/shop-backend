import { handler } from '../src/handlers/product-by-slug'

test('Correct product is returned', async () => {
  const response = await handler({
    pathParameters: { slug: 'basic-top' }
  })

  expect(response.statusCode).toBe(200)
  expect(response.body).toMatchSnapshot()
})

test('Not found error if slug is missing', async () => {
  const response = await handler()

  expect(response.statusCode).toBe(404)
  expect(response.body).toMatchSnapshot()
})

test('Not found error if slug is empty', async () => {
  const response = await handler({
    pathParameters: { slug: '' }
  })

  expect(response.statusCode).toBe(404)
  expect(response.body).toMatchSnapshot()
})

test('Not found error if product with slug doesn\'t exist', async () => {
  const response = await handler({
    pathParameters: { slug: 'missing' }
  })

  expect(response.statusCode).toBe(404)
  expect(response.body).toMatchSnapshot()
})
