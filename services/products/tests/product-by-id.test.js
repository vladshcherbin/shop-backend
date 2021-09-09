import { handler } from '../src/handlers/product-by-id'

test('Correct product is returned', async () => {
  const response = await handler({
    pathParameters: { id: 2 }
  })

  expect(response.statusCode).toBe(200)
  expect(response.body).toMatchSnapshot()
})

test('Not found error if "id" is missing', async () => {
  const response = await handler()

  expect(response.statusCode).toBe(404)
  expect(response.body).toMatchSnapshot()
})

test('Not found error if "id" is empty', async () => {
  const response = await handler({
    pathParameters: { id: '' }
  })

  expect(response.statusCode).toBe(404)
  expect(response.body).toMatchSnapshot()
})

test('Not found error if product with "id" doesn\'t exist', async () => {
  const response = await handler({
    pathParameters: { id: 'missing' }
  })

  expect(response.statusCode).toBe(404)
  expect(response.body).toMatchSnapshot()
})
