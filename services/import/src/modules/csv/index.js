import csv from 'csv-parser'
import logger from '../logger'

export default function logFile(readStream) {
  return new Promise((resolve, reject) => {
    logger.info('parsing contents')

    readStream
      .pipe(csv())
      .on('data', (row) => {
        logger.info({ row })
      })
      .on('end', () => {
        logger.info('done parsing')

        resolve()
      })
      .on('error', (error) => {
        logger.error({ error }, 'csv file parse error')

        reject(error)
      })
  })
}
