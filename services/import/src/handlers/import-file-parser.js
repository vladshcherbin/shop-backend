import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import processFile from '../modules/csv'
import logger from '../modules/logger'
import { errorResponse, successfulResponse } from '../modules/response'

export async function handler(event) {
  try {
    logger.info({ event }, 'file created')

    const [record] = event.Records
    const s3Client = new S3Client({ region: record.awsRegion })
    const sqsClient = new SQSClient({ region: record.awsRegion })
    const { Body } = await s3Client.send(new GetObjectCommand({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key
    }))

    await processFile(Body, (row) => sqsClient.send(new SendMessageCommand({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: JSON.stringify(row)
    })))

    logger.info('copying parsed file')

    await s3Client.send(new CopyObjectCommand({
      CopySource: `${record.s3.bucket.name}/${record.s3.object.key}`,
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key.replace(/^uploaded\//, 'parsed/')
    }))

    logger.info('deleting parsed file')

    await s3Client.send(new DeleteObjectCommand({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key
    }))

    return successfulResponse({ status: 'success' })
  } catch (error) {
    return errorResponse(error)
  }
}
