import logger from '../logger'

export default function errorResponse(error) {
  logger.error({ error }, 'Internal error')

  return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Internal server error'
    })
  }
}
