import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import logger from '../modules/logger'
import { errorResponse, successfulResponse } from '../modules/response'

const client = new S3Client({ region: 'eu-west-1' })

export async function handler(event) {
  try {
    logger.info({ event }, 'import products file')

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `uploaded/${event.queryStringParameters.name}`
    })
    const url = await getSignedUrl(client, command, { expiresIn: 60 })

    logger.info({ url }, 'generated url')

    return successfulResponse({ url })
  } catch (error) {
    return errorResponse(error)
  }
}
