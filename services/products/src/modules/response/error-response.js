import logger from '../logger'
import ValidationError from '../validation/ValidationError'

const headers = {
  'Access-Control-Allow-Origin': '*'
}

export default function errorResponse(error) {
  logger.error({ error }, 'Internal error')

  if (error instanceof ValidationError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: error.message,
        validationErrors: error.extensions.validationErrors
      })
    }
  }

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({
      message: 'Internal server error'
    })
  }
}
