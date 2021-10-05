import csv from 'csv-parser'
import logger from '../logger'

export default function processFile(readStream, processFunction) {
  return new Promise((resolve, reject) => {
    logger.info('parsing contents')

    readStream
      .pipe(csv())
      .on('data', async (row) => {
        try {
          await processFunction(row)
        } catch (error) {
          logger.error({ error }, 'row process error')
        }
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
