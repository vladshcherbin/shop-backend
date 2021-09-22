import ValidationError from './ValidationError'

function processData(data, schema) {
  const fields = Object.keys(schema.fields)

  return Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => fields.includes(key))
      .map(([key, value]) => {
        let processedValue = value

        if (typeof value === 'string') {
          processedValue = value.trim()
        }

        return [key, processedValue]
      })
  )
}

function formatYupError(error) {
  const errors = {}

  error.inner.forEach(({ message, path }) => {
    if (!errors[path]) {
      errors[path] = message
    }
  })

  return errors
}

export default async function validate(schema, data) {
  const processedData = processData(data, schema)

  try {
    return await schema.validate(processedData, { abortEarly: false, strict: true })
  } catch (error) {
    throw new ValidationError(formatYupError(error))
  }
}
