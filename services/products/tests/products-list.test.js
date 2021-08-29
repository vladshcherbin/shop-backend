import { handler } from '../src/handlers/products-list'

test('Products list is returned', async () => {
  const response = await handler()

  expect(response.statusCode).toBe(200)
  expect(response.body).toMatchSnapshot()
})
