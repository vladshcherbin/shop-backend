import { jest } from '@jest/globals'

jest.unstable_mockModule('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: () => 'mocked-url'
}))

const { handler } = await import('../src/handlers/import-products-file')

test('Products file signed url is generated', async () => {
  const response = await handler({
    queryStringParameters: { name: 'test.csv' }
  })

  expect(response.statusCode).toBe(200)
  expect(response.body).toMatchSnapshot()
})

test('Error if name query parameter is missing', async () => {
  const response = await handler()

  expect(response.statusCode).toBe(500)
  expect(response.body).toMatchSnapshot()
})
