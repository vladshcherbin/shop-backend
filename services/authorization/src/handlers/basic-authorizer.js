import logger from '../modules/logger'
import generatePolicy from '../modules/policy'

export async function handler(event, context, callback) {
  try {
    logger.info({ event }, 'start basic authorizer')

    const { authorizationToken, methodArn, type } = event

    if (type !== 'TOKEN') {
      return callback('Unauthorized')
    }

    const [authType, token] = authorizationToken.split(' ')

    if (authType !== 'Basic' || !token) {
      return callback('Unauthorized')
    }

    const [user, password] = Buffer.from(token, 'base64').toString('utf8').split(':')

    if (!user || !password) {
      return callback('Unauthorized')
    }

    return (process.env[user] === password)
      ? callback(null, generatePolicy(token, 'Allow', methodArn))
      : callback(null, generatePolicy(token, 'Deny', methodArn))
  } catch (error) {
    logger.error({ error }, 'authorizer error')

    return callback('Unauthorized')
  } finally {
    logger.info('finish basic authorizer')
  }
}
