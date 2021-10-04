import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import logFile from '../modules/csv'
import logger from '../modules/logger'
import { errorResponse, successfulResponse } from '../modules/response'

export async function handler(event) {
  try {
    logger.info({ event }, 'file created')

    const [record] = event.Records
    const client = new S3Client({ region: record.awsRegion })
    const { Body } = await client.send(new GetObjectCommand({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key
    }))

    await logFile(Body)

    logger.info('copying parsed file')

    await client.send(new CopyObjectCommand({
      CopySource: `${record.s3.bucket.name}/${record.s3.object.key}`,
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key.replace(/^uploaded\//, 'parsed/')
    }))

    logger.info('deleting parsed file')

    await client.send(new DeleteObjectCommand({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key
    }))

    return successfulResponse({ status: 'success' })
  } catch (error) {
    return errorResponse(error)
  }
}
